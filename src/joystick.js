import { getJoystick } from 'sense-joystick';

export class Joystick {
  constructor() {
    this.onPressListeners = [];
    this.onHoldListeners = [];
    this.onReleaseListeners = [];

    this.handlePress = (direction) =>
      this.onPressListeners.forEach(listener => listener(direction));

    this.handleHold = (direction) =>
      this.onHoldListeners.forEach(listener => listener(direction));

    this.handleRelease = (direction) =>
      this.onReleaseListeners.forEach(listener => listener(direction));
  }

  connect(onOpen) {
    getJoystick().then(joystick => {
      this.joystick = joystick;
      onOpen && onOpen();

      this.joystick.on('press', this.handlePress());
      this.joystick.on('hold', this.handleHold());
      this.joystick.on('release', this.handleRelease());
    })
  }

  close() {
    if (this.joystick) {
      this.onPressListeners = [];
      this.onHoldListeners = [];
      this.onReleaseListeners = [];
      this.joystick = null;
    }
  }

  on(event, callback) {
    switch (event) {
      case 'press':
        this.onPressListeners.push(callback);
        break;
      case 'hold':
        this.onHoldListeners.push(callback);
        break;
      case 'release':
        this.onReleaseListeners.push(callback);
        break;
      default:
        throw new Error(`${event} event is not valid. Try with press, hold and release.`);
    }
  }
}