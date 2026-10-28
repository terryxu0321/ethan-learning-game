# curriculum/ — 教学内容体系

- [`scope-and-sequence.md`](scope-and-sequence.md)：技能清单 → 对应游戏 → 等级 → 现状，对齐澳洲课程 v9 Foundation 与 EYLF v2.0。
- 规则：**每个游戏都必须对应至少一个技能行**；新增技能先在这里登记，再写游戏。
- 内容数据目前在 `apps/web/js/data.js`；当内容量变大时，迁移为 `curriculum/content/*.json`，由游戏读取（见 PRD-001 §9）。
