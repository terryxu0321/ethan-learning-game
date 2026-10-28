// Screens, navigation and the shared game engine.

const app = document.getElementById('app');
const delay = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const SUBJECTS = {
  english: { title: 'English', big: 'ABC', color: 'pink', hello: 'English time! Pick a game.' },
  math: { title: 'Math', big: '123', color: 'blue', hello: 'Math time! Pick a game.' },
  kindy: { title: 'Kindy Ready', big: '🎒', color: 'green', hello: "Let's get ready for big school! Pick a game." },
  chinese: { title: '中文', big: '中', color: 'red', hello: '中文时间！选一个游戏吧。', lang: 'zh-CN' },
};

const DINO_SVG = `
<svg viewBox="0 0 200 210" class="dino" aria-label="Dino">
  <g class="dino-tail"><path d="M48 150 Q8 150 6 118 Q30 140 60 128 Z" fill="#62c47a"/></g>
  <polygon points="78,36 88,14 98,34" fill="#3fa862"/>
  <polygon points="96,32 108,8 118,32" fill="#3fa862"/>
  <polygon points="116,36 128,16 134,40" fill="#3fa862"/>
  <ellipse cx="100" cy="148" rx="58" ry="50" fill="#7bd389"/>
  <ellipse cx="100" cy="156" rx="36" ry="32" fill="#e9f9cf"/>
  <ellipse cx="74" cy="196" rx="20" ry="11" fill="#62c47a"/>
  <ellipse cx="126" cy="196" rx="20" ry="11" fill="#62c47a"/>
  <g class="dino-arm"><ellipse cx="50" cy="132" rx="11" ry="18" transform="rotate(30 50 132)" fill="#62c47a"/></g>
  <ellipse cx="150" cy="132" rx="11" ry="18" transform="rotate(-30 150 132)" fill="#62c47a"/>
  <circle cx="104" cy="74" r="48" fill="#7bd389"/>
  <g class="dino-eyes">
    <circle cx="86" cy="70" r="9" fill="#2b2b3a"/><circle cx="89" cy="66" r="3.2" fill="#fff"/>
    <circle cx="122" cy="70" r="9" fill="#2b2b3a"/><circle cx="125" cy="66" r="3.2" fill="#fff"/>
  </g>
  <ellipse cx="74" cy="90" rx="9" ry="6" fill="#ff9fb5" opacity=".8"/>
  <ellipse cx="134" cy="90" rx="9" ry="6" fill="#ff9fb5" opacity=".8"/>
  <path d="M92 92 Q104 106 116 92" stroke="#2b2b3a" stroke-width="4.5" fill="none" stroke-linecap="round"/>
</svg>`;

let session = null; // the game currently being played

function screen(html, cls = '') {
  Voice.stop();
  session = null;
  closeCard();
  app.innerHTML = `<div class="screen ${cls}">${html}</div>`;
  window.scrollTo(0, 0);
  Voice.lang = null;
  return app.firstElementChild;
}

function on(root, sel, fn) {
  root.querySelectorAll(sel).forEach(el => el.addEventListener('click', e => { Sound.tap(); fn(e, el); }));
}

function topbar(back, title) {
  return `<header class="topbar">
    ${back ? `<button class="round-btn" data-back aria-label="Back">${back}</button>` : '<span></span>'}
    <h1 class="topbar-title">${title}</h1>
    <div class="pill" title="Stars">⭐ <b class="star-count">${Store.data.stars}</b></div>
  </header>`;
}

function name() {
  return Store.data.name || 'friend';
}

/* ---------- popups & effects ---------- */

function showCard(inner, cls = '') {
  closeCard();
  const el = document.createElement('div');
  el.className = 'card-overlay';
  el.innerHTML = `<div class="card-pop ${cls}">${inner}<button class="btn btn-go card-close">OK 👍</button></div>`;
  el.addEventListener('click', e => {
    if (e.target === el || e.target.closest('.card-close')) closeCard();
  });
  document.body.appendChild(el);
}

function closeCard() {
  document.querySelectorAll('.card-overlay').forEach(el => el.remove());
}

function confetti(target) {
  const r = (target || app).getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const colors = ['#ff5a5f', '#ffc93c', '#33c47a', '#3b9cff', '#9b6bff', '#ff8fb1'];
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('span');
    p.className = 'confetti';
    const ang = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 140;
    p.style.left = cx + 'px';
    p.style.top = cy + 'px';
    p.style.background = pick(colors);
    p.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(ang) * dist - 60 + 'px');
    p.style.setProperty('--rot', rnd(-360, 360) + 'deg');
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
}

function bumpStars(n) {
  Store.data.stars += n;
  Store.save();
  document.querySelectorAll('.star-count').forEach(el => {
    el.textContent = Store.data.stars;
    el.parentElement.classList.remove('pop');
    void el.offsetWidth;
    el.parentElement.classList.add('pop');
  });
}

/* ---------- screens ---------- */

