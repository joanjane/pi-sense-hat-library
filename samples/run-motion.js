const { MotionSensors } = require('../cjs/motion');

console.log(`Checking motion sensors.`);

const joystick = new MotionSensors();
joystick.connect();
joystick.getMotionStatus().then(status => {
  console.log(status);
  process.exit(0);
});