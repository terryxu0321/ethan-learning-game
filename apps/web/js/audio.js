// Sound effects (generated with Web Audio, no files needed) and text-to-speech.

const Sound = (() => {
  let ctx = null;

  function ac() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type = 'sine', vol = 0.18) {
    const c = ac();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    const t = c.currentTime + start;
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  const on = () => Store.data.settings.sfx;

  return {
    unlock() { ac(); },
    correct() {
      if (!on()) return;
      [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.08, 0.28, 'triangle'));
    },
    wrong() {
      if (!on()) return;
      tone(311, 0, 0.18, 'sine', 0.15);
      tone(233, 0.15, 0.3, 'sine', 0.15);
    },
    pop() {
      if (!on()) return;
      tone(500 + Math.random() * 500, 0, 0.12, 'sine', 0.15);
    },
    tap() {
      if (!on()) return;
      tone(880, 0, 0.06, 'triangle', 0.08);
    },
    fanfare() {
      if (!on()) return;
      [523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.3, 'triangle', 0.16));
    },
    sparkle() {
      if (!on()) return;
      [1319, 1568, 1760, 2093, 2637].forEach((f, i) => tone(f, i * 0.06, 0.2, 'sine', 0.08));
    },
  };
})();

const Voice = (() => {
  const supported = 'speechSynthesis' in window;
  let voices = [];
  const keep = []; // hold references so Chrome doesn't garbage-collect utterances mid-speech

  function load() {
    voices = speechSynthesis.getVoices();
  }
  if (supported) {
    load();
    speechSynthesis.addEventListener?.('voiceschanged', load);
  }

  const norm = s => s.replace('_', '-').toLowerCase();

  function pickChinese() {
    const zh = voices.filter(v => /^zh/i.test(v.lang));
    // Mandarin (mainland) first, then Taiwan, then any Chinese voice
    return zh.find(v => norm(v.lang) === 'zh-cn') || zh.find(v => norm(v.lang) === 'zh-tw') || zh[0] || null;
  }

  function pick() {
    const uri = Store.data.settings.voiceURI;
    if (uri) {
      const chosen = voices.find(v => v.voiceURI === uri);
      if (chosen) return chosen;
    }
    // Prefer an Australian voice (for kindy!), then British, then US, then any English.
    const english = voices.filter(v => /^en/i.test(v.lang));
    for (const lang of ['en-au', 'en-gb', 'en-us']) {
      const local = english.filter(v => norm(v.lang) === lang);
      const nice = local.find(v => /natural|premium|enhanced|google|karen|samantha/i.test(v.name));
      if (nice || local[0]) return nice || local[0];
    }
    return english[0] || null;
  }

  // Each new (non-queued) utterance starts a new "turn", which cancels any speakSteps() sequence still running.
  let turn = 0;

  // lang: 'en' (default) or 'zh-CN'. Games set Voice.lang for their whole session.
  let gameLang = null;

  function say(text, { queue = false, keepTurn = false, lang = gameLang } = {}) {
    if (!keepTurn && !queue) {
      turn++;
      if (typeof Phonics !== 'undefined') Phonics.stop();
    }
    if (!supported || !Store.data.settings.voice || !text) return Promise.resolve();
    if (!queue) speechSynthesis.cancel();
    return new Promise(resolve => {
      const u = new SpeechSynthesisUtterance(text);
      const zh = /^zh/i.test(lang || '');
      const v = zh ? pickChinese() : pick();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = zh ? 'zh-CN' : 'en-AU'; }
      u.rate = Store.data.settings.rate;
      u.pitch = 1.1;
      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        const i = keep.indexOf(u);
        if (i >= 0) keep.splice(i, 1);
        resolve();
      };
      u.onend = done;
      u.onerror = done;
      // Safety net: some browsers never fire onend.
      setTimeout(done, 1500 + text.length * (zh ? 380 : 110) / Store.data.settings.rate);
      keep.push(u);
      speechSynthesis.speak(u);
    });
  }

  return {
    supported,
    say,
    stop() {
      turn++;
      if (typeof Phonics !== 'undefined') Phonics.stop();
      if (supported) speechSynthesis.cancel();
    },
    list() { return voices.filter(v => /^en/i.test(v.lang)); },
    hasChinese() { return !!pickChinese(); },
    get lang() { return gameLang; },
    set lang(l) { gameLang = l; },
    get turn() { return turn; },
    nextTurn() { if (typeof Phonics !== 'undefined') Phonics.stop(); return ++turn; },
  };
})();

// Speak several steps in order. A step is text, or an async function (e.g. play a recorded sound).
// Stops early if anything else starts speaking in the meantime.
async function speakSteps(...steps) {
  const my = Voice.nextTurn();
  for (const step of steps) {
    if (Voice.turn !== my) return;
    if (typeof step === 'function') await step();
    else if (step) await Voice.say(step, { keepTurn: true });
  }
}
