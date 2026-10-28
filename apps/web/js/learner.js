// Learner model: remembers every item Ethan practises (a letter, a number, a sum…), schedules review,
// steers question choice towards weak and due items, and summarises progress for the parent report.
// Everything stays in localStorage on this device.

const Learner = (() => {
  const REVIEW_DAYS = [0, 1, 2, 4, 7]; // Leitner box → days until the item is due again
  const DAY = 86400000;

  const items = gameId => (Store.data.items[gameId] ||= {});
  const today = () => Store.dayKey();
  const daysSince = key => (key ? Math.round((new Date(today()) - new Date(key)) / DAY) : Infinity);

  function status(it) {
    if (!it || !it.n) return 'new';
    if (it.box >= 3) return 'mastered';
    if (it.box === 0 && it.ok / it.n < 0.6) return 'weak';
    return 'learning';
  }

  // How much we want to practise an item now (higher = more likely to be asked).
  function weight(it) {
    const s = status(it);
    if (s === 'new') return 2;
    if (s === 'weak') return 4;
    const due = daysSince(it.last) >= REVIEW_DAYS[it.box];
    if (s === 'mastered') return due ? 1.5 : 0.3;
    return due ? 2.5 : 1;
  }

  return {
    status,

    // Called once per round.
    record(gameId, key, label, firstTry, ms) {
      const it = (items(gameId)[key] ||= { n: 0, ok: 0, box: 0, label });
      it.n++;
      it.label = label;
      it.last = today();
      if (firstTry) { it.ok++; it.box = Math.min(it.box + 1, REVIEW_DAYS.length - 1); } else it.box = 0;
      const d = (Store.data.daily[today()] ||= { rounds: 0, ok: 0, ms: 0 });
      d.rounds++;
      if (firstTry) d.ok++;
      d.ms += Math.min(ms, 120000); // ignore long idle gaps
    },

    // Make several candidate questions and pick one, favouring weak and due items.
    // Keeps generating (up to 60 tries) until a weak/due item is among the candidates, if there is one.
    pickQuestion(def, level, used) {
      const its = items(def.id);
      const wanted = new Set(Object.keys(its).filter(k => !used.has(k) && weight(its[k]) >= 2.5));
      const cands = [];
      let found = wanted.size === 0;
      for (let tries = 0; tries < 60 && (cands.length < 6 || !found); tries++) {
        const q = def.question(level);
        if (used.has(q.key) || cands.some(c => c.key === q.key)) continue;
        if (wanted.has(q.key)) found = true;
        else if (cands.length >= 6) continue;
        cands.push(q);
      }
      if (!cands.length) return def.question(level);
      const w = cands.map(q => weight(items(def.id)[q.key]));
      let r = Math.random() * w.reduce((a, b) => a + b, 0);
      for (let i = 0; i < cands.length; i++) if ((r -= w[i]) <= 0) return cands[i];
      return cands[cands.length - 1];
    },

    item: (gameId, key) => items(gameId)[key],

    // Items that need attention across all games, weakest first.
    weakItems(limit = 10) {
      const out = [];
      for (const [gameId, its] of Object.entries(Store.data.items)) {
        for (const [key, it] of Object.entries(its)) {
          if (status(it) === 'weak') out.push({ gameId, key, ...it });
        }
      }
      return out.sort((a, b) => a.ok / a.n - b.ok / b.n || b.n - a.n).slice(0, limit);
    },

    counts(gameId) {
      const c = { mastered: 0, learning: 0, weak: 0 };
      Object.values(items(gameId)).forEach(it => { c[status(it)]++; });
      return c;
    },

    // Totals for the `days` days ending `offset` days ago.
    period(days, offset = 0) {
      const t = { rounds: 0, ok: 0, ms: 0, active: 0 };
      for (let i = offset; i < offset + days; i++) {
        const d = Store.data.daily[Store.dayKey(new Date(Date.now() - i * DAY))];
        if (!d) continue;
        t.rounds += d.rounds;
        t.ok += d.ok;
        t.ms += d.ms;
        if (d.rounds) t.active++;
      }
      return t;
    },

    lastPlayed(gameId) {
      const days = Object.values(items(gameId)).map(it => it.last).filter(Boolean).sort();
      return days.length ? daysSince(days[days.length - 1]) : Infinity;
    },
  };
})();
