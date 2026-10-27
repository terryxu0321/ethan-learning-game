// Word lists and picture banks used by the games.

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ALPHABET = {
  A: { word: 'apple', e: '🍎' },
  B: { word: 'bear', e: '🐻' },
  C: { word: 'cat', e: '🐱' },
  D: { word: 'dog', e: '🐶' },
  E: { word: 'egg', e: '🥚' },
  F: { word: 'fish', e: '🐟' },
  G: { word: 'grapes', e: '🍇' },
  H: { word: 'hat', e: '🎩' },
  I: { word: 'ice cream', e: '🍦' },
  J: { word: 'juice', e: '🧃' },
  K: { word: 'key', e: '🔑' },
  L: { word: 'lion', e: '🦁' },
  M: { word: 'monkey', e: '🐵' },
  N: { word: 'nose', e: '👃' },
  O: { word: 'octopus', e: '🐙' },
  P: { word: 'pig', e: '🐷' },
  Q: { word: 'queen', e: '👸' },
  R: { word: 'rabbit', e: '🐰' },
  S: { word: 'sun', e: '☀️' },
  T: { word: 'tiger', e: '🐯' },
  U: { word: 'umbrella', e: '☂️' },
  V: { word: 'volcano', e: '🌋' },
  W: { word: 'whale', e: '🐳' },
  X: { word: 'fox', e: '🦊', note: 'Fox ends with X!' },
  Y: { word: 'yo-yo', e: '🪀' },
  Z: { word: 'zebra', e: '🦓' },
};

// Extra pictures for the "first letter" game so it doesn't get repetitive.
const FIRST_SOUND_WORDS = [
  ...Object.entries(ALPHABET).filter(([l]) => l !== 'X').map(([l, v]) => ({ l, word: v.word, e: v.e })),
  { l: 'B', word: 'ball', e: '⚽' },
  { l: 'B', word: 'banana', e: '🍌' },
  { l: 'C', word: 'car', e: '🚗' },
  { l: 'D', word: 'duck', e: '🦆' },
  { l: 'F', word: 'frog', e: '🐸' },
  { l: 'H', word: 'house', e: '🏠' },
  { l: 'K', word: 'kite', e: '🪁' },
  { l: 'M', word: 'moon', e: '🌙' },
  { l: 'P', word: 'pizza', e: '🍕' },
  { l: 'R', word: 'rainbow', e: '🌈' },
  { l: 'S', word: 'snake', e: '🐍' },
  { l: 'T', word: 'train', e: '🚂' },
  { l: 'W', word: 'watermelon', e: '🍉' },
];

// Common kindy "sight words" (high-frequency words), easiest first.
const SIGHT_WORDS = [
  'I', 'a', 'the', 'and', 'see', 'go', 'is', 'to', 'my', 'me', 'we', 'can',
  'like', 'up', 'it', 'in', 'at', 'look', 'you', 'he', 'she', 'no', 'yes', 'mum', 'dad', 'big', 'am', 'on',
];

const RHYMES = [
  [{ w: 'cat', e: '🐱' }, { w: 'hat', e: '🎩' }],
  [{ w: 'dog', e: '🐶' }, { w: 'frog', e: '🐸' }],
  [{ w: 'bee', e: '🐝' }, { w: 'tree', e: '🌳' }],
  [{ w: 'star', e: '⭐' }, { w: 'car', e: '🚗' }],
  [{ w: 'cake', e: '🎂' }, { w: 'snake', e: '🐍' }],
  [{ w: 'mouse', e: '🐭' }, { w: 'house', e: '🏠' }],
  [{ w: 'moon', e: '🌙' }, { w: 'spoon', e: '🥄' }],
  [{ w: 'bear', e: '🐻' }, { w: 'pear', e: '🍐' }],
  [{ w: 'goat', e: '🐐' }, { w: 'boat', e: '⛵' }],
  [{ w: 'king', e: '🤴' }, { w: 'ring', e: '💍' }],
  [{ w: 'sock', e: '🧦' }, { w: 'clock', e: '⏰' }],
  [{ w: 'fox', e: '🦊' }, { w: 'box', e: '📦' }],
  [{ w: 'bug', e: '🐛' }, { w: 'mug', e: '☕' }],
  [{ w: 'snail', e: '🐌' }, { w: 'whale', e: '🐳' }],
  [{ w: 'bed', e: '🛏️' }, { w: 'bread', e: '🍞' }],
];

