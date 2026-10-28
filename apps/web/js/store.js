// Saves progress in the browser (localStorage) so it survives page reloads.
const Store = {
  KEY: 'ethan-learning-game-v1',

  defaults() {
    return {
      name: 'Ethan',
      stars: 0,
      stickers: [],
      games: {},
      days: {},
      daily: {},     // day → { rounds, ok, ms }
      items: {},     // gameId → item key → { n, ok, box, last, label } (see learner.js)
      readiness: {}, // checklist row id → level 0–3
      settings: { voice: true, sfx: true, rate: 0.9, voiceURI: '', rounds: 5 },
    };
  },

  load() {
    const def = this.defaults();
    try {
      const raw = localStorage.getItem(this.KEY);
      const saved = raw ? JSON.parse(raw) : {};
      this.data = { ...def, ...saved, settings: { ...def.settings, ...(saved.settings || {}) } };
    } catch (e) {
      this.data = def;
    }
  },

  save() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(this.data));
    } catch (e) { /* private mode etc. — keep playing without saving */ }
  },

  reset() {
    const { name, settings } = this.data;
    this.data = { ...this.defaults(), name, settings };
    this.save();
  },

  game(id, maxLevel = 3) {
    const g = this.data.games[id] || (this.data.games[id] = { level: 1, played: 0, correct: 0, total: 0 });
    g.level = Math.max(1, Math.min(g.level, maxLevel));
    return g;
  },

  dayKey(d = new Date()) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  logPlay() {
    const k = this.dayKey();
    this.data.days[k] = (this.data.days[k] || 0) + 1;
  },
};

Store.load();
