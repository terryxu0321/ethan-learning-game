# 部署 Runbook

## 发布
1. 合并到 `main`（CI 绿色）。
2. GitHub Pages 自动运行 "pages build and deployment"，1–2 分钟后生效：
   https://terryxu0321.github.io/ethan-learning-game/
3. 在 iPad 上打开验证；若看到旧版本，Safari 下拉刷新。

## 回滚
`git revert <坏提交>` 后推送到 `main`。不要强推 `main`。

## 注意
- 根目录 `index.html` 负责跳转到 `apps/web/`，不要删除。
- 孩子的进度保存在浏览器本地，与网址的域名绑定（`terryxu0321.github.io`）；**更换域名会让进度"消失"**（数据还在旧域名下）。迁移前需先做导出 / 导入功能。
