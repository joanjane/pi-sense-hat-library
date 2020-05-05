import senseHatLed from 'sense-hat-led';

export class Display {
  constructor(enableLogging) {
    this.senseHatLeds = null;
    this.enableLogging = enableLogging || false;
  }

  connect(onOpen) {
    this.senseHatLeds = senseHatLed;
    onOpen();
  }

  close() {
    this.senseHatLeds = null;
  }

  clear() {
    if (this.enableLogging) {
      console.log(`Cleared display`);
    }
    this.senseHatLeds.sync.clear();
  }

  showMessage(message, speed, color, done) {
    const renderColor = this.formatColor(color);
    if (this.enableLogging) {
      console.log(`Displaying message '${message}' in color ${renderColor}`);
    }
    this.senseHatLeds.showMessage(message, speed, renderColor, [0, 0, 0], done);
  }

  setPixel(x, y, color) {
    const renderColor = this.formatColor(color);
    if (this.enableLogging) {
      console.log(`Displaying pixel '${x}/${y}' in color ${renderColor}`);
    }
    this.senseHatLeds.sync.setPixel(x, y, renderColor);
  }

  setPixels(pixels) {
    if (pixels.length != 64) {
      throw new Error('pixels must contain 64 elements');
    }
    const renderPixels = pixels.map(color => this.formatColor(color));
    if (this.enableLogging) {
      console.log(`Displaying pixels`, renderPixels);
    }
    this.senseHatLeds.sync.setPixels(renderPixels);
  }

  formatColor(color) {
    if (!Array.isArray(color) || typeof color !== 'string') {
      throw new Error(`Color is not valid ${color}`);
    }
    return typeof color === 'string' ? hexToRgb(color) : color;
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || result.length !== 3) {
    throw new Error(`'${hex}' is not a valid color`);
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}