function showSplash() {
  const s = screen(`
    <div class="splash">
      <div class="splash-title">${esc(name())}'s<br><span>Learning Land</span></div>
      <div class="mascot big">${DINO_SVG}</div>
      <button class="btn btn-go btn-huge" id="start">▶ Play!</button>
    </div>`, 'center');
  s.querySelector('#start').addEventListener('click', () => {
    Sound.unlock();
    Sound.fanfare();
    showHome(true);
  });
}

function showHome(greet) {
  const owned = Store.data.stickers.length;
  const s = screen(`
    ${topbar('', `Hi, ${esc(name())}!`)}
    <section class="home-hero">
      <button class="mascot" id="mascot" aria-label="Dino">${DINO_SVG}</button>
      <div class="bubble" id="bubble">What do you want to learn today?</div>
    </section>
    <section class="subject-cards">
      ${Object.entries(SUBJECTS).map(([k, sub]) => `
        <button class="subject-card c-${sub.color}" data-subject="${k}">
          <span class="sc-big">${sub.big}</span>
          <span class="sc-title">${sub.title}</span>
        </button>`).join('')}
    </section>
    <section class="home-row">
      <button class="mini-card c-yellow" id="stickers">🎁 My Stickers <b>${owned}/${STICKERS.length}</b></button>
      <button class="mini-card c-purple" id="parents">👨‍👩‍👦 Parents 家长</button>
    </section>`, 'home');

  if (greet) Voice.say(`Hi ${name()}! What do you want to learn today? English, Math, or Kindy Ready?`);

  const lines = [
    `I'm Dino! Let's learn together, ${name()}!`,
    'Roar! Learning is fun!',
    'Did you know? Dinosaurs love counting!',
    `You are so clever, ${name()}!`,
    'Tap English or Math to play!',
    'Collect all the stickers!',
  ];
  s.querySelector('#mascot').addEventListener('click', e => {
    const line = pick(lines);
    s.querySelector('#bubble').textContent = line;
    e.currentTarget.classList.remove('jump');
    void e.currentTarget.offsetWidth;
    e.currentTarget.classList.add('jump');
    Sound.pop();
    Voice.say(line);
  });
  on(s, '[data-subject]', (e, el) => showSubject(el.dataset.subject));
  on(s, '#stickers', () => showStickers());
  on(s, '#parents', () => showParentGate());
}

function levelStars(def) {
  if (def.free) return '<span class="gc-level free">Free play</span>';
  const lv = Store.game(def.id, def.maxLevel).level;
  return `<span class="gc-level">${'★'.repeat(lv)}${'☆'.repeat(def.maxLevel - lv)}</span>`;
}

function showSubject(key, quiet) {
  const sub = SUBJECTS[key];
  const games = GAMES.filter(g => g.subject === key);
  const s = screen(`
    ${topbar('🏠', sub.title)}
    <section class="game-grid">
      ${games.map(g => `
        <button class="game-card c-${g.color}" data-game="${g.id}">
          <span class="gc-emoji">${g.emoji}</span>
          <span class="gc-title">${g.title}</span>
          ${levelStars(g)}${g.stretch ? '<span class="gc-tag">Kindergarten+</span>' : ''}
        </button>`).join('')}
    </section>`, `subject s-${key}`);
  if (!quiet) Voice.say(sub.hello, { lang: sub.lang });
  on(s, '[data-back]', () => showHome());
  on(s, '[data-game]', (e, el) => startGame(GAMES.find(g => g.id === el.dataset.game)));
}

/* ---------- game engine ---------- */

function startGame(def) {
  const s = screen(`
    ${topbar('⬅️', `${def.emoji} ${def.title}`)}
    ${def.free ? '' : `<div class="progress"></div>`}
    <section class="stage"></section>
    ${def.free ? '' : `<button class="speak-btn" aria-label="Say it again">🔊</button>`}`, `game g-${def.color}`);
  on(s, '[data-back]', () => showSubject(def.subject, true));
  Voice.lang = def.lang || null; // Chinese games speak Mandarin

  const stage = s.querySelector('.stage');
  if (def.free) {
    def.open(stage);
    Voice.say(def.intro);
    return;
  }

  const st = {
    def,
    stage,
    level: Store.game(def.id, def.maxLevel).level,
    rounds: def.rounds || Store.data.settings.rounds,
    i: 0,
    firstTry: 0,
    used: new Set(),
    lastPrompt: '',
    pending: Promise.resolve(),
    memo: {},
  };
  session = st;
  s.querySelector('.speak-btn').addEventListener('click', () => speakSteps(st.lastPrompt));
  nextRound(st, true);
}

function renderProgress(st) {
  const el = app.querySelector('.progress');
  if (!el) return;
  el.innerHTML = Array.from({ length: st.rounds }, (_, i) =>
    `<span class="dot ${i < st.i ? 'done' : i === st.i ? 'now' : ''}">${i < st.i ? '⭐' : ''}</span>`).join('');
}

const praise = def => pick(def.lang ? PRAISE_ZH : PRAISE);

