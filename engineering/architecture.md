# 架构 Architecture

## 现状（v0.1）
```
浏览器（iPad Safari / Chrome）
 └─ apps/web/index.html
     ├─ store.js   进度 → localStorage（设备本地）
     ├─ audio.js   Web Audio 音效 + Web Speech 朗读（设备本地）
     ├─ data.js    内容库
     ├─ games.js   16 个游戏（question(level) / round(ctx) / open(stage)）
     └─ app.js     路由、游戏引擎、奖励、家长页
托管：GitHub Pages（main 分支，根目录 index.html 跳转到 apps/web/）
外部请求：仅 Google Fonts
```
特点：零后端、零账号、零数据外传；任何静态托管都能运行；离线时（缓存后）大部分可用。

## 演进路线
| 阶段 | 变化 | 触发条件 |
|---|---|---|
| v0.2 | 内容数据从 `data.js` 拆出为 JSON；加入 phonics 录音（`apps/web/audio/`）；自托管字体 | 内容量增加 |
| v0.3 | 学习者模型（按技能 Elo + 间隔复习）独立模块 `learner.js`；Service Worker 离线缓存 / PWA | P1 功能 |
| v0.4 | 可选：多孩子档案；数据导出 / 导入（JSON 文件，不上云） | 多个试玩家庭 |
| v1.0 | 若要上架 / 跨设备同步：评估 PWA vs 原生壳（Capacitor）、云同步（需 ADR + 合规） | 商业化决策 |

## 原则
- 能在设备上做的不放到服务器。
- 保持无构建步骤，直到复杂度确实需要（届时用 ADR 记录引入 Vite 等工具的决定）。
