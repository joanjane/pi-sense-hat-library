const { Display } = require('../cjs/display');

const display = new Display(nodeWebSocketFactory, env.SERVER_URI, env.TARGET);

const sequence = [
  () => { display.setPixel(2, 6, '#aa55dd') },
  () => { display.setPixel('*', '*', '#2255dd') },
  () => { display.clear() },
  () => { display.setPixel('*', 4, '#bb44ee') },
  () => { display.setPixel(3, '*', '#ff00ff') },
  () => { display.showMessage(`This is a test message ${Date.now()}`, 0, '#bbaa00', () => { console.log('Finished'), process.exit(0) }) }
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
