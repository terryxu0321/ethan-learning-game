// Exports the in-app parent guide (apps/web/js/guide.js) to curriculum/parent-guide.md.
//   npm run docs
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const src = await Promise.all(['data.js', 'games.js', 'guide.js', 'readiness.js', 'howto.js'].map(f => readFile(new URL(`apps/web/js/${f}`, root), 'utf8')));
const ctx = vm.createContext({});
vm.runInContext(`${src.join('\n')}\n;globalThis.out = { GAMES, GUIDE, SKILLS, READINESS, READINESS_LEVELS, HOWTO, GAME_PRD };`, ctx);
const { GAMES, GUIDE, SKILLS, READINESS, READINESS_LEVELS, HOWTO, GAME_PRD } = ctx.out;

const missing = GAMES.filter(g => !GUIDE[g.id] || !GAME_PRD[g.id]).map(g => g.id);
if (missing.length) throw new Error(`No guide / GAME_PRD entry for: ${missing.join(', ')}`);

const list = items => items.map(i => `- ${i}`).join('\n');
const section = (title, subject) => [
  `## ${title}`,
  ...GAMES.filter(g => g.subject === subject).map(g => {
    const x = GUIDE[g.id];
    return [
      `### ${g.emoji} ${g.title} · ${g.zh}`,
      `**🎯 学习目标**：${x.goal}`,
      `**📚 对应技能**：${x.skills.map(k => `${k} ${SKILLS[k]}`).join('；')}`,
      `**🪜 等级**\n\n${list(x.levels)}`,
      `**👨‍👩‍👦 家长怎么教**\n\n${list(x.teach)}`,
      `**🏠 生活中练习**\n\n${list(x.everyday)}`,
      `**✅ 达标表现**：${x.mastered}`,
      `**💡 常见困难**：${x.watch}`,
    ].join('\n\n');
  }),
].join('\n\n');

const md = `# 家长教学指南 Parent Guide

> 本文件由 \`npm run docs\` 从 \`apps/web/js/guide.js\` 自动生成，请修改源文件而不是这里。
> 游戏内同样的内容在：家长页 → 每个游戏名称旁的 📖，以及"🎯 需要加强"。
> 技能编号见 [scope-and-sequence.md](scope-and-sequence.md)。

${section('🔤 English 英文', 'english')}

${section('🔢 Math 数学', 'math')}

${section('🎒 Kindy Ready 入学准备', 'kindy')}

${section('🀄 中文', 'chinese')}
`;
await writeFile(new URL('curriculum/parent-guide.md', root), md);
console.log(`Wrote curriculum/parent-guide.md (${GAMES.length} games)`);

const title = id => GAMES.find(g => g.id === id)?.title || id;
const checklist = `# 入学准备清单 School Readiness Checklist

> 本文件由 \`npm run docs\` 从 \`apps/web/js/readiness.js\` 自动生成。App 内：家长页 → 🎒 入学准备清单。
> 依据：PRD-001 §8.1、research/04、research/05。"最低" = 入学时 on track；"最高" ≈ NSW Kindergarten 年末（ES1）。

${READINESS.map(g => [
  `## ${g.title}`,
  `| 项目 | 代码 | ${READINESS_LEVELS.slice(1).join(' | ')} | 相关游戏 |`,
  `|---|---|${READINESS_LEVELS.slice(1).map(() => '---').join('|')}|---|`,
  ...g.rows.map(r => `| ${r.name} | ${r.code} | ${r.levels.join(' | ')} | ${r.games.map(title).join('、') || '线下'} |`),
].join('\n')).join('\n\n')}
`;
await writeFile(new URL('curriculum/readiness-checklist.md', root), checklist);
console.log('Wrote curriculum/readiness-checklist.md');

// Usage guide for parents
const strip = h => h.replace(/<\/?b>/g, '**');
const howto = `# 使用指南：怎么陪孩子用这个平台

> 本文件由 \`npm run docs\` 从 \`apps/web/js/howto.js\` 自动生成。App 内：家长页 → 📘 使用指南。

${HOWTO.map(sec => [`## ${sec.title}`, sec.intro ? strip(sec.intro) : '', sec.items.map(i => `- ${strip(i)}`).join('\n')].filter(Boolean).join('\n\n')).join('\n\n')}
`;
await writeFile(new URL('curriculum/how-to-use.md', root), howto);
console.log('Wrote curriculum/how-to-use.md');

// Game catalog generated from the code, so the list of games in the docs always matches the app
const SUBJECT_TITLES = { english: '🔤 English', math: '🔢 Math', kindy: '🎒 Kindy Ready', chinese: '🀄 中文' };
const catalog = `# 游戏清单 Game Catalog

> 本文件由 \`npm run docs\` 从代码（\`apps/web/js/games.js\`、\`guide.js\`）自动生成，**始终与 App 一致**。共 ${GAMES.length} 个游戏。
> PRD 功能编号见 \`product/prd/PRD-001-learning-land.md\` §6；技能编号见 \`scope-and-sequence.md\`。

${Object.entries(SUBJECT_TITLES).map(([subj, t]) => [
  `## ${t}`,
  '| 顺序 | 游戏 | 中文名 | id | 等级 | 技能 | PRD |',
  '|---|---|---|---|---|---|---|',
  ...GAMES.filter(g => g.subject === subj).map((g, i) => `| ${i + 1} | ${g.emoji} ${g.title}${g.stretch ? '（进阶）' : ''} | ${g.zh} | \`${g.id}\` | ${g.free ? '自由玩' : GUIDE[g.id].levels.join('<br>')} | ${GUIDE[g.id].skills.join(' ')} | ${GAME_PRD[g.id]} |`),
].join('\n')).join('\n\n')}
`;
await writeFile(new URL('curriculum/games.md', root), catalog);
console.log('Wrote curriculum/games.md');
