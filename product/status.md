# 项目状态 Status

> 每次工作结束时更新（见 `AGENTS.md`）。最新在上。

**更新**：2026-10-28 · **线上**：https://terryxu0321.github.io/ethan-learning-game/ （`main` 分支自动发布）

## 当前定位
家庭自用：一个孩子（Ethan，5 岁，2027 年入读 NSW 公立小学 Kindergarten），以后可能开放给其他家庭。
App 要根据 Ethan 的练习结果自动分析、生成报告，并针对性调整练习。

## 已完成
- 25 个游戏：English 9、Math 9、Kindy Ready 4、中文 3（认汉字，普通话语音）；每个游戏都有家长教学指南（`apps/web/js/guide.js`）。
- 字母音：家长录音，存在设备本地，未录的字母用合成语音代替。
- 学习者模型（`learner.js`）：记录每个字母、数字、题目的对错；Leitner 间隔复习；出题时偏向常错和到期的题目（实测常错项出现频率约为随机的 3 倍）。
- 家长页：学习报告（本周天数、分钟数、正确率趋势、每日用时、字母名 / 字母音 / 数字掌握地图、常错内容、自动建议）、需要加强、入学准备清单（29 项 × 最低 / 典型 / 最高）、字母音录音、手动设置等级、导出 / 导入进度。
- 游戏设计审查（`product/game-design-review.md`）：押韵改为纯听力的低门槛版本，First Letter 加声音提示，描红先练小写，Sight Words 标为进阶。
- 文档：PRD-001 v1.2、5 份研究、教学大纲、家长指南、入学清单（后两者由 `npm run docs` 生成）。
- 质量：36 项端到端冒烟测试，CI 在每个 PR 上运行。

## 下一步（按优先级）
1. **多设备同步**（ADR-0003，Firebase，已采纳）：创始人已创建项目 `ethan-learning-game`。⏳ 等他完成网页 App 注册、Google 登录、Firestore（Sydney 区域）并提供 `firebaseConfig`，然后实现 `apps/web/js/sync.js` 并更新隐私政策。
2. **拍音节**游戏（语音意识，最低→典型档）。
3. **Quick Look 速视**（PRD F-25）。
4. **健康时长守护**（PRD F-27）：每次约 15 分钟提醒休息。
5. **中文**扩充：词语和短句认读（C3）、中文儿歌 / 家长录制中文故事（C4）。
6. Sound Blender 口头拼读（Letter Sounds 到 2 级后开放）。

## 待决问题
- Q1 学校使用的 phonics 教材（开学后向老师确认）。
- Q8 是否允许研究环境访问 NSW 教育部 / NESA 官网以核对原文。
- 同步方案选择（见下一步第 1 项）。

## 怎么验证
`npm install && npx playwright install chromium && npm test`；改了 `guide.js` 或 `readiness.js` 后运行 `npm run docs`。
