// Game definitions.
//
// Quiz games implement question(level) and return:
//   { key, say, html, style, choices: [{ html, value }], answer, after?, onMount?(promptEl, ctx) }
// Custom games implement round(ctx) and call ctx.done(firstTry) when a round is finished.
// Free-play games implement open(stage) and have no rounds.

const rnd = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const options = (answer, pool, n) =>
  shuffle([answer, ...shuffle(pool.filter(x => x !== answer)).slice(0, n - 1)]);

// Letters children commonly mix up — used on harder levels.
const CONFUSE = {
  B: ['D', 'P', 'R'], D: ['B', 'P', 'O'], P: ['B', 'Q', 'R'], Q: ['O', 'P', 'G'], R: ['P', 'B'],
  M: ['N', 'W'], N: ['M', 'H', 'U'], W: ['M', 'V'], U: ['V', 'N'], V: ['U', 'W', 'Y'],
  E: ['F', 'B'], F: ['E', 'T'], C: ['G', 'O'], G: ['C', 'Q'], O: ['Q', 'C'],
  I: ['L', 'J', 'T'], L: ['I', 'J'], J: ['I', 'L'], T: ['F', 'I'],
  S: ['Z'], Z: ['S', 'N'], K: ['X'], X: ['K', 'Y'], Y: ['V', 'X'], H: ['N'], A: ['V'],
};

function letterOptions(ans, n, tricky) {
  const picked = tricky && CONFUSE[ans] ? shuffle(CONFUSE[ans]).slice(0, n - 2) : [];
  const rest = shuffle(LETTERS.filter(l => l !== ans && !picked.includes(l))).slice(0, n - 1 - picked.length);
  return shuffle([ans, ...picked, ...rest]);
}

function numberOptions(ans, n, min, max, extra = []) {
  const near = shuffle([-1, 1, -2, 2, 3, -3]).map(d => ans + d);
  const out = [];
  for (const x of [...extra, ...near]) {
    if (x >= min && x <= max && x !== ans && !out.includes(x)) out.push(x);
    if (out.length === n - 1) break;
  }
  return shuffle([ans, ...out]);
}

const emojiRow = (e, n, cls = '') =>
  `<span class="objs ${cls}">${Array.from({ length: n }, () => `<span class="obj">${e}</span>`).join('')}</span>`;

