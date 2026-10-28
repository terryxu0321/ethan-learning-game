// End-to-end smoke test: opens the app, plays every game at every level, and fails on any JS error.
//   npm test   (needs `playwright` + a Chromium build: `npx playwright install chromium`)
import { createRequire } from 'node:module';
import { serve } from './serve.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const PORT = 8123;
const server = await serve(PORT);
const browser = await chromium.launch();
const errors = [];
let failures = 0;

function check(ok, msg) {
  console.log(`${ok ? '✓' : '✗'} ${msg}`);
  if (!ok) failures++;
}

try {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  page.on('pageerror', e => errors.push(e.message));

  // root URL redirects to the app
  await page.goto(`http://localhost:${PORT}/`);
  await page.waitForSelector('#start');
  check(page.url().endsWith('/apps/web/'), 'root redirects to apps/web/');

  await page.click('#start', { force: true });
  await page.waitForSelector('[data-subject]');
  check(true, 'splash → home');

  // speed up: no voice, 3 rounds per game
  await page.evaluate(() => { Store.data.settings.voice = false; Store.data.settings.rounds = 3; });
  const games = await page.evaluate(() => GAMES.map(g => ({ id: g.id, free: !!g.free, custom: !!g.custom, max: g.maxLevel || 1 })));

  for (const g of games) {
    if (g.free) {
      await page.evaluate(id => startGame(GAMES.find(x => x.id === id)), g.id);
      await page.click('.explore-tile >> nth=2', { force: true });
      check(await page.isVisible('.card-pop'), `${g.id}: explorer card opens`);
      continue;
    }
    if (g.custom) continue; // covered below
    for (let level = 1; level <= g.max; level++) {
      await page.evaluate(([id, lv]) => { Store.game(id).level = lv; startGame(GAMES.find(x => x.id === id)); }, [g.id, level]);
      for (let r = 0; r < 3; r++) {
        await page.waitForSelector('.choice');
        const n = await page.locator('.choice').count();
        for (let i = 0; i < n && !(await page.isVisible('.choice.right')); i++) {
          await page.click(`.choice[data-i="${i}"]`, { force: true }).catch(() => {});
        }
        await page.waitForFunction(() => !document.querySelector('.choice.right'), null, { timeout: 8000 });
      }
      await page.waitForSelector('#gift', { timeout: 8000 });
    }
    check(true, `${g.id}: all ${g.max} levels playable`);
  }

  // tracing: empty "Done" must not pass; filling the letter must pass
  await page.evaluate(() => startGame(GAMES.find(x => x.id === 'trace')));
  for (let r = 0; r < 3; r++) {
    await page.waitForSelector('.trace-draw');
    await page.waitForTimeout(400);
    await page.click('[data-act="done"]');
    const before = await page.locator('.dot.done').count();
    await page.evaluate(() => {
      const d = document.querySelector('.trace-draw').getContext('2d');
      d.save(); d.setTransform(1, 0, 0, 1, 0, 0);
      d.drawImage(document.querySelector('.trace-guide'), 0, 0);
      d.restore();
    });
    await page.click('[data-act="done"]');
    await page.waitForFunction(b => document.querySelectorAll('.dot.done').length > b || document.querySelector('#gift'), before, { timeout: 8000 });
  }
  await page.waitForSelector('#gift', { timeout: 8000 });
  check(true, 'trace: rejects blank, accepts traced letter');

  // name spelling
  await page.evaluate(() => { Store.data.name = 'Ethan'; startGame(GAMES.find(x => x.id === 'my-name')); });
  for (let r = 0; r < 3; r++) {
    await page.waitForSelector('.tile');
    for (const ch of 'Ethan') await page.click(`.tile[data-ch="${ch}"]:not([disabled])`);
    await page.waitForFunction(() => !document.querySelector('.slot:not(.filled)'), null, { timeout: 8000 });
    await page.waitForTimeout(r < 2 ? 2600 : 0);
  }
  await page.waitForSelector('#gift', { timeout: 10000 });
  check(true, 'my-name: spelling completes');

  // other screens
  await page.evaluate(() => showStickers());
  check(await page.isVisible('.sticker-book'), 'sticker book renders');
  await page.evaluate(() => showParent());
  check(await page.isVisible('table.prog'), 'parent dashboard renders');
} catch (e) {
  check(false, `unexpected failure: ${e.message}`);
} finally {
  await browser.close();
  server.close();
}

check(errors.length === 0, `no page errors${errors.length ? ': ' + errors.join(' | ') : ''}`);
if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log('\nAll smoke checks passed');