function makeCtx(st, intro) {
  return {
    stage: st.stage,
    level: st.level,
    memo: st.memo,
    def: st.def,
    // text may be a string or an async function (e.g. one that plays a recorded letter sound)
    prompt(text) {
      st.lastPrompt = text;
      return intro ? speakSteps(st.def.intro, text) : speakSteps(text);
    },
    success(el, text) {
      Sound.correct();
      confetti(el);
      st.pending = Voice.say(text || praise(st.def));
    },
    // key/label identify what was practised this round, for the learner model
    done(first, key, label) {
      if (key !== undefined) Learner.record(st.def.id, String(key), String(label ?? key), first, Date.now() - st.roundStart);
      finishRound(st, first);
    },
  };
}

function nextRound(st, intro = false) {
  if (session !== st) return;
  if (st.i >= st.rounds) return finishGame(st);
  renderProgress(st);
  st.roundStart = Date.now();
  const ctx = makeCtx(st, intro);
  if (st.def.custom) {
    st.def.round(ctx);
    return;
  }

  // favour items Ethan finds hard or is due to review (learner.js)
  const q = Learner.pickQuestion(st.def, st.level, st.used);
  st.used.add(q.key);

  st.stage.innerHTML = `
    <div class="prompt">${q.html || ''}</div>
    <div class="choices choices--${q.style}">
      ${q.choices.map((c, i) => `<button class="choice c${i % 6}" data-i="${i}">${c.html}</button>`).join('')}
    </div>`;
  const promptEl = st.stage.querySelector('.prompt');
  q.onMount?.(promptEl, ctx);
  ctx.prompt(q.speak || q.say);

  let first = true;
  let solved = false;
  st.stage.querySelectorAll('.choice').forEach(btn => btn.addEventListener('click', () => {
    if (solved || btn.disabled) return;
    const c = q.choices[+btn.dataset.i];
    if (c.value === q.answer) {
      solved = true;
      btn.classList.add('right');
      st.stage.querySelectorAll('.choice').forEach(b => { if (b !== btn) b.classList.add('fade'); });
      q.onCorrect?.(promptEl);
      ctx.success(btn, `${praise(st.def)} ${q.after || ''}`);
      ctx.done(first, q.key, q.label ?? q.key);
    } else {
      first = false;
      btn.disabled = true;
      btn.classList.add('wrong', 'shake');
      Sound.wrong();
      const again = pick(st.def.lang ? TRY_AGAIN_ZH : TRY_AGAIN);
      Voice.say(c.say ? `${c.say}? ${again}` : again);
    }
  }));
}

async function finishRound(st, first) {
  if (first) st.firstTry++;
  st.i++;
  renderProgress(st);
  await Promise.all([st.pending, delay(1300)]);
  if (session === st) nextRound(st);
}

function finishGame(st) {
  const { def, rounds, firstTry } = st;
  const g = Store.game(def.id, def.maxLevel);
  g.played++;
  g.correct += firstTry;
  g.total += rounds;
  const ratio = firstTry / rounds;
  let levelMsg = '';
  if (ratio >= 0.8 && g.level < def.maxLevel) {
    g.level++;
    levelMsg = 'up';
  } else if (ratio < 0.4 && g.level > 1) {
    g.level--;
    levelMsg = 'down';
  }
  Store.logPlay();

  const missing = STICKERS.filter(s => !Store.data.stickers.includes(s.e));
  const sticker = pick(missing.length ? missing : STICKERS);
  const isNew = !Store.data.stickers.includes(sticker.e);
  if (isNew) Store.data.stickers.push(sticker.e);
  Store.save();
  showReward(def, rounds, sticker, isNew, levelMsg, g.level);
}

function showReward(def, stars, sticker, isNew, levelMsg, level) {
  const s = screen(`
    ${topbar('', '')}
    <section class="reward">
      <div class="reward-title">You did it, ${esc(name())}! 🎉</div>
      <div class="reward-stars">${'⭐'.repeat(stars)}</div>
      ${levelMsg === 'up' ? `<div class="levelup">Level up! ${'★'.repeat(level)}${'☆'.repeat(def.maxLevel - level)}</div>` : ''}
      <button class="gift" id="gift" aria-label="Open present">🎁</button>
      <div class="gift-label">Tap the present!</div>
      ${GUIDE[def.id] ? `<div class="parent-card">👨‍👩‍👦 陪玩小任务：${pick(GUIDE[def.id].everyday)}</div>` : ''}
      <div class="reward-btns">
        <button class="btn btn-go" id="again">🔁 Again</button>
        <button class="btn btn-blue" id="more">🎮 More games</button>
        <button class="btn btn-ghost" id="home">🏠</button>
      </div>
    </section>`, 'center');

  bumpStars(stars);
  Sound.fanfare();
  confetti(s.querySelector('.reward-title'));
  Voice.say(`You did it, ${name()}! You got ${stars} stars! ${levelMsg === 'up' ? 'Level up! ' : ''}Tap the present!`);

  const gift = s.querySelector('#gift');
  gift.addEventListener('click', () => {
    if (gift.classList.contains('open')) return;
    gift.classList.add('open');
    Sound.sparkle();
    setTimeout(() => {
      gift.textContent = sticker.e;
      gift.classList.add('sticker');
      s.querySelector('.gift-label').textContent = isNew ? `New sticker: ${sticker.n}!` : `A ${sticker.n}!`;
      confetti(gift);
      Voice.say(isNew ? `Wow! A ${sticker.n} sticker! It's in your sticker book.` : `A ${sticker.n}!`);
    }, 450);
  });
  on(s, '#again', () => startGame(def));
  on(s, '#more', () => showSubject(def.subject, true));
  on(s, '#home', () => showHome());
}

