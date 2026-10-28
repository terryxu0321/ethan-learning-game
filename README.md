# 🦖 Learning Land — Company OS

这个仓库是 **Learning Land**（暂定名）的"公司操作系统"：产品代码、产品文档、教学内容、AI 研发、市场研究和公司运营都在这里，
人和 AI Agent 都以这里为唯一信息源（single source of truth）。

第一个产品是 **Ethan's Learning Land**：给 4–6 岁孩子的语音引导式英文 + 数学学习游戏，帮助孩子为澳洲 Kindy / Prep 做准备。

▶ **在线试玩**：https://terryxu0321.github.io/ethan-learning-game/

## 目录导航

| 目录 | 内容 | 负责人* |
|---|---|---|
| [`apps/web/`](apps/web/) | 现在的网页版游戏（HTML/CSS/JS，GitHub Pages 部署） | Engineering |
| [`product/`](product/) | 产品愿景、**PRD**、功能规格 | Product |
| [`curriculum/`](curriculum/) | 教学大纲：技能 → 游戏 → 等级的对应关系（对齐澳洲课程） | Learning |
| [`design/`](design/) | 品牌、角色 Dino、设计规范 | Design |
| [`ai/`](ai/) | AI 研发：提示词、评测集、安全护栏、实验记录 | AI |
| [`research/`](research/) | 市场研究、行业实践、用户（试玩）研究 | Product |
| [`engineering/`](engineering/) | 架构、技术决策记录（ADR）、运维手册 | Engineering |
| [`company/`](company/) | 使命愿景、OKR、运营节奏、儿童安全/隐私/AI 使用政策 | Founder |
| [`tests/`](tests/) | 自动化测试 | Engineering |
| [`.github/`](.github/) | CI、PR 模板、Issue 模板（功能 / Bug / 试玩记录） | — |

\* 早期一人分饰多角，"负责人"指的是职能，而不是具体的人。

## 常用操作

```bash
npm start          # 本地运行游戏 → http://localhost:8000
npm install && npx playwright install chromium
npm test           # 端到端冒烟测试：每个游戏、每个等级都自动玩一遍
```

不想用命令行的话，直接双击 `apps/web/index.html` 也能玩。

## 工作方式

- **决策写下来**：产品决策 → `product/`，技术决策 → `engineering/adr/`，公司决策 → `company/`。
- **儿童安全第一**：任何改动都要满足 [`company/policies/child-safety.md`](company/policies/child-safety.md)。
- **AI Agent 协作**：Claude Code 等 Agent 的工作规则见 [`CLAUDE.md`](CLAUDE.md)。
- **文档语言**：文档用中文（专有名词保留英文）；代码、注释、提交信息用英文；孩子看到的界面是英文。
