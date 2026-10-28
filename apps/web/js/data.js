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
  I: { word: 'iguana', e: '🦎' },
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
// Letter sounds (phonemes) for synthetic phonics.
//   tts: what the device voice says when there is no recording — only an approximation;
//        a parent recording (Parents → Letter sounds) is much better.
//   tip: how a grown-up should say the pure sound when recording (shown in the parent area).
const PHONEMES = {
  A: { tts: 'ah', ipa: '/æ/', tip: 'apple 开头的短音 /æ/，嘴张大，短促' },
  B: { tts: 'buh', ipa: '/b/', tip: '双唇轻弹一下，短而轻，尽量不带 "uh"' },
  C: { tts: 'kuh', ipa: '/k/', tip: 'cat 开头的 /k/，喉咙后部轻轻一弹，不带 "uh"' },
  D: { tts: 'duh', ipa: '/d/', tip: '舌尖轻弹上牙龈，短促' },
  E: { tts: 'eh', ipa: '/e/', tip: 'egg 开头的短音 /e/' },
  F: { tts: 'fff', ipa: '/f/', tip: '上牙轻咬下唇吹气 fff，可以拉长' },
  G: { tts: 'guh', ipa: '/g/', tip: 'goat 开头的 /g/，短促，不带 "uh"' },
  H: { tts: 'huh', ipa: '/h/', tip: '像哈气 h，只有气流声' },
  I: { tts: 'ih', ipa: '/ɪ/', tip: 'iguana / insect 开头的短音 /ɪ/' },
  J: { tts: 'juh', ipa: '/dʒ/', tip: 'jam 开头的 /dʒ/，短促' },
  K: { tts: 'kuh', ipa: '/k/', tip: '与 c 同音 /k/' },
  L: { tts: 'lll', ipa: '/l/', tip: '舌尖顶上牙龈 lll，可以拉长' },
  M: { tts: 'mmm', ipa: '/m/', tip: '闭嘴哼 mmm，可以拉长' },
  N: { tts: 'nnn', ipa: '/n/', tip: '舌尖顶上牙龈哼 nnn，可以拉长' },
  O: { tts: 'aw', ipa: '/ɒ/', tip: 'octopus / hot 里的短音 /ɒ/（澳洲口音）' },
  P: { tts: 'puh', ipa: '/p/', tip: '双唇轻轻爆破送气，不出声带音' },
  Q: { tts: 'kwuh', ipa: '/kw/', tip: 'qu 读 /kw/，如 queen' },
  R: { tts: 'rrr', ipa: '/r/', tip: 'rrr 像小狗低吼，不要读成 "er"' },
  S: { tts: 'sss', ipa: '/s/', tip: '像蛇一样 sss，可以拉长，不要说 "suh"' },
  T: { tts: 'tuh', ipa: '/t/', tip: '舌尖轻弹，只有气流，不出声带音' },
  U: { tts: 'uh', ipa: '/ʌ/', tip: 'umbrella / up 开头的短音' },
  V: { tts: 'vvv', ipa: '/v/', tip: '上牙轻咬下唇震动 vvv' },
  W: { tts: 'wuh', ipa: '/w/', tip: '嘴唇收圆再张开，短促' },
  X: { tts: 'ks', ipa: '/ks/', tip: 'x 读 /ks/，如 fox 的结尾' },
  Y: { tts: 'yuh', ipa: '/j/', tip: 'yo-yo 开头的 /j/，短促' },
  Z: { tts: 'zzz', ipa: '/z/', tip: '像蜜蜂 zzz，可以拉长' },
};

// Typical synthetic-phonics teaching order (common practice, not an official NSW sequence —
// adjust once the school's phonics program is known).
const PHONICS_GROUPS = [
  ['S', 'A', 'T', 'P', 'I', 'N'],
  ['M', 'D', 'G', 'O', 'C', 'K'],
  ['E', 'U', 'R', 'H', 'B', 'F', 'L'],
  ['J', 'V', 'W', 'X', 'Y', 'Z', 'Q'],
];

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

