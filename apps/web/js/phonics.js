// Letter sounds. A grown-up's own recording (kept on this device in IndexedDB) is used when there is one;
// otherwise the device voice says an approximation from PHONEMES.
const Phonics = (() => {
  const DB_NAME = 'ethan-learning-game-sounds';
  const STORE = 'sounds';
  const cache = {}; // letter -> Blob
  let dbPromise = null;
  let current = null; // the <audio> currently playing

  function db() {
    if (!dbPromise) {
      dbPromise = new Promise((resolve, reject) => {
        if (!window.indexedDB) return reject(new Error('IndexedDB not available'));
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(STORE);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }
    return dbPromise;
  }

  function write(fn) {
    return db().then(d => new Promise((resolve, reject) => {
      const tx = d.transaction(STORE, 'readwrite');
      fn(tx.objectStore(STORE));
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    }));
  }

  const ready = db().then(d => new Promise(resolve => {
    const tx = d.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const keys = store.getAllKeys();
    const values = store.getAll();
    tx.oncomplete = () => {
      keys.result.forEach((k, i) => { cache[k] = values.result[i]; });
      resolve();
    };
    tx.onerror = () => resolve();
  })).catch(() => {});

  function playBlob(blob) {
    return new Promise(resolve => {
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      current = audio;
      const done = () => {
        if (current === audio) current = null;
        URL.revokeObjectURL(url);
        resolve();
      };
      audio.onended = done;
      audio.onerror = done;
      audio.onpause = done;
      audio.play().catch(done);
      setTimeout(done, 5000);
    });
  }

  return {
    ready,
    has: l => !!cache[l],
    count: () => Object.keys(cache).length,

    // Play the sound a letter makes.
    async play(l) {
      await ready;
      if (!Store.data.settings.voice) return;
      if (cache[l]) return playBlob(cache[l]);
      return Voice.say(PHONEMES[l].tts, { keepTurn: true });
    },

    stop() {
      if (current) current.pause();
    },

    async save(l, blob, { fromSync = false } = {}) {
      cache[l] = blob;
      await write(s => s.put(blob, l)).catch(() => {});
      if (!fromSync && typeof Sync !== 'undefined') Sync.soundSaved(l, blob);
    },

    async remove(l) {
      delete cache[l];
      await write(s => s.delete(l)).catch(() => {});
      if (typeof Sync !== 'undefined') Sync.soundRemoved(l);
    },

    // Record from the microphone for `ms` milliseconds (onStart fires once the mic is live).
    async record(ms = 1600, onStart = () => {}) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks = [];
      rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      const stopped = new Promise(r => { rec.onstop = r; });
      rec.start();
      onStart();
      await new Promise(r => setTimeout(r, ms));
      rec.stop();
      await stopped;
      stream.getTracks().forEach(t => t.stop());
      return new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
    },

    // For backup / moving to another device: { letter: dataURL }
    async exportAll() {
      await ready;
      const out = {};
      for (const [l, blob] of Object.entries(cache)) {
        out[l] = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
      }
      return out;
    },

    async importAll(map) {
      for (const [l, url] of Object.entries(map || {})) {
        if (!PHONEMES[l]) continue;
        await this.save(l, await (await fetch(url)).blob());
      }
    },

    canRecord: () => !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder),
  };
})();