function shapeSVG(name, color) {
  const shapes = {
    circle: '<circle cx="50" cy="50" r="40"/>',
    square: '<rect x="13" y="13" width="74" height="74" rx="6"/>',
    rectangle: '<rect x="4" y="26" width="92" height="48" rx="5"/>',
    triangle: '<polygon points="50,8 94,88 6,88" stroke-linejoin="round"/>',
    oval: '<ellipse cx="50" cy="50" rx="45" ry="28"/>',
    diamond: '<polygon points="50,4 88,50 50,96 12,50" stroke-linejoin="round"/>',
    heart: '<path d="M50 88 C 20 66, 4 46, 17 26 C 29 10, 46 14, 50 29 C 54 14, 71 10, 83 26 C 96 46, 80 66, 50 88 Z"/>',
    star: (() => {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 19 : 45;
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(53 + r * Math.sin(a)).toFixed(1)}`);
      }
      return `<polygon points="${pts.join(' ')}" stroke-linejoin="round"/>`;
    })(),
  };
  return `<svg class="shape" viewBox="0 0 100 100" fill="${color}" stroke="rgba(0,0,0,.18)" stroke-width="3">${shapes[name]}</svg>`;
}

/* ------------------------------------------------------------------ */
/*  ENGLISH                                                            */
/* ------------------------------------------------------------------ */

const ENGLISH_GAMES = [
  {
    id: 'abc-explore',
    title: 'ABC Explorer',
    zh: '字母探索（自由玩）',
    emoji: '🔤',
    color: 'pink',
    free: true,
    intro: 'Tap a letter to hear it!',
    open(stage) {
      stage.innerHTML = `<div class="explore-grid">${LETTERS.map((l, i) =>
        `<button class="explore-tile c${i % 6}" data-l="${l}">${l}<small>${l.toLowerCase()}</small></button>`).join('')}</div>`;
      stage.querySelectorAll('.explore-tile').forEach(btn => btn.addEventListener('click', () => {
        const l = btn.dataset.l;
        const a = ALPHABET[l];
        Sound.pop();
        showCard(`<div class="big-letter">${l}<span>${l.toLowerCase()}</span></div>
          <div class="big-emoji">${a.e}</div><div class="card-word">${a.word}</div>`);
        Voice.say(a.note ? `${l}. ${a.note}` : `${l}. ${l} is for ${a.word}.`);
      }));
    },
  },
  {
    id: 'letter-find',
    title: 'Find the Letter',
    zh: '听音找字母（大写→小写）',
    emoji: '🔍',
    color: 'orange',
    maxLevel: 3,
    intro: "Let's find letters!",
    question(level) {
      const ans = pick(LETTERS);
      const lower = level === 3;
      const show = l => (lower ? l.toLowerCase() : l);
      return {
        key: ans,
        say: lower ? `Find little ${ans}.` : `Find the letter ${ans}.`,
        html: level === 1
          ? `<div class="prompt-text">Find <span class="hl">${ans}</span></div>`
          : `<div class="prompt-text">Find the letter you hear! 👂</div>`,
        style: 'letter',
        choices: letterOptions(ans, level === 1 ? 3 : 4, level > 1).map(l => ({ html: show(l), value: l })),
        answer: ans,
        after: `That's ${ans}!`,
      };
    },
  },
  {
    id: 'case-match',
    title: 'Big & Little',
    zh: '大小写配对',
    emoji: '🅰️',
    color: 'purple',
    maxLevel: 3,
    intro: 'Every big letter has a little letter friend!',
    question(level) {
      const ans = pick(LETTERS);
      const reverse = level === 3;
      const shown = reverse ? ans.toLowerCase() : ans;
      const opts = letterOptions(ans, level === 1 ? 3 : 4, level > 1);
      return {
        key: ans,
        say: reverse ? `This is little ${ans}. Find big ${ans}!` : `This is big ${ans}. Find little ${ans}!`,
        html: `<div class="prompt-letter">${shown}</div>`,
        style: 'letter',
        choices: opts.map(l => ({ html: reverse ? l : l.toLowerCase(), value: l })),
        answer: ans,
        after: `${ans} and ${ans}!`,
      };
    },
  },
  {
    id: 'first-letter',
    title: 'First Letter',
    zh: '首字母发音（自然拼读）',
    emoji: '🐶',
    color: 'yellow',
    maxLevel: 3,
    intro: 'Listen to the word. What letter does it start with?',
    question(level) {
      const item = pick(FIRST_SOUND_WORDS);
      const n = level === 1 ? 3 : 4;
      const showLower = level === 3;
      return {
        key: item.word,
        say: `${item.word}. ${item.word} starts with which letter?`,
        html: `<div class="prompt-emoji">${item.e}</div>
               <div class="prompt-word"><span class="blank">?</span>${item.word.slice(1)}</div>`,
        style: 'letter',
        choices: letterOptions(item.l, n, level > 1).map(l => ({ html: showLower ? l.toLowerCase() : l, value: l })),
        answer: item.l,
        after: `${item.l} for ${item.word}!`,
        onMount(el) {
          el.querySelector('.prompt-emoji').addEventListener('click', () => Voice.say(item.word));
        },
        onCorrect(el) {
          el.querySelector('.blank').textContent = item.word[0];
          el.querySelector('.blank').classList.add('filled');
        },
      };
    },
  },
  {
    id: 'rhyme',
    title: 'Rhyme Time',
    zh: '押韵（语音意识）',
    emoji: '🎵',
    color: 'green',
    maxLevel: 2,
    intro: 'Rhyming words sound the same at the end. Like cat and hat!',
    question(level) {
      const groupIdx = rnd(0, RHYMES.length - 1);
      const [a, b] = shuffle(RHYMES[groupIdx]);
      const others = shuffle(RHYMES.filter((_, i) => i !== groupIdx)).slice(0, level === 1 ? 2 : 3).map(g => pick(g));
      const opts = shuffle([b, ...others]);
      const list = opts.map(o => o.w);
      const spoken = `${list.slice(0, -1).join(', ')}, or ${list[list.length - 1]}`;
      return {
        key: a.w,
        say: `What rhymes with ${a.w}? ${spoken}?`,
        html: `<div class="prompt-emoji">${a.e}</div><div class="prompt-word">${a.w}</div>`,
        style: 'picture',
        choices: opts.map(o => ({ html: `<span class="pic">${o.e}</span><span class="cap">${o.w}</span>`, value: o.w, say: o.w })),
        answer: b.w,
        after: `${a.w}, ${b.w}!`,
      };
    },
  },
  {
    id: 'sight-words',
    title: 'Sight Words',
    zh: '高频词认读',
    emoji: '📖',
    color: 'blue',
    maxLevel: 3,
    intro: "Let's read some words!",
    question(level) {
      const pool = level === 1 ? SIGHT_WORDS.slice(0, 10) : level === 2 ? SIGHT_WORDS.slice(0, 20) : SIGHT_WORDS;
      const ans = pick(pool);
      let opts;
      if (level === 3) {
        // harder: distractors that start with the same letter or have the same length
        const similar = SIGHT_WORDS.filter(w => w !== ans && (w[0].toLowerCase() === ans[0].toLowerCase() || w.length === ans.length));
        opts = shuffle([ans, ...shuffle(similar).slice(0, 2), ...shuffle(pool.filter(w => w !== ans && !similar.includes(w))).slice(0, 1)]);
        while (opts.length < 4) opts = options(ans, pool, 4);
      } else {
        opts = options(ans, pool, level === 1 ? 3 : 4);
      }
      return {
        key: ans,
        say: `Find the word: ${ans}.`,
        html: `<div class="prompt-text">Find the word you hear! 👂</div>`,
        style: 'word',
        choices: opts.map(w => ({ html: w, value: w })),
        answer: ans,
        after: `${ans}!`,
      };
    },
  },
  {
    id: 'trace',
    title: 'Trace Letters',
    zh: '描红写字母',
    emoji: '✏️',
    color: 'teal',
    maxLevel: 3,
    custom: true,
    intro: "Let's practise writing! Trace the letter with your finger.",
    round: traceRound,
  },
  {
    id: 'my-name',
    title: 'Spell My Name',
    zh: '拼写自己的名字',
    emoji: '📛',
    color: 'red',
    maxLevel: 3,
    rounds: 3,
    custom: true,
    intro: "Let's spell your name!",
    round: nameRound,
  },
];

