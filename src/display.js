import senseHatLed from 'sense-hat-led';

export class Display {
  constructor() {
    this.senseHatLeds = null;
  }

  connect(onOpen) {
    this.senseHatLeds = senseHatLed;
    onOpen();
  }

  close() {
    this.senseHatLeds = null;
  }

  clear() {
    this.senseHatLeds.clear();
  }

  showMessage(message, speed, color, done) {
    this.senseHatLeds.showMessage(message, speed, color, done);
  }

  setPixel(x, y, color) {
    const renderColor = typeof color === 'string' ? hexToRgb(color) : color;

    this.senseHatLeds.setPixel(x, y, renderColor);
  }

  setPixels(pixels) {
    if (pixels.length != 64) {
      throw new Error('pixels must contain 64 elements');
    }
    const renderPixels = pixels.map(color => typeof color === 'string' ? hexToRgb(color) : color);
    this.senseHatLeds.setPixels(renderPixels);
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}