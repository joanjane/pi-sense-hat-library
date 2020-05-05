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

      this.joystick.on('press', this.handlePress());
      this.joystick.on('hold', this.handleHold());
      this.joystick.on('release', this.handleRelease());
    })
  }
  
  handlePress = (direction) => {
    this.onPressListeners.forEach(listener => listener(direction));
  };
  
  handleHold = (direction) => {
    this.onHoldListeners.forEach(listener => listener(direction));
  };

  handleRelease = (direction) => {
    this.onReleaseListeners.forEach(listener => listener(direction));
  };

  close() {
    if (this.joystick) {
      this.joystick.off('press', this.handlePress);
      this.joystick.off('hold', this.handleHold);
      this.joystick.off('release', this.handleRelease);
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