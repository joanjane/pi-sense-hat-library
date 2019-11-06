const { Joystick } = require('../cjs/joystick');

console.log(`Running joystick listener.`);

const joystick = new Joystick();
joystick.connect();
joystick.on('press', (direction) => {
  console.log('Received press: ', direction);
});

joystick.on('hold', (direction) => {
  console.log('Received hold: ', direction);
});

joystick.on('release', (direction) => {
  console.log('Received release: ', direction);
});