# 0002 把仓库升级为 "Company OS" 单仓库
- 状态：已采纳
- 日期：2026-10-28

## 背景
项目从"给 Ethan 的小游戏"走向产品化，需要同时管理产品文档、教学大纲、AI 研发、研究资料和公司运营；团队主要是创始人 + AI Agent，需要一个人和 Agent 都能读写的单一信息源。

## 决定
- 一个仓库承载全部：`apps/`（代码）、`product/`、`curriculum/`、`design/`、`ai/`、`research/`、`engineering/`、`company/`、`tests/`。
- 游戏从根目录移到 `apps/web/`；根目录 `index.html` 跳转，保持公开网址和 iPad 主屏幕图标可用。
- 根目录加 `.nojekyll`，让 GitHub Pages 原样发布文件，不经过 Jekyll 处理（避免 Markdown 中的模板语法导致构建失败）。
- `CLAUDE.md` 规定 Agent 的工作规则；CI 在每个 PR 上运行端到端冒烟测试。

## 后果
- 好：上下文集中，Agent 能直接读到 PRD、政策和课程；决策可追溯。
- 代价：GitHub Pages 会公开整个仓库的文件（仓库本身已公开，可接受）；如将来有敏感运营文档（财务、合同），应放到私有仓库或私有存储，而不是这里。
