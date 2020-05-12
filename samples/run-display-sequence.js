const { Display } = require('../cjs/display');

const display = new Display(nodeWebSocketFactory, env.SERVER_URI, env.TARGET);


const sequence = [
  () => { client.setPixel(2, 6, [123, 9, 200]) },
  () => { display.setPixel('*', '*', '#2255dd') },
  () => { display.clear() },
  () => { display.setPixel('*', 4, '#bb44ee') },
  () => { display.setPixel(3, '*', '#ff00ff') },
  () => { display.setPixels(testPixels) },
  () => { display.showMessage(`This is a test message ${Date.now()}`, 0, '#bbaa00', '#000000')
    .then(() => { console.log('Finished'), process.exit(0) }) }
];

console.log('Starting...');
display.connect(() => {
  console.log('Sending sequence...');
  runSequence(sequence);
});

function runSequence(seq) {
  if (seq.length === 0) return;
  const [first, ...rest] = seq;
  first();

  setTimeout(() => {
    runSequence(rest);
  }, 5000);
}

const O = '#123fff';
const X = [123, 200, 30];
const testPixels = [
  O, O, O, O, O, O, O, O,
  O, O, X, O, X, X, O, O,
  O, O, O, O, X, O, O, O,
  O, O, O, O, O, O, O, O,
  O, X, O, O, O, O, X, O,
  O, X, O, O, O, O, X, O,
  O, O, X, X, X, X, O, O,
  O, O, O, O, O, O, O, O
];