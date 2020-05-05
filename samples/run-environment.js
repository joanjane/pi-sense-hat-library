const { EnvironmentSensors } = require('../cjs/environment');

console.log(`Checking environment sensors.`);

const envSensors = new EnvironmentSensors();
envSensors.connect();
envSensors.getSensorsStatus().then(status => {
  console.log(status);
  process.exit(0);
});