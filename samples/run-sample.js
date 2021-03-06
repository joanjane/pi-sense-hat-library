switch (process.env.SAMPLE_MODE) {
  case 'display':
    require('./run-display-sequence');
    break;
  case 'joystick':
    require('./run-joystick-listener');
    break;
  case 'sensors':
    require('./run-environment');
    break;
  case 'motion':
    require('./run-motion');
    break;
  default:
    console.log('Valid "SAMPLE_MODE" environment variable is required to run sample.');
    break;
}