/* ---------- Kindy Ready ---------- */

// School-day routines, in order. Levels use the first 3, 4 or 5 steps.
const ROUTINES = [
  { name: 'getting ready for school', steps: [
    { e: '🛏️', t: 'Wake up' }, { e: '🥣', t: 'Eat breakfast' }, { e: '👕', t: 'Put on your uniform' },
    { e: '👟', t: 'Put on your shoes' }, { e: '🎒', t: 'Grab your school bag' }] },
  { name: 'going to the toilet', steps: [
    { e: '🚽', t: 'Use the toilet' }, { e: '💦', t: 'Flush' }, { e: '🧼', t: 'Wash your hands with soap' },
    { e: '🙌', t: 'Dry your hands' }, { e: '🏫', t: 'Go back to class' }] },
  { name: 'arriving at school', steps: [
    { e: '👋', t: 'Say goodbye to Mum or Dad' }, { e: '🎒', t: 'Hang up your bag' }, { e: '💧', t: 'Put your water bottle away' },
    { e: '🧘', t: 'Sit on the mat' }, { e: '👂', t: 'Listen to the teacher' }] },
  { name: 'lunch time', steps: [
    { e: '🧼', t: 'Wash your hands' }, { e: '🍱', t: 'Open your lunchbox' }, { e: '🥪', t: 'Eat your lunch' },
    { e: '🗑️', t: 'Put rubbish in the bin' }, { e: '🛝', t: 'Go and play' }] },
  { name: 'home time', steps: [
    { e: '🔔', t: 'The bell rings' }, { e: '🎒', t: 'Pack your bag' }, { e: '🧢', t: 'Put on your hat' },
    { e: '🚶', t: 'Line up with your class' }, { e: '🤗', t: 'Find Mum or Dad' }] },
];

// "What do you do at school?" — one good choice and two silly or unhelpful ones.
const SCHOOL_SITUATIONS = [
  { e: '☀️', q: "It's sunny and time to play outside. What do you put on?",
    ok: { e: '🧢', t: 'My school hat' }, no: [{ e: '🧣', t: 'A winter scarf' }, { e: '🥽', t: 'Swimming goggles' }] },
  { e: '🔔', q: 'The bell rings after play. What do you do?',
    ok: { e: '🚶', t: 'Line up' }, no: [{ e: '🛝', t: 'Keep playing' }, { e: '😴', t: 'Lie down' }] },
  { e: '🍽️', q: 'Your hands are dirty and it is time to eat. What do you do?',
    ok: { e: '🧼', t: 'Wash my hands' }, no: [{ e: '👕', t: 'Wipe them on my shirt' }, { e: '👅', t: 'Lick them' }] },
  { e: '🥤', q: 'You finished your yoghurt. Where does the empty cup go?',
    ok: { e: '🗑️', t: 'In the bin' }, no: [{ e: '🌳', t: 'On the grass' }, { e: '🪑', t: 'Under my chair' }] },
  { e: '📖', q: 'The teacher is reading a story. What do you do?',
    ok: { e: '👂', t: 'Sit and listen' }, no: [{ e: '🤸', t: 'Do cartwheels' }, { e: '🗣️', t: 'Talk to my friend' }] },
  { e: '🙋', q: 'You want to say something on the mat. What do you do?',
    ok: { e: '✋', t: 'Put up my hand' }, no: [{ e: '📢', t: 'Shout it out' }, { e: '🙉', t: 'Cover my ears' }] },
  { e: '🥕', q: "It's crunch and sip time. What do you eat?",
    ok: { e: '🍎', t: 'Fruit or vegetables' }, no: [{ e: '🍭', t: 'Lollies' }, { e: '🍟', t: 'Hot chips' }] },
  { e: '🚽', q: 'You need the toilet during class. What do you do?',
    ok: { e: '✋', t: 'Ask the teacher' }, no: [{ e: '🏃', t: 'Run out without asking' }, { e: '🤐', t: 'Hold on all day' }] },
  { e: '🍱', q: "You can't open your lunchbox. What can you do?",
    ok: { e: '🙋', t: 'Say, can you help me please?' }, no: [{ e: '😭', t: 'Throw it on the ground' }, { e: '🙈', t: 'Hide it and not eat' }] },
  { e: '🤕', q: 'Your friend falls over and hurts their knee. What can you do?',
    ok: { e: '🤝', t: 'Help and get a teacher' }, no: [{ e: '😂', t: 'Laugh at them' }, { e: '🏃', t: 'Run away' }] },
  { e: '🛝', q: 'Someone is on the swing you want. What do you do?',
    ok: { e: '⏳', t: 'Wait for my turn' }, no: [{ e: '👊', t: 'Push them off' }, { e: '😠', t: 'Shout at them' }] },
  { e: '🎒', q: 'You get to your classroom. Where does your bag go?',
    ok: { e: '🪝', t: 'On my bag hook' }, no: [{ e: '🚪', t: 'In the doorway' }, { e: '🌧️', t: 'Outside in the rain' }] },
  { e: '🗺️', q: "You can't find your classroom. Who can you ask?",
    ok: { e: '🧑‍🏫', t: 'A teacher' }, no: [{ e: '🐕', t: 'A dog' }, { e: '🌳', t: 'A tree' }] },
  { e: '🥵', q: 'You feel very thirsty in class. What do you do?',
    ok: { e: '💧', t: 'Drink from my water bottle' }, no: [{ e: '🚰', t: "Drink my friend's bottle" }, { e: '🙊', t: 'Say nothing all day' }] },
];

