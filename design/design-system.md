# 设计规范 Design System

> 代码中的唯一来源：`apps/web/css/style.css` 的 `:root` 变量。

## 颜色
| Token | 色值 | 用途 |
|---|---|---|
| `--pink` / `--pink-d` | #ff8fb1 / #e66a92 | English 主色 |
| `--blue` / `--blue-d` | #5bb8ff / #3593e0 | Math 主色 |
| `--yellow` | #ffd34d | 星星、语音按钮 |
| `--green` | #5fd38a | 正确、主要按钮 |
| `--purple` `--orange` `--teal` `--red` | — | 选项轮换色 |
| `--ink` | #36325a | 文字 |
每种颜色都有 `-d` 深色版本，用于 3D 按钮阴影。

## 字体
Fredoka（Google Fonts），圆润易读；后备字体 Arial Rounded / Chalkboard。v0.2 计划自托管字体，去掉唯一的外部请求。

## 儿童 UX 规则（依据 `research/02-best-practices/`）
1. **语音优先**：所有指令自动朗读，🔊 随时重听；不依赖阅读。
2. **大目标**：可点击区域 ≥ 60px，答案按钮 ≥ 92px（窄屏）/ 120px；避免拖拽和精细手势。
3. **2–4 个选项**，不超过 4 个。
4. **反馈**：答对 = 音效 + 彩带 + 具体表扬；答错 = 轻微抖动 + 温柔提示，不扣分。
5. **零 dark pattern**：无倒计时压力、无"明天回来领奖"、无角色失望诱导、无广告。
6. **减少动态效果**：遵守 `prefers-reduced-motion`。
7. **会话**：每局 3–10 题（家长可设），每局有自然结束点。