/* ---------- sticker book ---------- */

function showStickers() {
  const owned = new Set(Store.data.stickers);
  const s = screen(`
    ${topbar('🏠', 'My Stickers')}
    <div class="sticker-count">${owned.size} / ${STICKERS.length}</div>
    <section class="sticker-book">
      ${STICKERS.map(st => `<button class="sticker ${owned.has(st.e) ? 'have' : 'locked'}" data-e="${st.e}">
        <span>${st.e}</span></button>`).join('')}
    </section>
    <p class="hint">Play games to win more stickers! 🎮</p>`);
  Voice.say(owned.size
    ? `You have ${owned.size} sticker${owned.size === 1 ? '' : 's'}! Tap one!`
    : 'Play games to win stickers!');
  on(s, '[data-back]', () => showHome());
  s.querySelectorAll('.sticker').forEach(el => el.addEventListener('click', () => {
    const st = STICKERS.find(x => x.e === el.dataset.e);
    if (!owned.has(st.e)) {
      Voice.say('Keep playing to find this one!');
      return;
    }
    el.classList.remove('jump');
    void el.offsetWidth;
    el.classList.add('jump');
    Sound.pop();
    Voice.say(st.n);
  }));
}

/* ---------- parents ---------- */

/* ---------- backup ---------- */

