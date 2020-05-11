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
  createDisplay,
} = require('./src');

const display = createDisplay();

display.connect(() => {
  display.setPixels(screen);
});