/* ------------------------------------------------------------------ */
/*  MATH                                                               */
/* ------------------------------------------------------------------ */

const MATH_GAMES = [
  {
    id: 'number-explore',
    title: 'Number Explorer',
    zh: '数字探索（自由玩）',
    emoji: '🔢',
    color: 'blue',
    free: true,
    intro: 'Tap a number to see how many!',
    open(stage) {
      stage.innerHTML = `<div class="explore-grid numbers">${Array.from({ length: 21 }, (_, n) =>
        `<button class="explore-tile c${n % 6}" data-n="${n}">${n}</button>`).join('')}</div>`;
      stage.querySelectorAll('.explore-tile').forEach(btn => btn.addEventListener('click', () => {
        const n = +btn.dataset.n;
        const item = pick(COUNT_ITEMS);
        Sound.pop();
        showCard(`<div class="big-letter">${n}</div>
          <div class="card-objs">${n ? emojiRow(item.e, n, 'tenframe') : '<span class="zero">Nothing! 🙈</span>'}</div>`);
        Voice.say(n === 0 ? 'Zero. Nothing at all!' : `${n}. ${n} ${n === 1 ? item.one : item.many}.`);
      }));
    },
  },
  {
    id: 'count',
    title: 'Count It!',
    zh: '点数（1–20）',
    emoji: '🍎',
    color: 'red',
    maxLevel: 3,
    intro: "Let's count! Tap each one as you count.",
    question(level) {
      const [min, max] = level === 1 ? [1, 5] : level === 2 ? [3, 10] : [10, 20];
      const n = rnd(min, max);
      const item = pick(COUNT_ITEMS);
      return {
        key: `${n}`,
        say: `How many ${item.many}? Tap them to count!`,
        html: `<div class="count-area">${emojiRow(item.e, n, 'tenframe tappable')}</div>`,
        style: 'number',
        choices: numberOptions(n, level === 3 ? 4 : 3, min === 1 ? 1 : 0, max + 2).map(x => ({ html: x, value: x })),
        answer: n,
        after: `${n} ${n === 1 ? item.one : item.many}!`,
        onMount(el) {
          let counted = 0;
          el.querySelectorAll('.obj').forEach(o => o.addEventListener('click', () => {
            if (o.classList.contains('counted')) return;
            counted++;
            o.classList.add('counted');
            o.dataset.n = counted;
            Sound.pop();
            Voice.say(String(counted));
          }));
        },
      };
    },
  },
  {
    id: 'number-find',
    title: 'Find the Number',
    zh: '认识数字 0–20',
    emoji: '🔟',
    color: 'yellow',
    maxLevel: 3,
    intro: "Let's find numbers!",
    question(level) {
      if (level === 3) {
        // teen numbers vs. twenty-somethings: 13 vs 31, 12 vs 21…
        const n = rnd(11, 19);
        const flip = Number(String(n).split('').reverse().join(''));
        return {
          key: `${n}`,
          say: `Find the number ${n}.`,
          html: `<div class="prompt-text">Find the number you hear! 👂</div>`,
          style: 'number',
          choices: numberOptions(n, 4, 10, 99, [flip]).map(x => ({ html: x, value: x })),
          answer: n,
          after: `That's ${n}!`,
        };
      }
      const max = level === 1 ? 10 : 20;
      const n = rnd(level === 1 ? 1 : 0, max);
      return {
        key: `${n}`,
        say: `Find the number ${n}.`,
        html: level === 1
          ? `<div class="prompt-text">Find <span class="hl">${n}</span></div>`
          : `<div class="prompt-text">Find the number you hear! 👂</div>`,
        style: 'number',
        choices: numberOptions(n, level === 1 ? 3 : 4, 0, max).map(x => ({ html: x, value: x })),
        answer: n,
        after: `That's ${n}!`,
      };
    },
  },
  {
    id: 'whats-next',
    title: "What's Next?",
    zh: '数序：前一个/后一个',
    emoji: '➡️',
    color: 'green',
    maxLevel: 3,
    intro: 'Numbers go in order. One, two, three…',
    question(level) {
      const max = level === 1 ? 10 : 20;
      const before = level === 3 && Math.random() < 0.5;
      const start = rnd(before ? 1 : 0, max - 3);
      const seq = [start, start + 1, start + 2, start + 3];
      const ans = before ? seq[0] : seq[3];
      const shown = before ? ['?', seq[1], seq[2], seq[3]] : [seq[0], seq[1], seq[2], '?'];
      return {
        key: `${before}${ans}`,
        say: before
          ? `What comes before ${seq[1]}?`
          : `${seq[0]}, ${seq[1]}, ${seq[2]}… what comes next?`,
        html: `<div class="seq">${shown.map(x => `<span class="seq-item ${x === '?' ? 'q' : ''}">${x}</span>`).join('')}</div>`,
        style: 'number',
        choices: numberOptions(ans, level === 1 ? 3 : 4, 0, max).map(x => ({ html: x, value: x })),
        answer: ans,
        after: before ? `${ans} comes before ${seq[1]}!` : `${seq[0]}, ${seq[1]}, ${seq[2]}, ${ans}!`,
        onCorrect(el) {
          const q = el.querySelector('.seq-item.q');
          q.textContent = ans;
          q.classList.replace('q', 'filled');
        },
      };
    },
  },
  {
    id: 'more-less',
    title: 'More or Less',
    zh: '比较多少',
    emoji: '⚖️',
    color: 'purple',
    maxLevel: 3,
    intro: "Let's compare! Which group has more?",
    question(level) {
      const gap = level === 1 ? 3 : level === 2 ? 2 : 1;
      let a, b;
      do { a = rnd(1, 10); b = rnd(1, 10); } while (Math.abs(a - b) < gap);
      const fewer = level > 1 && Math.random() < 0.5;
      const item = pick(COUNT_ITEMS);
      const ans = fewer ? Math.min(a, b) : Math.max(a, b);
      return {
        key: `${a}-${b}-${fewer}`,
        say: fewer ? `Which group has fewer ${item.many}?` : `Which group has more ${item.many}?`,
        html: `<div class="prompt-text">Which has <span class="hl">${fewer ? 'fewer' : 'more'}</span>?</div>`,
        style: 'tray',
        choices: [a, b].map((n, i) => ({ html: emojiRow(item.e, n, 'tenframe'), value: n, id: i })),
        answer: ans,
        after: `${Math.max(a, b)} is more than ${Math.min(a, b)}!`,
      };
    },
  },
  {
    id: 'add',
    title: 'Add & Take Away',
    zh: '10以内加减法',
    emoji: '➕',
    color: 'orange',
    maxLevel: 3,
    intro: "Let's add things together!",
    question(level) {
      const item = pick(COUNT_ITEMS);
      if (level === 3 && Math.random() < 0.5) {
        const a = rnd(3, 10);
        const b = rnd(1, a - 1);
        const ans = a - b;
        return {
          key: `${a}-${b}`,
          say: `There are ${a} ${item.many}. ${b} ${b === 1 ? 'goes' : 'go'} away. How many are left?`,
          html: `<div class="sum">${Array.from({ length: a }, (_, i) =>
            `<span class="obj ${i >= ans ? 'gone' : ''}">${item.e}</span>`).join('')}</div>
            <div class="sum-numbers">${a} − ${b} = <span class="q">?</span></div>`,
          style: 'number',
          choices: numberOptions(ans, 4, 0, 10).map(x => ({ html: x, value: x })),
          answer: ans,
          after: `${a} take away ${b} is ${ans}!`,
          onCorrect: fillAnswer(ans),
        };
      }
      const max = level === 1 ? 5 : 10;
      const a = rnd(1, max - 1);
      const b = rnd(1, max - a);
      const ans = a + b;
      return {
        key: `${a}+${b}`,
        say: `${a} ${a === 1 ? item.one : item.many}, and ${b} more. How many altogether?`,
        html: `<div class="sum">${emojiRow(item.e, a)}<span class="op">+</span>${emojiRow(item.e, b)}</div>
               <div class="sum-numbers">${a} + ${b} = <span class="q">?</span></div>`,
        style: 'number',
        choices: numberOptions(ans, level === 1 ? 3 : 4, 1, max).map(x => ({ html: x, value: x })),
        answer: ans,
        after: `${a} plus ${b} is ${ans}!`,
        onCorrect: fillAnswer(ans),
      };
    },
  },
  {
    id: 'shapes',
    title: 'Shapes',
    zh: '认识形状和颜色',
    emoji: '🔺',
    color: 'pink',
    maxLevel: 3,
    intro: "Let's find shapes!",
    question(level) {
      const basic = ['circle', 'square', 'triangle', 'rectangle'];
      const all = [...basic, 'star', 'heart', 'oval', 'diamond'];
      if (level === 3) {
        // colour + shape: distractors share either the colour or the shape
        const shape = pick(all);
        const color = pick(SHAPE_COLORS);
        const otherColor = pick(SHAPE_COLORS.filter(c => c !== color));
        const otherShape = pick(all.filter(s => s !== shape));
        const items = [
          { shape, color, ok: true },
          { shape, color: otherColor },
          { shape: otherShape, color },
          { shape: pick(all.filter(s => s !== shape && s !== otherShape)), color: pick(SHAPE_COLORS.filter(c => c !== color)) },
        ];
        return {
          key: `${color.name}${shape}`,
          say: `Find the ${color.name} ${shape}.`,
          html: `<div class="prompt-text">Find the shape you hear! 👂</div>`,
          style: 'shape',
          choices: shuffle(items).map((it, i) => ({ html: shapeSVG(it.shape, it.color.hex), value: it.ok ? 'yes' : `no${i}` })),
          answer: 'yes',
          after: `The ${color.name} ${shape}!`,
        };
      }
      const pool = level === 1 ? basic : all;
      const ans = pick(pool);
      const opts = options(ans, pool, level === 1 ? 3 : 4);
      const colors = shuffle(SHAPE_COLORS);
      return {
        key: ans,
        say: `Find the ${ans}.`,
        html: `<div class="prompt-text">Find the <span class="hl">${ans}</span></div>`,
        style: 'shape',
        choices: opts.map((s, i) => ({ html: shapeSVG(s, colors[i].hex), value: s })),
        answer: ans,
        after: `That's a ${ans}!`,
      };
    },
  },
  {
    id: 'patterns',
    title: 'Patterns',
    zh: '找规律',
    emoji: '🔴',
    color: 'teal',
    maxLevel: 3,
    intro: 'Patterns repeat again and again. What comes next?',
    question(level) {
      const units = level === 1 ? [[0, 1]] : level === 2 ? [[0, 0, 1], [0, 1, 1], [0, 1]] : [[0, 1, 2], [0, 0, 1, 1], [0, 1, 1, 2]];
      const unit = pick(units);
      const set = shuffle(pick(PATTERN_SETS));
      const len = unit.length * 2 + rnd(0, unit.length - 1);
      const seq = Array.from({ length: len }, (_, i) => set[unit[i % unit.length]]);
      const ans = set[unit[len % unit.length]];
      const used = [...new Set(unit)].map(i => set[i]);
      const pool = [...used, ...set.filter(s => !used.includes(s))].slice(0, Math.max(3, used.length + 1));
      return {
        key: seq.join('') + ans,
        say: 'What comes next?',
        html: `<div class="seq pattern">${seq.map(s => `<span class="seq-item">${s}</span>`).join('')}<span class="seq-item q">?</span></div>`,
        style: 'picture',
        choices: shuffle(pool).map(s => ({ html: `<span class="pic">${s}</span>`, value: s })),
        answer: ans,
        onCorrect(el) {
          const q = el.querySelector('.seq-item.q');
          q.textContent = ans;
          q.classList.replace('q', 'filled');
        },
      };
    },
  },
];

