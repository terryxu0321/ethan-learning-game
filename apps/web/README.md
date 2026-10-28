# apps/web — Ethan's Learning Land（网页版）

纯静态网页（HTML/CSS/JS），没有构建步骤，由 GitHub Pages 从 `main` 分支直接发布。
根目录的 `index.html` 会自动跳转到这里，所以原来的网址和 iPad 主屏幕图标都继续可用。

| 文件 | 作用 |
|---|---|
| `index.html` | 页面入口 |
| `css/style.css` | 样式与动画（颜色变量在 `:root`） |
| `js/store.js` | 本地进度存储（localStorage，key: `ethan-learning-game-v1`） |
| `js/audio.js` | 音效（Web Audio 合成）+ 语音朗读（Web Speech API，优先澳洲口音） |
| `js/data.js` | 字母、单词、押韵、贴纸等内容库 |
| `js/games.js` | 16 个小游戏的出题逻辑 |
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

然后在 `curriculum/scope-and-sequence.md` 里登记它对应的学习目标，并运行 `npm test`。
