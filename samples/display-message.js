const {
  createDisplay,
} = require('./src');

const display = createDisplay();

display.connect(() => {
  display.showMessage(process.argv[2], .2, '#aa55dd', () => process.exit(0));
});