# CLAUDE.md — AI agent operating guide

This repo is a company OS: product code + product/curriculum/AI/company docs. Read `README.md` for the map.

## Where things go
- Game code: `apps/web/` (plain HTML/CSS/JS, no build step, served as static files by GitHub Pages from `main`).
  - Game logic: `apps/web/js/games.js` (each game = an object with `question(level)` or `round(ctx)`).
  - Word/picture banks: `apps/web/js/data.js`. Engine & screens: `apps/web/js/app.js`.
- Requirements: `product/prd/`. New feature specs: `product/specs/` (copy `_template.md`).
- Learning objectives: `curriculum/scope-and-sequence.md` — every new game must map to a row there.
- Technical decisions: `engineering/adr/NNNN-title.md`.
- AI prompts / evals / experiments: `ai/`.
- Market research: `research/<NN-topic>/` with `findings.md`, `sources.md`, `raw/`.

## Rules
1. **Children's privacy**: never add analytics, network calls, accounts, or upload of child data without an ADR and an update to `company/policies/privacy.md`. Progress stays in localStorage by default.
2. **Child safety**: no ads, external links, purchases, or open-ended chat in the child UI. Any LLM/generative output shown to a child must go through the guardrails in `ai/safety/`.
3. **Content licensing**: only self-made, CC0, or explicitly licensed assets. No trademarked characters (Bluey, Paw Patrol, Pokémon…). Research `raw/` folders only hold material whose license permits redistribution.
4. **Kid UX**: every prompt is spoken (non-readers); touch targets ≥ 60px; wrong answers get gentle retry, never penalties.
5. Keep the root `index.html` redirect working — it preserves the public URL and iPad home-screen shortcuts.

## Commands
- `npm start` — serve locally on :8000
- `npm test` — Playwright smoke test (plays every game at every level). Run before pushing.

## Conventions
- Docs in Simplified Chinese (keep product/tech terms in English); code, comments, commits in English; child-facing UI in English.
- Match the surrounding code style (vanilla JS, template strings, no frameworks).
