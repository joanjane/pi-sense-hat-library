const X = [255, 100, 100];
const _ = [0, 0, 0];

const screen = [
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, _, _, _, _, _, _,
  _, _, X, X, X, _, _, _,
  _, _, _, _, _, X, _, _,
  _, _, X, X, X, X, _, _,
  _, X, _, _, _, X, _, _,
  _, _, X, X, X, X, _, _,
];

const {
  Display,
} = require('../cjs/display');

const display = new Display(true);

display.connect(() => {
  display.setPixels(screen);
});
