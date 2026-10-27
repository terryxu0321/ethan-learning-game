# 🦖 Ethan's Learning Land

给 5 岁小朋友玩的 **英文 + 数学** 互动学习小游戏，帮助明年上 Kindy 做准备。
A cute, voice-guided learning game for a 5-year-old getting ready for kindy — English and Math.

## 怎么打开 How to play

不需要安装任何东西，纯网页（HTML/CSS/JS）：

- **最简单**：直接双击 `index.html` 用浏览器打开（推荐 Safari / Chrome）。
- **iPad / 手机**：开启 GitHub Pages（仓库 Settings → Pages → Branch 选 `main` / root），
  用 Safari 打开网址后点「分享 → 添加到主屏幕」，就像一个 App。
- 本地服务器：`python3 -m http.server 8000` 然后打开 http://localhost:8000

> 孩子还不识字也能玩：每道题都会**自动朗读**，右下角 🔊 可以再听一遍。
> 默认优先使用澳洲英语发音，可在家长页面更换。

## 游戏内容 Games

| 🔤 English 英文 | 🔢 Math 数学 |
|---|---|
| **ABC Explorer** 字母探索（自由玩）| **Number Explorer** 数字探索 0–20（自由玩）|
| **Find the Letter** 听音找字母 | **Count It!** 点数 1–20（可以点着数）|
| **Big & Little** 大小写配对 | **Find the Number** 认识数字 |
| **First Letter** 首字母 / 自然拼读 | **What's Next?** 数序（前后）|
| **Rhyme Time** 押韵 | **More or Less** 比较多少 |
| **Sight Words** 高频词 | **Add & Take Away** 10 以内加减 |
| **Trace Letters** 手指描红 | **Shapes** 形状 + 颜色 |
| **Spell My Name** 拼自己的名字 | **Patterns** 找规律 |

## 设计要点 Features

- 🗣️ 全程语音引导（Web Speech API），答对有音效、彩带和夸奖，答错温柔地“再试一次”。
- ⭐ 每个游戏 3 个难度等级，**根据表现自动升级/降级**（一次答对 ≥80% 升级，<40% 降级）。
- 🎁 每完成一个游戏开一个礼物，收集 40 张贴纸（点击贴纸还会读出英文单词）。
- 👨‍👩‍👦 家长页面（需要做一道乘法题才能进入）：学习进度、最近 7 天、每个游戏的等级与正确率、
  设置孩子名字、题量、语音/语速/口音、Kindy 准备清单与陪玩建议。
- 💾 进度保存在浏览器本地（localStorage），不联网、不收集任何数据。

## 代码结构 Code

```
index.html        页面入口
css/style.css     可爱风格样式（大按钮、圆角、动画）
js/store.js       本地进度存储
js/audio.js       音效（Web Audio 合成）+ 语音朗读
js/data.js        字母、单词、押韵、贴纸等词库
js/games.js       16 个小游戏的出题逻辑
js/app.js         页面切换、游戏引擎、奖励、贴纸册、家长页
```

想加新题目：在 `js/data.js` 里加单词；想加新游戏：在 `js/games.js` 的 `ENGLISH_GAMES` / `MATH_GAMES`
里加一个带 `question(level)` 的对象即可。
