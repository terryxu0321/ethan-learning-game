# apps/web — Ethan's Learning Land（网页版）

纯静态网页（HTML/CSS/JS），没有构建步骤，由 GitHub Pages 从 `main` 分支直接发布。
根目录的 `index.html` 会自动跳转到这里，所以原来的网址和 iPad 主屏幕图标都继续可用。

| 文件 | 作用 |
|---|---|
| `index.html` | 页面入口 |
| `css/style.css` | 样式与动画（颜色变量在 `:root`） |
| `js/store.js` | 本地进度存储（localStorage，key: `ethan-learning-game-v1`） |
| `js/audio.js` | 音效（Web Audio 合成）+ 语音朗读（Web Speech API，优先澳洲口音） |
| `js/data.js` | 字母、单词、字母音（PHONEMES）、phonics 分组、押韵、贴纸等内容库 |
| `js/phonics.js` | 字母音播放与家长录音（IndexedDB，只存在设备上） |
| `js/games.js` | 22 个小游戏（English、Math、Kindy Ready）的出题逻辑 |
| `js/guide.js` | 每个游戏的家长教学指南（学习目标、教法） |
| `js/readiness.js` | 入学准备清单（最低 / 典型 / 最高） |
| `js/learner.js` | 学习者模型：每个题目的对错、间隔复习、针对性出题、报告数据 |
| `js/app.js` | 页面切换、游戏引擎、奖励、贴纸册、家长页 |

## 新增一个游戏

在 `js/games.js` 的 `ENGLISH_GAMES` 或 `MATH_GAMES` 里加一个对象：

```js
{
  id: 'my-game', title: 'My Game', zh: '中文说明', emoji: '🎯', color: 'blue', maxLevel: 3,
  intro: 'Spoken once at the start.',
  question(level) {
    return { key, say, html, style: 'letter' | 'number' | 'word' | 'picture' | 'shape' | 'tray',
             choices: [{ html, value }], answer, after };
  },
}
```

然后：在 `js/guide.js` 里加教学指南 → 在 `curriculum/scope-and-sequence.md` 登记技能 → `npm run docs` → `npm test`。
