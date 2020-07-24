const {
  Display
} = require('./cjs/display');

const display = new Display(true);

display.connect(() => {
  display.showMessage(process.argv[2], .2, '#aa55dd', '#000000')
    .then(() => process.exit(0));
});
