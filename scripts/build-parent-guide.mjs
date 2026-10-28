// Exports the in-app parent guide (apps/web/js/guide.js) to curriculum/parent-guide.md.
//   npm run docs
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const src = await Promise.all(['data.js', 'games.js', 'guide.js'].map(f => readFile(new URL(`apps/web/js/${f}`, root), 'utf8')));
const ctx = vm.createContext({});
vm.runInContext(`${src.join('\n')}\n;globalThis.out = { GAMES, GUIDE, SKILLS };`, ctx);
const { GAMES, GUIDE, SKILLS } = ctx.out;

const missing = GAMES.filter(g => !GUIDE[g.id]).map(g => g.id);
if (missing.length) throw new Error(`No guide entry for: ${missing.join(', ')}`);

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
`;
await writeFile(new URL('curriculum/parent-guide.md', root), md);
console.log(`Wrote curriculum/parent-guide.md (${GAMES.length} games)`);
