const { EnvironmentSensors } = require('../cjs/environment');

console.log(`Checking environment sensors.`);

const joystick = new EnvironmentSensors();
joystick.connect();
joystick.getSensorsStatus().then(status => {
  console.log(status);
  process.exit(0);
});