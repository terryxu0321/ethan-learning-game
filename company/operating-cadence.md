# 运营节奏 Operating Cadence

早期团队很小（可能只有创始人 + AI Agent），节奏要轻，但要固定。

| 频率 | 做什么 | 产出放哪里 |
|---|---|---|
| 每天 | 孩子玩 10–15 分钟；家长记一条观察 | GitHub Issue（Playtest 模板） |
| 每周 | **周复盘**：看试玩记录和家长面板数据 → 选下周 1–3 件要做的事 → 发布 | `research/user-research/playtest-log.md`，Issues |
| 每月 | 内容 / 难度调整；对照 PRD 检查进度；更新路线图 | `product/prd/` |
| 每季度 | 设定 OKR；回顾使命和策略；合规检查 | `company/okrs/`，`company/compliance-tracker.md` |

## 决策规则
- **可逆的小决定**：直接做，在 PR 描述里写原因。
- **难以逆转的决定**（架构、数据收集、收费模式、引入 AI 对话）：写 ADR（`engineering/adr/`）或在 PRD 的"决策记录"里登记，再做。
- **涉及孩子数据或安全**：必须先更新 `company/policies/`。

## 和 AI Agent 协作
- 任务写成 Issue 或在对话里说明目标，Agent 按 `CLAUDE.md` 的规则工作。
- Agent 的产出（代码、文档、研究）必须通过 PR / 提交进入仓库，并通过 `npm test`。
- 研究类任务的结论写进 `research/`，并附上来源。
