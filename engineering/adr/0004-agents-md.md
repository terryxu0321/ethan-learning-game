# 0004 用 AGENTS.md 作为所有 AI Agent 的统一规则
- 状态：已采纳
- 日期：2026-10-28

## 背景
创始人未来可能在 Codex、Claude Code 等不同模型 / 工具之间切换，需要它们读到同一套规则，并能互相接力开发。

## 决定
- `AGENTS.md`（Codex 等工具默认读取）是唯一的规则文件。
- `CLAUDE.md` 只用 `@AGENTS.md` 引用它，不写任何独立规则。
- 每次工作结束更新 `product/status.md`（已完成 / 下一步 / 待决问题），让下一个 Agent 能直接接着做。
- 构建和测试只依赖 Node + Playwright，不依赖任何 Agent 专用功能。

## 后果
规则只需维护一份；任何 Agent 都能从 `AGENTS.md` → `product/status.md` → PRD 快速了解项目状态。