const FEELINGS = {
  happy: '😀', sad: '😢', angry: '😠', scared: '😨', surprised: '😲', tired: '😴', worried: '😟',
};

// Stories with a clear feeling; `no` lists feelings that clearly don't fit (used as the other choices).
const FEELING_STORIES = [
  { s: 'You get a new puppy!', f: 'happy', no: ['sad', 'angry', 'tired'] },
  { s: 'Your ice cream falls on the ground.', f: 'sad', no: ['happy', 'surprised', 'tired'] },
  { s: 'Someone knocks down your tower on purpose.', f: 'angry', no: ['happy', 'tired', 'surprised'] },
  { s: 'There is a big storm with very loud thunder.', f: 'scared', no: ['happy', 'angry', 'tired'] },
  { s: 'A toy pops out of a box. Boing!', f: 'surprised', no: ['sad', 'tired', 'angry'] },
  { s: 'You played all day and your eyes are closing.', f: 'tired', no: ['angry', 'surprised', 'scared'] },
  { s: 'You lose your teddy at the park.', f: 'sad', no: ['happy', 'surprised', 'tired'] },
  { s: 'You finally finish a big puzzle!', f: 'happy', no: ['sad', 'scared', 'tired'] },
];

const CALM_IDEAS = [
  { e: '🌬️', t: 'Take three big breaths' }, { e: '🧸', t: 'Hug my teddy' }, { e: '🗣️', t: 'Tell a grown-up' },
  { e: '🔢', t: 'Count slowly to ten' }, { e: '💧', t: 'Have a drink of water' },
];
const NOT_CALM = [
  { e: '👊', t: 'Hit someone' }, { e: '🧱', t: 'Throw the blocks' }, { e: '😱', t: 'Scream very loudly' }, { e: '🦶', t: 'Kick the door' },
];

const DINO_TARGETS = [
  { e: '⭐', n: 'star' }, { e: '🍎', n: 'apple' }, { e: '🚗', n: 'car' }, { e: '🐶', n: 'dog' }, { e: '⚽', n: 'ball' }, { e: '🌙', n: 'moon' },
];
