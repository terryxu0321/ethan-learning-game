# tests/

- `e2e/smoke.mjs`：打开网站 → 检查跳转 → 每个游戏每个等级自动玩一遍 → 描红 / 拼名字 → 贴纸册 / 家长页；任何 JS 报错都会失败。
- `e2e/serve.mjs`：无依赖的静态服务器（`npm start` 也用它）。

运行：`npm install && npx playwright install chromium && npm test`
