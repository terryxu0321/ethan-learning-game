// Multi-device sync (ADR-0003): the parent signs in with Google in the parent area, then progress,
// the learner model, the readiness checklist and letter-sound recordings sync through Firestore.
// Nothing loads from Google until the parent turns sync on; without it the app stays local-only.
const Sync = (() => {
  const SDK = 'https://www.gstatic.com/firebasejs/10.12.2';
  const CONFIG = {
    apiKey: 'AIzaSyC7o4wWiKanqOgrXJsKPpwVGNqoplSe-Ak',
    authDomain: 'ethan-learning-game.firebaseapp.com',
    projectId: 'ethan-learning-game',
    storageBucket: 'ethan-learning-game.firebasestorage.app',
    messagingSenderId: '800790244352',
    appId: '1:800790244352:web:0d39afab7db22159adbce5',
    // measurementId intentionally left out: no analytics
  };
  const FLAG = 'ethan-learning-game-sync';

  let fb = null; // { auth, db, fns }
  let user = null;
  let status = 'off'; // off | connecting | synced | syncing | offline | error
  let lastSync = null;
  let lastError = '';
  let pushTimer = null;
  let applyingRemote = false;
  let lastPushed = '';
  const listeners = new Set();

  const setStatus = s => { status = s; listeners.forEach(fn => fn()); };
  const enabled = () => { try { return localStorage.getItem(FLAG) === '1'; } catch { return false; } };
  const setEnabled = on => { try { on ? localStorage.setItem(FLAG, '1') : localStorage.removeItem(FLAG); } catch { /* ignore */ } };

  async function load() {
    if (fb) return fb;
    const [app, auth, fs] = await Promise.all([
      import(`${SDK}/firebase-app.js`), import(`${SDK}/firebase-auth.js`), import(`${SDK}/firebase-firestore.js`),
    ]);
    const a = app.initializeApp(CONFIG);
    fb = { auth: auth.getAuth(a), db: fs.getFirestore(a), A: auth, F: fs };
    auth.onAuthStateChanged(fb.auth, u => {
      user = u;
      if (u) start();
      else setStatus(enabled() ? 'off' : 'off');
    });
    return fb;
  }

  const profileRef = () => fb.F.doc(fb.db, 'families', user.uid, 'profiles', 'main');
  const soundsRef = () => fb.F.collection(fb.db, 'families', user.uid, 'sounds');

  /* ---------- merging ---------- */

  // Combine two copies of Store.data so that practice done on either device is kept.
  // Learning records: keep the richer copy of each item; counts take the maximum.
  // Preferences (name, settings, readiness): the copy changed most recently by a parent wins.
  function merge(local, remote) {
    if (!remote) return local;
    const out = structuredClone(local);
    const prefsFromRemote = (remote.prefsUpdated || 0) > (local.prefsUpdated || 0);
    if (prefsFromRemote) {
      out.name = remote.name;
      out.settings = { ...local.settings, ...remote.settings };
      out.readiness = { ...remote.readiness };
      out.prefsUpdated = remote.prefsUpdated;
    }
    out.stars = Math.max(local.stars || 0, remote.stars || 0);
    out.stickers = [...new Set([...(local.stickers || []), ...(remote.stickers || [])])];
    for (const [id, g] of Object.entries(remote.games || {})) {
      const l = out.games[id];
      if (!l || g.played > l.played) out.games[id] = { ...g };
      else if (l && g.played === l.played) out.games[id] = { ...l, level: prefsFromRemote ? g.level : l.level };
    }
    for (const [day, n] of Object.entries(remote.days || {})) out.days[day] = Math.max(out.days[day] || 0, n);
    for (const [day, d] of Object.entries(remote.daily || {})) {
      const l = out.daily[day] || { rounds: 0, ok: 0, ms: 0 };
      out.daily[day] = l.rounds >= d.rounds ? l : { ...d };
    }
    for (const [id, its] of Object.entries(remote.items || {})) {
      const mine = (out.items[id] ||= {});
      for (const [key, it] of Object.entries(its)) {
        const l = mine[key];
        if (!l || it.n > l.n || (it.n === l.n && (it.last || '') > (l.last || ''))) mine[key] = { ...it };
      }
    }
    return out;
  }

  /* ---------- push / pull ---------- */

  function applyMerged(merged) {
    const before = JSON.stringify(Store.data);
    Store.data = merged;
    applyingRemote = true;
    Store.save();
    applyingRemote = false;
    return before !== JSON.stringify(merged);
  }

  async function push() {
    if (!user) return;
    const json = JSON.stringify(Store.data);
    if (json === lastPushed) return;
    setStatus('syncing');
    try {
      await fb.F.setDoc(profileRef(), { json, updatedAt: Date.now() });
      lastPushed = json;
      lastSync = new Date();
      setStatus('synced');
    } catch (e) {
      lastError = e.message;
      setStatus(navigator.onLine ? 'error' : 'offline');
    }
  }

  function schedulePush() {
    if (!user || applyingRemote) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 2000);
  }

  async function syncSounds() {
    const snap = await fb.F.getDocs(soundsRef());
    const remote = new Set();
    for (const d of snap.docs) {
      remote.add(d.id);
      if (!Phonics.has(d.id)) await Phonics.save(d.id, await (await fetch(d.data().data)).blob(), { fromSync: true });
    }
    const mine = await Phonics.exportAll();
    for (const [l, url] of Object.entries(mine)) {
      if (!remote.has(l)) await fb.F.setDoc(fb.F.doc(soundsRef(), l), { data: url, updatedAt: Date.now() });
    }
  }

  let unsubscribe = null;
  async function start() {
    setStatus('connecting');
    try {
      const snap = await fb.F.getDoc(profileRef());
      const remote = snap.exists() ? JSON.parse(snap.data().json) : null;
      applyMerged(merge(Store.data, remote));
      await push();
      await syncSounds();
      unsubscribe?.();
      // live updates from the other devices
      unsubscribe = fb.F.onSnapshot(profileRef(), s => {
        if (!s.exists() || s.metadata.hasPendingWrites) return;
        const json = s.data().json;
        if (json === lastPushed) return;
        if (applyMerged(merge(Store.data, JSON.parse(json)))) listeners.forEach(fn => fn('data'));
        lastSync = new Date();
        schedulePush();
      });
      lastSync = new Date();
      setStatus('synced');
    } catch (e) {
      lastError = e.message;
      setStatus(navigator.onLine ? 'error' : 'offline');
    }
  }

  window.addEventListener('online', () => { if (user) start(); });

  return {
    merge,
    get status() { return status; },
    get user() { return user; },
    get lastSync() { return lastSync; },
    get lastError() { return lastError; },
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    schedulePush,

    // Called once at startup: reconnects if this device turned sync on before.
    init() { if (enabled()) load().catch(e => { lastError = e.message; setStatus('error'); }); },

    async signIn() {
      setEnabled(true);
      setStatus('connecting');
      try {
        await load();
        const provider = new fb.A.GoogleAuthProvider();
        await fb.A.signInWithPopup(fb.auth, provider);
      } catch (e) {
        lastError = e.code === 'auth/popup-closed-by-user' ? '登录窗口被关闭了' : e.message;
        setStatus('error');
      }
    },

    async signOut() {
      setEnabled(false);
      unsubscribe?.();
      if (fb) await fb.A.signOut(fb.auth);
      user = null;
      setStatus('off');
    },

    syncNow() { if (user) return start(); },

    async soundSaved(l, blob) {
      if (!user) return;
      const url = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
      await fb.F.setDoc(fb.F.doc(soundsRef(), l), { data: url, updatedAt: Date.now() }).catch(() => {});
    },
    async soundRemoved(l) {
      if (user) await fb.F.deleteDoc(fb.F.doc(soundsRef(), l)).catch(() => {});
    },
  };
})();

Sync.init();
