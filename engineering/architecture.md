# 架构 Architecture

## 现状（2026-10-28）
```
浏览器（iPad Safari / Chrome / 电脑）
 └─ apps/web/index.html（普通 <script>，按顺序加载，共享全局变量）
     ├─ store.js      进度 → localStorage
     ├─ audio.js      Web Audio 音效 + Web Speech 朗读（英文 / 普通话）+ speakSteps()
     ├─ data.js       内容库（字母、单词、字母音、Kindy Ready、汉字…）
     ├─ phonics.js    字母音播放 + 家长录音（IndexedDB）
     ├─ games.js      25 个游戏（question(level) / round(ctx) / open(stage)）
     ├─ guide.js      每个游戏的家长教学指南 + PRD 编号
     ├─ readiness.js  入学准备清单
     ├─ howto.js      家长使用指南
     ├─ learner.js    学习者模型：逐项记录、间隔复习、针对性出题、报告数据
     ├─ sync.js       可选的多设备同步（Firebase Auth + Firestore，家长登录后才加载）
     └─ app.js        路由、游戏引擎、奖励、家长页（报告、清单、录音、同步、设置）
托管：GitHub Pages（main 分支，根目录 index.html 跳转到 apps/web/）
外部请求：Google Fonts；开启同步后加载 Firebase SDK 并连接 Firestore（悉尼）
文档生成：npm run docs → curriculum/ 下的家长指南、入学清单、使用指南、游戏清单
```
特点：零自建后端；默认零数据外传；任何静态托管都能运行。

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