async function exportProgress() {
  const payload = { app: 'ethan-learning-game', version: 1, exported: new Date().toISOString(), data: Store.data, sounds: await Phonics.exportAll() };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `learning-land-${Store.dayKey()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function importProgress(file) {
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    if (payload.app !== 'ethan-learning-game' || !payload.data) throw new Error('不是本 App 导出的文件');
    if (!confirm(`导入 ${payload.exported?.slice(0, 10) || ''} 的进度？这台设备上现有的进度会被替换。`)) return;
    localStorage.setItem(Store.KEY, JSON.stringify(payload.data));
    Store.load();
    await Phonics.importAll(payload.sounds);
    alert('导入成功 ✅');
    showParent();
  } catch (e) {
    alert(`导入失败：${e.message}`);
  }
}

/* ---------- parent report ---------- */

const pct = (ok, n) => (n ? Math.round((ok / n) * 100) : null);

function reportHTML() {
  const week = Learner.period(7);
  const prev = Learner.period(7, 7);
  const minutes = Math.round(week.ms / 60000);
  const acc = pct(week.ok, week.rounds);
  const prevAcc = pct(prev.ok, prev.rounds);
  const trend = acc === null || prevAcc === null ? '' : acc > prevAcc ? ` ↑ 比上周高 ${acc - prevAcc}%` : acc < prevAcc ? ` ↓ 比上周低 ${prevAcc - acc}%` : ' 与上周持平';

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const x = Store.data.daily[Store.dayKey(d)];
    days.push({ label: `${d.getMonth() + 1}/${d.getDate()}`, min: x ? Math.round(x.ms / 60000) : 0, acc: x ? pct(x.ok, x.rounds) : null });
  }
  const maxMin = Math.max(15, ...days.map(d => d.min));

  // letter & number maps combine the games that practise them
  const cell = (label, keys) => {
    const st = keys.map(([g, k]) => Learner.status(Learner.item(g, k)));
    const s = st.includes('weak') ? 'weak' : st.includes('mastered') ? 'mastered' : st.includes('learning') ? 'learning' : 'new';
    return `<span class="m-cell st-${s}">${label}</span>`;
  };
  const letterNames = LETTERS.map(l => cell(l, [['letter-find', l], ['case-match', l]])).join('');
  const letterSounds = LETTERS.map(l => cell(l.toLowerCase(), [['letter-sounds', l]])).join('');
  const numbers = Array.from({ length: 21 }, (_, n) => cell(n, [['number-find', `${n}`], ['count', `${n}`]])).join('');

  const weak = Learner.weakItems(8);
  const gameOf = id => GAMES.find(g => g.id === id);

  return `
    <div class="stats">
      <div><b>${week.active}</b><span>本周练习天数</span></div>
      <div><b>${minutes}</b><span>本周分钟数</span></div>
      <div><b>${acc === null ? '—' : acc + '%'}</b><span>一次答对率${trend}</span></div>
    </div>
    <h3>最近 7 天（分钟）</h3>
    <div class="week">${days.map(d => `
      <div class="day" title="${d.acc === null ? '' : '一次答对率 ' + d.acc + '%'}"><div class="bar ${d.min > 30 ? 'over' : ''}" style="height:${(d.min / maxMin) * 100}%"><span>${d.min || ''}</span></div><small>${d.label}</small></div>`).join('')}
    </div>
    <h3>掌握地图 <small>🟩 已掌握 · 🟨 练习中 · 🟥 需要加强 · ⬜ 还没练</small></h3>
    <div class="map"><b>字母名</b><div class="m-row">${letterNames}</div></div>
    <div class="map"><b>字母音</b><div class="m-row">${letterSounds}</div></div>
    <div class="map"><b>数字 0–20</b><div class="m-row">${numbers}</div></div>
    <div class="map"><b>汉字</b><div class="m-row">${HANZI.map(h => cell(`<span class="hz">${h.c}</span>`, [['hanzi-find', h.c], ['hanzi-match', h.c]])).join('')}</div></div>
    <h3>常错的内容 <small>（游戏会自动多出这些题）</small></h3>
    ${weak.length ? `<ul class="weak-list">${weak.map(w => `<li>${gameOf(w.gameId)?.emoji || ''} <b>${esc(w.label)}</b> <span class="muted">${gameOf(w.gameId)?.zh || ''} · ${w.n} 次中一次答对 ${w.ok} 次</span></li>`).join('')}</ul>`
      : '<p class="muted">暂时没有反复出错的内容 👍</p>'}
    <h3>💡 建议</h3>
    <ul>${suggestions(week, weak).map(x => `<li>${x}</li>`).join('')}</ul>`;
}

// Rule-based suggestions from the learner model and the readiness checklist.
function suggestions(week, weak) {
  const out = [];
  const minutes = week.ms / 60000;
  if (week.active < 3) out.push('这周练习天数较少。每天 10–15 分钟，比周末一次玩很久更有效。');
  const maxDay = Math.max(0, ...Object.entries(Store.data.daily).filter(([k]) => Date.now() - new Date(k) < 7 * 86400000).map(([, d]) => d.ms / 60000));
  if (maxDay > 30) out.push(`有一天玩了约 ${Math.round(maxDay)} 分钟。5 岁孩子每天屏幕时间建议不超过 1 小时，学习类最好 10–20 分钟。`);
  if (weak.length) {
    const letters = weak.filter(w => /^[A-Z]$/.test(w.key)).map(w => w.key.toLowerCase());
    if (letters.length) out.push(`字母 <b>${[...new Set(letters)].join(' ')}</b> 还不稳。可以做字母卡，在生活中找这些字母（家长指南里有方法）。`);
    out.push('上面"常错的内容"会在游戏里自动多出现；答对 3 次后会转为隔几天复习。');
  }
  const below = READINESS.flatMap(g => g.rows).filter(r => Store.data.readiness[r.id] === 0);
  if (below.length) out.push(`入学清单中还没到"最低"的：<b>${below.map(r => r.name).join('、')}</b>。这些优先在生活中练。`);
  const unrated = READINESS.flatMap(g => g.rows).filter(r => Store.data.readiness[r.id] === undefined).length;
  if (unrated) out.push(`入学准备清单还有 ${unrated} 项没有评估，花 5 分钟勾选一下，报告会更准确。`);
  const stale = GAMES.filter(g => !g.free && Store.data.games[g.id]?.played && Learner.lastPlayed(g.id) >= 7);
  if (stale.length) out.push(`超过一周没玩：${stale.map(g => g.title).join('、')}。可以安排复习，避免遗忘。`);
  if (!out.length) out.push('一切顺利！保持每天短时间练习，并多陪孩子聊聊今天学了什么。');
  return out;
}

function readinessHTML() {
  const rows = READINESS.flatMap(g => g.rows);
  const val = id => Store.data.readiness[id];
  const atLeast = n => rows.filter(r => val(r.id) >= n).length;
  return `
    <p class="muted">依据 NSW Kindergarten 的入学标准（PRD-001 §8.1）。按孩子<b>现在稳定能做到的</b>选一档；"最高"约等于 Kindergarten 年末水平，入学前不需要全部达到。每 4–6 周更新一次。</p>
    <div class="stats">
      <div><b>${atLeast(1)}/${rows.length}</b><span>达到最低</span></div>
      <div><b>${atLeast(2)}/${rows.length}</b><span>达到典型</span></div>
      <div><b>${atLeast(3)}/${rows.length}</b><span>达到最高</span></div>
    </div>
    ${READINESS.map(g => `
      <details class="ready-group" ${g.rows.some(r => val(r.id) === undefined) ? 'open' : ''}>
        <summary>${g.title} <span class="muted">${g.rows.filter(r => val(r.id) !== undefined).length}/${g.rows.length} 已评估</span></summary>
        ${g.rows.map(r => `
          <div class="ready-row">
            <div class="ready-head"><b>${r.name}</b> <span class="muted">${r.code}</span>
              ${r.games.length ? `<button class="guide-link" data-guide="${r.games[0]}">📖 怎么练</button>` : ''}</div>
            <div class="ready-levels">${READINESS_LEVELS.map((lv, i) => `
              <button class="lv-btn ${val(r.id) === i ? 'on' : ''} lv${i}" data-ready="${r.id}" data-level="${i}">
                <b>${lv}</b>${i ? `<small>${r.levels[i - 1]}</small>` : ''}</button>`).join('')}
            </div>
          </div>`).join('')}
      </details>`).join('')}`;
}

// Games where first-try accuracy is low, with the first teaching tip for each.
function focusAreas() {
  const weak = GAMES.filter(g => !g.free)
    .map(g => ({ g, p: Store.data.games[g.id] }))
    .filter(({ p }) => p && p.total >= 3 && p.correct / p.total < 0.7)
    .sort((a, b) => a.p.correct / a.p.total - b.p.correct / b.p.total)
    .slice(0, 3);
  if (!weak.length) {
    const played = GAMES.filter(g => Store.data.games[g.id]?.played).length;
    return `<p class="muted">${played < 3
      ? '还没有足够的游戏记录。多玩几次后，这里会列出一次答对率较低的游戏，以及您可以在家怎么教。'
      : '目前没有明显的薄弱项 👍 点下面表格里任意游戏的 📖，可以看到它的教学目标和在家的练习方法。'}</p>`;
  }
  return weak.map(({ g, p }) => {
    const guide = GUIDE[g.id];
    return `<div class="focus-item">
      <div><b>${g.emoji} ${g.title}</b> · ${g.zh} · 一次答对率 <b>${Math.round((p.correct / p.total) * 100)}%</b></div>
      <div>🎯 ${guide.goal}</div>
      <div>👨‍👩‍👦 试试：${guide.teach[0]}</div>
      <button class="btn btn-mini" data-guide="${g.id}">📖 完整教学指南</button>
    </div>`;
  }).join('');
}

function showGuide(id) {
  const g = GAMES.find(x => x.id === id);
  const guide = GUIDE[id];
  const list = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  showCard(`
    <h2>${g.emoji} ${g.title} <small>${g.zh}</small></h2>
    <h3>🎯 学习目标</h3><p>${guide.goal}</p>
    <h3>📚 对应技能</h3>${list(guide.skills.map(k => `${k} · ${SKILLS[k]}`))}
    <h3>🪜 等级</h3>${list(guide.levels)}
    <h3>👨‍👩‍👦 家长怎么教</h3>${list(guide.teach)}
    <h3>🏠 生活中练习</h3>${list(guide.everyday)}
    <h3>✅ 达标表现</h3><p>${guide.mastered}</p>
    <h3>💡 常见困难</h3><p>${guide.watch}</p>`, 'guide-pop');
}

function renderSoundStudio(el) {
  const canRec = Phonics.canRecord();
  const draw = () => {
    el.innerHTML = `
      <h2>🎙️ 字母音录音 Letter sounds</h2>
      <p>NSW 学校用 synthetic phonics 教阅读，孩子需要听到每个字母<b>纯正的音</b>（例如 s 是 "sss"，不是 "es" 也不是 "suh"）。
        设备自带的语音读不准单个音，所以最好由您为每个字母录一个音：点 <b>● 录</b>，看到"请说"后马上发音（约 1.5 秒）。
        录音<b>只保存在这台设备上</b>，不会上传。</p>
      <p class="muted">已录 <b>${Phonics.count()}</b> / 26 · 没录的字母先用设备语音的近似读音。建议按下面的顺序（学校常用的教学顺序）先录前 6 个。</p>
      ${canRec ? '' : '<p class="warn">⚠️ 这个浏览器不支持录音，请用 iPad 上的 Safari 或 Chrome。</p>'}
      <div class="studio">${PHONICS_GROUPS.flat().map(l => `
        <div class="studio-item ${Phonics.has(l) ? 'done' : ''}">
          <div class="studio-head"><b>${l.toLowerCase()}</b><span class="ipa">${PHONEMES[l].ipa}</span><span>${ALPHABET[l].e} ${ALPHABET[l].word}</span></div>
          <small>${PHONEMES[l].tip}</small>
          <div class="studio-btns">
            <button class="btn btn-mini rec" data-l="${l}" ${canRec ? '' : 'disabled'}>● 录</button>
            <button class="btn btn-mini play" data-l="${l}">▶ 听</button>
            ${Phonics.has(l) ? `<button class="btn btn-mini del" data-l="${l}" aria-label="Delete">✕</button>` : ''}
          </div>
        </div>`).join('')}
      </div>`;
    el.querySelectorAll('.rec').forEach(btn => btn.addEventListener('click', async () => {
      Voice.stop();
      btn.disabled = true;
      btn.textContent = '…';
      try {
        const blob = await Phonics.record(1600, () => { btn.textContent = '🔴 请说'; btn.classList.add('live'); });
        await Phonics.save(btn.dataset.l, blob);
        draw();
        Phonics.play(btn.dataset.l);
      } catch (e) {
        alert(`无法录音：${e.message}\n请在浏览器设置里允许使用麦克风。`);
        draw();
      }
    }));
    el.querySelectorAll('.play').forEach(btn => btn.addEventListener('click', () =>
      speakSteps(() => Phonics.play(btn.dataset.l), ALPHABET[btn.dataset.l].word)));
    el.querySelectorAll('.del').forEach(btn => btn.addEventListener('click', async () => {
      await Phonics.remove(btn.dataset.l);
      draw();
    }));
  };
  Phonics.ready.then(draw);
}


function showParentGate() {
  const a = rnd(3, 9);
  const b = rnd(3, 9);
  const s = screen(`
    ${topbar('🏠', 'Parents 家长')}
    <section class="panel gate">
      <p>家长验证 · Grown-ups only</p>
      <div class="gate-q">${a} × ${b} = ?</div>
      <input id="gate-in" type="number" inputmode="numeric" autocomplete="off">
      <button class="btn btn-go" id="gate-ok">OK</button>
      <p class="gate-err" hidden>再试一次 · Try again</p>
    </section>`);
  on(s, '[data-back]', () => showHome());
  const input = s.querySelector('#gate-in');
  const check = () => {
    if (+input.value === a * b) showParent();
    else {
      s.querySelector('.gate-err').hidden = false;
      input.value = '';
    }
  };
  s.querySelector('#gate-ok').addEventListener('click', check);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
}

function showParent() {
  const set = Store.data.settings;
  const totalPlays = Object.values(Store.data.games).reduce((t, g) => t + g.played, 0);

  const row = g => {
    const name = `<td><button class="guide-link" data-guide="${g.id}">${g.emoji} ${g.title} <span>📖</span></button><small>${g.zh}</small></td>`;
    if (g.free) return `<tr>${name}<td colspan="3" class="muted">自由玩 · free play</td></tr>`;
    const p = Store.data.games[g.id];
    const acc = p && p.total ? Math.round((p.correct / p.total) * 100) + '%' : '—';
    return `<tr>${name}
      <td><select class="lv" data-id="${g.id}" aria-label="Level">${Array.from({ length: g.maxLevel }, (_, i) =>
        `<option value="${i + 1}" ${(p ? p.level : 1) === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}</select>/${g.maxLevel}</td>
      <td>${p ? p.played : 0}</td><td>${acc}</td></tr>`;
  };

  const s = screen(`
    ${topbar('🏠', 'Parents 家长')}
    <section class="panel report">
      <h2>📊 学习报告 Report</h2>
      ${reportHTML()}
    </section>

    <section class="panel focus">
      <h2>🎯 需要加强 Focus areas</h2>
      ${focusAreas()}
    </section>

    <section class="panel" id="readiness">
      <h2>🎒 入学准备清单 School readiness</h2>
      ${readinessHTML()}
    </section>

    <section class="panel">
      <h2>📈 学习进度 Progress</h2>
      <div class="stats">
        <div><b>${Store.data.stars}</b><span>⭐ 星星</span></div>
        <div><b>${Store.data.stickers.length}</b><span>🎁 贴纸</span></div>
        <div><b>${totalPlays}</b><span>🎮 完成游戏</span></div>
      </div>
      <h3>每个游戏 Per game <small>（等级会根据表现自动升降，也可以手动调整 · levels adjust automatically or set them here）</small></h3>
      <table class="prog">
        <thead><tr><th>游戏</th><th>等级</th><th>次数</th><th>一次答对率</th></tr></thead>
        <tbody>
          <tr class="sec"><td colspan="4">🔤 English 英文</td></tr>
          ${GAMES.filter(g => g.subject === 'english').map(row).join('')}
          <tr class="sec"><td colspan="4">🔢 Math 数学</td></tr>
          ${GAMES.filter(g => g.subject === 'math').map(row).join('')}
          <tr class="sec"><td colspan="4">🎒 Kindy Ready 入学准备</td></tr>
          ${GAMES.filter(g => g.subject === 'kindy').map(row).join('')}
          <tr class="sec"><td colspan="4">🀄 中文</td></tr>
          ${GAMES.filter(g => g.subject === 'chinese').map(row).join('')}
        </tbody>
      </table>
    </section>

    <section class="panel">
      <h2>⚙️ 设置 Settings</h2>
      <label class="field">孩子名字 Child's name
        <input id="set-name" maxlength="12" value="${esc(Store.data.name)}">
      </label>
      <label class="field">每个游戏题数 Questions per game
        <select id="set-rounds">${[3, 5, 8, 10].map(n => `<option ${n === set.rounds ? 'selected' : ''}>${n}</option>`).join('')}</select>
      </label>
      <label class="field check"><input type="checkbox" id="set-voice" ${set.voice ? 'checked' : ''}> 语音朗读 Voice</label>
      <label class="field check"><input type="checkbox" id="set-sfx" ${set.sfx ? 'checked' : ''}> 音效 Sound effects</label>
      <label class="field">语速 Speech speed <span id="rate-val">${set.rate}</span>
        <input type="range" id="set-rate" min="0.6" max="1.2" step="0.05" value="${set.rate}">
      </label>
      <label class="field">发音 Voice / accent
        <select id="set-voiceuri"><option value="">自动（优先澳洲英语）Auto – prefers Australian English</option>
          ${Voice.list().map(v => `<option value="${esc(v.voiceURI)}" ${v.voiceURI === set.voiceURI ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}
        </select>
      </label>
      ${Voice.supported ? '' : '<p class="warn">⚠️ 这个浏览器不支持语音朗读，建议使用 Safari / Chrome。</p>'}
      ${!Voice.supported || Voice.hasChinese() ? '' : '<p class="warn">⚠️ 这台设备没有中文语音，中文游戏会读不出来。iPad / iPhone：设置 → 辅助功能 → 朗读内容 → 声音 → 中文，下载一个普通话声音。</p>'}
      <div class="btn-row">
        <button class="btn btn-blue" id="test-voice">🔊 试听 Test</button>
        <button class="btn btn-ghost" id="reset">🗑️ 清空进度 Reset progress</button>
      </div>
      <h3>💾 备份与换设备 Backup</h3>
      <p class="muted">导出一个文件（包含进度、报告数据和字母音录音），在另一台设备上导入即可继续。也可以当作定期备份。</p>
      <div class="btn-row">
        <button class="btn btn-blue" id="export">⬇️ 导出进度 Export</button>
        <label class="btn btn-ghost file-btn">⬆️ 导入进度 Import<input type="file" id="import" accept="application/json,.json" hidden></label>
      </div>
    </section>

    <section class="panel" id="sound-studio"></section>

    <section class="panel tips">
      <h2>🎒 Kindy 入学准备清单</h2>
      <p>这些游戏覆盖了澳洲 Kindy / Prep 入学前常见的准备技能：</p>
      <ul>
        <li>🔤 认识 26 个大小写字母 —— <i>ABC Explorer, Find the Letter, Big &amp; Little</i></li>
        <li>🐶 听出单词的首字母（自然拼读基础）—— <i>First Letter</i></li>
        <li>🎵 押韵（语音意识，阅读的重要基础）—— <i>Rhyme Time</i></li>
        <li>📖 认读常见高频词（sight words）—— <i>Sight Words</i></li>
        <li>✏️ 描写字母、会写/拼自己的名字 —— <i>Trace Letters, Spell My Name</i></li>
        <li>🍎 点数到 20、一一对应 —— <i>Count It!, Number Explorer</i></li>
        <li>🔟 认识数字 0–20、数序 —— <i>Find the Number, What's Next?</i></li>
        <li>⚖️ 比较多少；10 以内加减 —— <i>More or Less, Add &amp; Take Away</i></li>
        <li>🔺 形状、颜色、找规律 —— <i>Shapes, Patterns</i></li>
      </ul>
      <h3>💡 小建议</h3>
      <ul>
        <li>每天 10–15 分钟就够了，短而频繁比一次玩很久效果好。</li>
        <li>尽量陪着玩，答对时一起欢呼，答错时说 “没关系，再试一次”。</li>
        <li>把游戏里学到的带到生活中：数楼梯、在超市找字母、读绘本时找押韵词。</li>
        <li>描红时提醒正确握笔姿势；可以再用纸笔练习写名字。</li>
      </ul>
    </section>`, 'parent');

  on(s, '[data-back]', () => showHome());
  const save = () => Store.save();
  s.querySelectorAll('select.lv').forEach(sel => sel.addEventListener('change', () => {
    const def = GAMES.find(g => g.id === sel.dataset.id);
    Store.game(def.id, def.maxLevel).level = +sel.value;
    save();
  }));
  renderSoundStudio(s.querySelector('#sound-studio'));
  s.querySelectorAll('[data-guide]').forEach(btn => btn.addEventListener('click', () => showGuide(btn.dataset.guide)));
  s.querySelectorAll('[data-ready]').forEach(btn => btn.addEventListener('click', () => {
    Store.data.readiness[btn.dataset.ready] = +btn.dataset.level;
    save();
    const top = window.scrollY;
    showParent();
    window.scrollTo(0, top);
  }));
  s.querySelector('#set-name').addEventListener('input', e => { Store.data.name = e.target.value.trim(); save(); });
  s.querySelector('#set-rounds').addEventListener('change', e => { set.rounds = +e.target.value; save(); });
  s.querySelector('#set-voice').addEventListener('change', e => { set.voice = e.target.checked; save(); });
  s.querySelector('#set-sfx').addEventListener('change', e => { set.sfx = e.target.checked; save(); });
  s.querySelector('#set-rate').addEventListener('input', e => {
    set.rate = +e.target.value;
    s.querySelector('#rate-val').textContent = set.rate;
    save();
  });
  s.querySelector('#set-voiceuri').addEventListener('change', e => { set.voiceURI = e.target.value; save(); });
  s.querySelector('#test-voice').addEventListener('click', () => Voice.say(`Hello ${name()}! A is for apple. One, two, three!`));
  s.querySelector('#export').addEventListener('click', exportProgress);
  s.querySelector('#import').addEventListener('change', e => importProgress(e.target.files[0]));
  s.querySelector('#reset').addEventListener('click', () => {
    if (confirm('确定清空所有进度、星星和贴纸吗？\nReset all progress, stars and stickers?')) {
      Store.reset();
      showParent();
    }
  });
}

showSplash();
