// End-to-end smoke test: opens the app, plays every game at every level, and fails on any JS error.
//   npm test   (needs `playwright` + a Chromium build: `npx playwright install chromium`)
import { createRequire } from 'node:module';
import { serve } from './serve.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const PORT = 8123;
const server = await serve(PORT);
const browser = await chromium.launch({
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
});
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

  // tracing letters and numbers: empty "Done" must not pass; filling the glyph must pass
  for (const id of ['trace', 'trace-numbers']) {
  for (let level = 1; level <= 3; level++) {
  await page.evaluate(([id, lv]) => { Store.game(id).level = lv; startGame(GAMES.find(x => x.id === id)); }, [id, level]);
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
  }
  check(true, `${id}: rejects blank, accepts traced glyph (3 levels)`);
  }

  // My School Day: tap steps in order
  for (let level = 1; level <= 3; level++) {
    await page.evaluate(lv => { Store.game('school-day').level = lv; startGame(GAMES.find(x => x.id === 'school-day')); }, level);
    for (let r = 0; r < 3; r++) {
      await page.waitForSelector('.rcard');
      const n = await page.locator('.rcard').count();
      for (let i = 0; i < n; i++) await page.click(`.rcard[data-i="${i}"]`);
      await page.waitForFunction(() => !document.querySelector('.rcard:not(.used)'), null, { timeout: 8000 });
      await page.waitForTimeout(r < 2 ? 1500 : 0);
    }
    await page.waitForSelector('#gift', { timeout: 10000 });
  }
  check(true, 'school-day: routines can be ordered (3 levels)');

  // Dino Says: tap only when Dino says, otherwise wait
  for (let level = 1; level <= 3; level++) {
    await page.evaluate(lv => { Store.game('dino-says').level = lv; startGame(GAMES.find(x => x.id === 'dino-says')); }, level);
    for (let r = 0; r < 3; r++) {
      await page.waitForSelector('.dino-says');
      const before = await page.locator('.dot.done').count();
      const { says, target } = await page.evaluate(() => ({ ...document.querySelector('.dino-says').dataset }));
      if (says === '1') await page.click(`.ds-btn[data-n="${target}"]`);
      await page.waitForFunction(b => document.querySelectorAll('.dot.done').length > b || document.querySelector('#gift'), before, { timeout: 8000 });
      await page.waitForTimeout(r < 2 ? 1500 : 0); // next round renders after the praise
    }
    await page.waitForSelector('#gift', { timeout: 10000 });
  }
  check(true, 'dino-says: taps and waits correctly (3 levels)');

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

  // learner model recorded items, and the report + readiness checklist render
  check(await page.evaluate(() => Object.keys(Store.data.items).length >= 10), 'learner model records practised items');
  check(await page.isVisible('.report .map'), 'parent report with mastery map renders');
  await page.click('[data-ready="oral"][data-level="2"]');
  check(await page.evaluate(() => Store.data.readiness.oral === 2), 'readiness checklist saves a level');

  // every game has a teaching guide, and it opens from the dashboard
  const noGuide = await page.evaluate(() => GAMES.filter(g => !GUIDE[g.id] || GUIDE[g.id].skills.some(k => !SKILLS[k])).map(g => g.id));
  check(noGuide.length === 0, `every game has a parent guide${noGuide.length ? ' (missing: ' + noGuide.join(', ') + ')' : ''}`);
  await page.click('[data-guide="letter-sounds"]');
  check(await page.isVisible('.guide-pop'), 'parent guide opens');
  await page.click('.card-close');

  // parent can set a game's level
  await page.selectOption('select.lv[data-id="count"]', '3');
  check(await page.evaluate(() => Store.game('count').level) === 3, 'parent can set level');

  // export → import round trip
  const [download] = await Promise.all([page.waitForEvent('download'), page.click('#export')]);
  const file = await download.path();
  await page.evaluate(() => { Store.data.stars = 0; Store.save(); });
  page.on('dialog', d => d.accept());
  await page.setInputFiles('#import', file);
  await page.waitForFunction(() => Store.data.stars > 0, null, { timeout: 5000 });
  check(true, 'progress export → import restores data');

  // letter-sound recording with a fake microphone; recording is then used in the game
  await page.waitForSelector('#sound-studio .rec');
  await page.click('#sound-studio .rec[data-l="S"]');
  await page.waitForSelector('#sound-studio .del[data-l="S"]', { timeout: 8000 });
  check(await page.evaluate(() => Phonics.has('S')), 'letter sound recorded and saved');
  await page.reload();
  check(await page.evaluate(async () => { await Phonics.ready; return Phonics.has('S'); }), 'recording survives reload');
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
