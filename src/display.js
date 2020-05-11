import senseHatLed from 'sense-hat-led';
import { formatColor } from './display-utils';

export class Display {
  constructor(enableLogging) {
    this.senseHatLeds = null;
    this.enableLogging = enableLogging || false;
    this.displaySize = { x: 8, y: 8 };
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
    const renderColor = formatColor(color);
    if (this.enableLogging) {
      console.log(`Displaying message '${message}' in color ${renderColor}`);
    }
    this.senseHatLeds.showMessage(message, speed, renderColor, [0, 0, 0], done);
  }

  setPixel(x, y, color) {
    const renderColor = formatColor(color);
    if (this.enableLogging) {
      console.log(`Displaying pixel '${x}/${y}' in color ${renderColor}`);
    }
    this.senseHatLeds.sync.setPixel(x, y, renderColor);
  }

  setPixel(x, y, color) {
    const renderColor = formatColor(color);
    if (this.enableLogging) {
      console.log(`Displaying pixel '${x}/${y}' in color ${renderColor}`);
    }
    
    if (typeof x === 'number' && typeof y === 'number') {
      this.senseHatLeds.sync.setPixel(x, y, renderColor);
      return;
    }

    const yMin = y === '*' ? 0 : y;
    const yMax = y === '*' ? this.displaySize.y - 1 : y;
    const xMin = x === '*' ? 0 : x;
    const xMax = x === '*' ? this.displaySize.x - 1 : x;
    
    const renderPixels = this.senseHatLeds.sync.getPixels();
    for (let yIndex = yMin; yIndex <= yMax; yIndex++) {
      for (let xIndex = xMin; xIndex <= xMax; xIndex++) {
        renderPixels[yIndex * this.displaySize.x + xIndex] = renderColor;
      }
    }

    this.setPixels(renderPixels);
  }

  setPixels(pixels) {
    if (pixels.length != 64) {
      throw new Error('pixels must contain 64 elements');
    }
    const renderPixels = pixels.map(color => formatColor(color));
    if (this.enableLogging) {
      console.log(`Displaying pixels`, renderPixels);
    }
    this.senseHatLeds.sync.setPixels(renderPixels);
  }

}