const { MotionSensors } = require('../cjs/motion');

console.log(`Checking motion sensors.`);

const motionSensors = new MotionSensors();
motionSensors.connect();
motionSensors.getMotionStatus().then(status => {
  console.log(status);
  process.exit(0);
});