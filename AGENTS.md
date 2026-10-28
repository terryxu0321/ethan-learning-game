# AGENTS.md — guide for AI coding agents (Codex, Claude Code, others)

This is the **single source of rules** for any AI agent working in this repo. `CLAUDE.md` only imports this file,
so Codex (reads `AGENTS.md`) and Claude Code (reads `CLAUDE.md`) follow identical instructions. Edit rules here, never in `CLAUDE.md`.

This repo is a company OS: product code + product/curriculum/AI/company docs. Read `README.md` for the map.

## Start here (every session)
1. Read `product/status.md` — what is done, in progress, next, and open questions.
2. Read the relevant part of `product/prd/PRD-001-learning-land.md` (requirements) and `product/game-design-review.md` (game design decisions).
3. Before finishing: run the checks below, update `product/status.md` (done / next / decisions), and commit with a clear message.
   Another agent or model may pick up the work next — leave the repo in a state it can continue from.

## Where things go
- Game code: `apps/web/` (plain HTML/CSS/JS, no build step, served as static files by GitHub Pages from `main`).
  - Game logic: `apps/web/js/games.js` (each game = an object with `question(level)` or `round(ctx)`).
  - Word/picture banks: `apps/web/js/data.js`. Engine & screens: `apps/web/js/app.js`.
  - Learner model (per-item results, spaced review, question targeting, report data): `apps/web/js/learner.js`.
  - Letter sounds & parent recordings (IndexedDB): `apps/web/js/phonics.js`. Readiness checklist: `apps/web/js/readiness.js`.
  - Script load order matters (plain `<script>` tags, shared globals) — see `apps/web/index.html`.
- Requirements: `product/prd/`. New feature specs: `product/specs/` (copy `_template.md`).
- Learning objectives: `curriculum/scope-and-sequence.md` — every new game must map to a row there.
- Parent teaching guide: `apps/web/js/guide.js` — every game needs an entry (goal, skills, how to teach); run `npm run docs` to regenerate `curriculum/parent-guide.md`. The smoke test fails if a game has no guide.
- Technical decisions: `engineering/adr/NNNN-title.md`.
- AI prompts / evals / experiments: `ai/`.
- Market research: `research/<NN-topic>/` with `findings.md`, `sources.md`, `raw/`.

## Rules
1. **Children's privacy**: never add analytics, network calls, accounts, or upload of child data without an ADR and an update to `company/policies/privacy.md`. Progress stays in localStorage by default.
2. **Child safety**: no ads, external links, purchases, or open-ended chat in the child UI. Any LLM/generative output shown to a child must go through the guardrails in `ai/safety/`.
3. **Content licensing**: only self-made, CC0, or explicitly licensed assets. No trademarked characters (Bluey, Paw Patrol, Pokémon…). Research `raw/` folders only hold material whose license permits redistribution.
4. **Kid UX**: every prompt is spoken (non-readers); touch targets ≥ 60px; wrong answers get gentle retry, never penalties.
5. The repo is public: never commit identifying details about the child (school names, photos, recordings, full name). Letter-sound recordings live only in the device's IndexedDB.
6. Keep the root `index.html` redirect working — it preserves the public URL and iPad home-screen shortcuts.

## Commands
- `npm start` — serve locally on :8000
- `npm test` — Playwright smoke test (plays every game at every level). Run before pushing.
- `npm run docs` — regenerate `curriculum/parent-guide.md` and `curriculum/readiness-checklist.md` from the JS sources (CI fails if they are stale).
- First-time setup: `npm install && npx playwright install chromium`. If the sandbox cannot download a browser, at least run `node --check` on changed JS files and say that the smoke test was not run.

## Handoff conventions (multi-agent / multi-model)
- Keep decisions in files, not in chat: product → `product/`, technical → `engineering/adr/`, game design → `product/game-design-review.md`.
- Update `product/status.md` at the end of every work session.
- Commit messages: imperative summary line + short body explaining why. Do not put model names in code, docs or commits.
- Don't rely on tool-specific features in the repo (no agent-only config required to build or test).

## Conventions
- Docs in Simplified Chinese (keep product/tech terms in English); code, comments, commits in English; child-facing UI in English.
- Match the surrounding code style (vanilla JS, template strings, no frameworks).