function fillAnswer(ans) {
  return el => {
    const q = el.querySelector('.sum-numbers .q');
    q.textContent = ans;
    q.classList.add('filled');
  };
}

/* ------------------------------------------------------------------ */
/*  Custom games                                                       */
/* ------------------------------------------------------------------ */

function nameLetters() {
  const letters = (Store.data.name || '').replace(/[^A-Za-z]/g, '').slice(0, 12);
  return letters || 'Ethan';
}

function traceRound(ctx) {
  const { stage, level } = ctx;
  let L;
  if (level === 1) {
    // start with the letters in his own name
    const own = [...new Set(nameLetters().toUpperCase().split(''))];
    L = pick(own.length > 1 ? own.filter(l => l !== ctx.memo.last) : own);
  } else {
    L = pick(LETTERS.filter(l => l !== ctx.memo.last));
  }
  ctx.memo.last = L;
  const glyph = level === 3 ? L.toLowerCase() : L;
  const word = ALPHABET[L];

  stage.innerHTML = `
    <div class="trace-wrap">
      <div class="trace-hint"><span>${word.e}</span> ${glyph} is for ${word.word}</div>
      <div class="trace-box"><canvas class="trace-guide"></canvas><canvas class="trace-draw"></canvas></div>
      <div class="trace-btns">
        <button class="btn btn-ghost" data-act="clear">🧽 Clear</button>
        <button class="btn btn-go" data-act="done">✅ Done!</button>
      </div>
    </div>`;

  const sayText = `Trace ${level === 3 ? 'little' : 'big'} ${L}. ${L} is for ${word.word}.`;
  ctx.prompt(sayText);

  const box = stage.querySelector('.trace-box');
  const guide = stage.querySelector('.trace-guide');
  const draw = stage.querySelector('.trace-draw');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = Math.min(box.clientWidth, 420);
  [guide, draw].forEach(c => {
    c.width = size * dpr;
    c.height = size * dpr;
    c.style.width = c.style.height = size + 'px';
  });
  box.style.height = size + 'px';

  const fontSize = size * (level === 3 ? 0.78 : 0.82);
  const font = `600 ${fontSize}px Fredoka, "Arial Rounded MT Bold", sans-serif`;
  const g = guide.getContext('2d');
  const d = draw.getContext('2d');
  g.scale(dpr, dpr);
  d.scale(dpr, dpr);

  // mask used to measure how much of the letter has been traced
  const mask = document.createElement('canvas');
  mask.width = mask.height = size;
  const m = mask.getContext('2d');
  let maskData = null;
  let letterPixels = 0;

  const paintGuide = () => {
    [g, m].forEach(c => {
      c.clearRect(0, 0, size, size);
      c.font = font;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
    });
    const y = size * (level === 3 ? 0.46 : 0.54);
    g.fillStyle = '#eceff7';
    g.fillText(glyph, size / 2, y);
    g.setLineDash([6, 8]);
    g.lineWidth = 3;
    g.strokeStyle = '#b8bfd6';
    g.strokeText(glyph, size / 2, y);
    m.fillStyle = '#000';
    m.fillText(glyph, size / 2, y);
    maskData = m.getImageData(0, 0, size, size).data;
    letterPixels = 0;
    for (let i = 3; i < maskData.length; i += 16) if (maskData[i] > 128) letterPixels++;
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(paintGuide);

  const colors = ['#ff5a5f', '#3b9cff', '#33c47a', '#9b6bff', '#ff9233'];
  d.lineCap = 'round';
  d.lineJoin = 'round';
  d.lineWidth = size * 0.075;
  d.strokeStyle = pick(colors);
  let drawing = false;
  let tries = 0;
  const pos = e => {
    const r = draw.getBoundingClientRect();
    return [(e.clientX - r.left) * (size / r.width), (e.clientY - r.top) * (size / r.height)];
  };
  draw.addEventListener('pointerdown', e => {
    drawing = true;
    draw.setPointerCapture(e.pointerId);
    const [x, y] = pos(e);
    d.beginPath();
    d.moveTo(x, y);
    d.lineTo(x + 0.1, y);
    d.stroke();
  });
  draw.addEventListener('pointermove', e => {
    if (!drawing) return;
    const [x, y] = pos(e);
    d.lineTo(x, y);
    d.stroke();
  });
  const end = () => { drawing = false; };
  draw.addEventListener('pointerup', end);
  draw.addEventListener('pointercancel', end);

  stage.querySelector('[data-act="clear"]').addEventListener('click', () => {
    Sound.tap();
    d.clearRect(0, 0, size, size);
    d.strokeStyle = pick(colors);
  });

  stage.querySelector('[data-act="done"]').addEventListener('click', e => {
    if (!maskData) return;
    // compare the drawing with the letter mask (sampling every 4th pixel)
    const small = document.createElement('canvas');
    small.width = small.height = size;
    small.getContext('2d').drawImage(draw, 0, 0, size, size);
    const dd = small.getContext('2d').getImageData(0, 0, size, size).data;
    let covered = 0;
    let outside = 0;
    for (let i = 3; i < dd.length; i += 16) {
      const inLetter = maskData[i] > 128;
      const inked = dd[i] > 40;
      if (inLetter && inked) covered++;
      else if (inked) outside++;
    }
    const coverage = covered / Math.max(1, letterPixels);
    const spill = outside / Math.max(1, letterPixels);
    if (coverage > 0.45 && spill < 1.6) {
      e.currentTarget.disabled = true;
      ctx.success(box);
      ctx.done(tries === 0);
    } else {
      tries++;
      Sound.wrong();
      box.classList.remove('shake');
      void box.offsetWidth;
      box.classList.add('shake');
      Voice.say(spill >= 1.6 ? 'Try to stay on the grey letter!' : `Almost! Trace all of the ${L}.`);
    }
  });
}

function nameRound(ctx) {
  const { stage, level } = ctx;
  const name = nameLetters();
  const target = name[0].toUpperCase() + name.slice(1).toLowerCase();
  const extras = level === 1 ? [] : shuffle(LETTERS.filter(l => !target.toUpperCase().includes(l))).slice(0, 2).map(l => l.toLowerCase());
  const tiles = shuffle([...target.split(''), ...extras]);

  stage.innerHTML = `
    <div class="name-wrap">
      <div class="name-slots">${target.split('').map(ch =>
        `<span class="slot">${level < 3 ? `<i>${ch}</i>` : ''}</span>`).join('')}</div>
      <div class="name-tiles">${tiles.map((ch, i) =>
        `<button class="tile c${i % 6}" data-ch="${ch}">${ch}</button>`).join('')}</div>
    </div>`;
  ctx.prompt(level < 3
    ? `Spell ${target}. Tap the letters in order!`
    : `Can you spell ${target} all by yourself?`);

  const slots = stage.querySelectorAll('.slot');
  let at = 0;
  let first = true;
  stage.querySelectorAll('.tile').forEach(t => t.addEventListener('click', () => {
    if (at >= target.length || t.disabled) return;
    if (t.dataset.ch === target[at]) {
      t.disabled = true;
      t.classList.add('used');
      slots[at].innerHTML = `<b>${target[at]}</b>`;
      slots[at].classList.add('filled');
      Sound.pop();
      Voice.say(target[at].toUpperCase());
      at++;
      if (at === target.length) {
        setTimeout(() => {
          ctx.success(stage.querySelector('.name-slots'), `${target.split('').map(c => c.toUpperCase()).join(', ')}. ${target}! You spelled your name!`);
          ctx.done(first);
        }, 600);
      }
    } else {
      first = false;
      Sound.wrong();
      t.classList.remove('shake');
      void t.offsetWidth;
      t.classList.add('shake');
      Voice.say(`Oops! Find ${target[at].toUpperCase()}.`);
    }
  }));
}

const GAMES = [...ENGLISH_GAMES.map(g => ({ ...g, subject: 'english' })), ...MATH_GAMES.map(g => ({ ...g, subject: 'math' }))];