const COUNT_ITEMS = [
  { e: '🍎', one: 'apple', many: 'apples' },
  { e: '🐟', one: 'fish', many: 'fish' },
  { e: '⭐', one: 'star', many: 'stars' },
  { e: '🚗', one: 'car', many: 'cars' },
  { e: '🦋', one: 'butterfly', many: 'butterflies' },
  { e: '🍓', one: 'strawberry', many: 'strawberries' },
  { e: '🐥', one: 'chick', many: 'chicks' },
  { e: '⚽', one: 'ball', many: 'balls' },
  { e: '🌸', one: 'flower', many: 'flowers' },
  { e: '🦖', one: 'dinosaur', many: 'dinosaurs' },
  { e: '🍪', one: 'cookie', many: 'cookies' },
  { e: '🎈', one: 'balloon', many: 'balloons' },
  { e: '🐞', one: 'ladybug', many: 'ladybugs' },
  { e: '🚀', one: 'rocket', many: 'rockets' },
];

const SHAPE_COLORS = [
  { name: 'red', hex: '#ff5a5f' },
  { name: 'blue', hex: '#3b9cff' },
  { name: 'yellow', hex: '#ffc93c' },
  { name: 'green', hex: '#33c47a' },
  { name: 'purple', hex: '#9b6bff' },
  { name: 'orange', hex: '#ff9233' },
];

const PATTERN_SETS = [
  ['🔴', '🔵', '🟡', '🟢'],
  ['🍎', '🍌', '🍇', '🍓'],
  ['🐶', '🐱', '🐰', '🐸'],
  ['⭐', '🌙', '☀️', '☁️'],
  ['🚗', '🚂', '✈️', '🚀'],
];

const STICKERS = [
  { e: '🦁', n: 'lion' }, { e: '🐯', n: 'tiger' }, { e: '🐻', n: 'bear' }, { e: '🐼', n: 'panda' },
  { e: '🐨', n: 'koala' }, { e: '🦘', n: 'kangaroo' }, { e: '🐸', n: 'frog' }, { e: '🐵', n: 'monkey' },
  { e: '🦊', n: 'fox' }, { e: '🐰', n: 'bunny' }, { e: '🐧', n: 'penguin' }, { e: '🦉', n: 'owl' },
  { e: '🐢', n: 'turtle' }, { e: '🐙', n: 'octopus' }, { e: '🐳', n: 'whale' }, { e: '🦈', n: 'shark' },
  { e: '🦖', n: 'T-rex' }, { e: '🦕', n: 'long-neck dinosaur' }, { e: '🐉', n: 'dragon' }, { e: '🦄', n: 'unicorn' },
  { e: '🐘', n: 'elephant' }, { e: '🦒', n: 'giraffe' }, { e: '🦓', n: 'zebra' }, { e: '🦩', n: 'flamingo' },
  { e: '🚀', n: 'rocket' }, { e: '🚒', n: 'fire truck' }, { e: '🚓', n: 'police car' }, { e: '🚜', n: 'tractor' },
  { e: '🚂', n: 'train' }, { e: '🚁', n: 'helicopter' }, { e: '⛵', n: 'sailboat' }, { e: '🏎️', n: 'race car' },
  { e: '🌈', n: 'rainbow' }, { e: '🌟', n: 'shining star' }, { e: '🌋', n: 'volcano' }, { e: '🪐', n: 'planet' },
  { e: '🍦', n: 'ice cream' }, { e: '🍩', n: 'donut' }, { e: '🍉', n: 'watermelon' }, { e: '🏆', n: 'trophy' },
];

const PRAISE = [
  'Great job!', 'Awesome!', 'You did it!', 'Super star!', 'Fantastic!',
  'Well done!', 'Brilliant!', 'Yay!', 'Woo hoo!', 'Amazing!',
];

const TRY_AGAIN = ['Oops! Try again.', 'Not quite. Try again!', 'Hmm, try another one!', 'Almost! Have another go.'];
