pi-sense-hat-library
===============================

A node library that wraps node sense hat sensors into an unified API. Build node SenseHat apps easily taking advantage of the alter ego library for simulating sensehat for easier development [pi-sense-hat-remote-simulator](https://github.com/joanjane/pi-sense-hat-remote-simulator).

## Dependencies:
- sense-hat-led: 1.0.1
- sense-joystick: 0.0.3
- nodeimu: 2.1.12

*(this dependecies also require to have installed this packaged and only working under linux: `python make g++ linux-headers`)*

## Usage
Check out [samples section](#samples)

The client library is built with ESM modules and is also distributed as "classic" CommonJS modules for compatibility.
There are 4 modules available:

* Display (led matrix, messaging display)
* Joystick (joystick)
* EnvironmentSensors (temperature, humidity, pressure)
* MotionSensors (acceleromenter, gyroscope, orientation, compass)

```js
    // setup of Display module with CommonJS
    const { Display, Joystick, EnvironmentSensors, MotionSensors } = require('pi-sense-hat-library/cjs');
    const display = new Display();
    const joystick = new Joystick();
    const environmentSensors = new EnvironmentSensors();
    const motionSensors = new MotionSensors();

    
    // setup of Display module with ESM
    import { Display, Joystick, EnvironmentSensors, MotionSensors } from 'pi-sense-hat-library';
    const display = new Display();
    const joystick = new Joystick();
    const environmentSensors = new EnvironmentSensors();
    const motionSensors = new MotionSensors();
```

## Development
For development, it is possible to use a docker image with all dependencies installed where you can develop on mounting the source files from host machine to container. Running `run-dev-shell.ps1` script will start a container with a bash shell. Then you can install packages with `npm i`.

This library is developed using ESM modules and is transpiled to CommonJS modules with `npm run build:lib` command.

    
## Samples
* [pi-sense-hat-library-sample](https://github.com/joanjane/pi-sense-hat-library-sample) Sample application that uses all features from this library
* [pi-sense-hat-weather-forecast](https://github.com/joanjane/pi-sense-hat-weather-forecast)
See a simple weather forecast application.

