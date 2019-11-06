import { getJoystick } from 'sense-joystick';

export class Joystick {
  constructor() {
    this.onPressListeners = [];
    this.onHoldListeners = [];
    this.onReleaseListeners = [];
  }
  
  connect(onOpen) {
    getJoystick().then(joystick => {
      this.joystick = joystick;
      onOpen && onOpen();

      this.joystick.on('press', (direction) => {
        this.onPressListeners.forEach(listener => listener(direction));
      });

      this.joystick.on('hold', (direction) => {
        this.onHoldListeners.forEach(listener => listener(direction));
      });

      this.joystick.on('release', (direction) => {
        this.onReleaseListeners.forEach(listener => listener(direction));
      });
    })
  }

  close() {
    if (this.joystick) {
      this.onPressListeners.forEach(listener => this.joystick.off('press', listener));
      this.onHoldListeners.forEach(listener => this.joystick.off('hold', listener));
      this.onReleaseListeners.forEach(listener => this.joystick.off('release', listener));
      this.onPressListeners = [];
      this.onHoldListeners = [];
      this.onReleaseListeners = [];
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