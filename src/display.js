import senseHatLed from 'sense-hat-led';
import { formatColor, DisplayMessageScroller } from './display-utils';

export class Display {
  constructor(enableLogging) {
    this.senseHatLeds = null;
    this.enableLogging = enableLogging || false;
    this.displaySize = { x: 8, y: 8 };
    this.onMessageCancelListeners = [];
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

  showMessage(message, speed, color, background) {
    if (this.enableLogging) {
      console.log(`Displaying message '${message}'`);
    }

    this.cancelCurrentMessage();
    const promise =  new Promise((resolve, reject) => {
      this.onMessageCancelListeners.push((reject));
      const messageScroller = new DisplayMessageScroller(message, color, background);
      scrollMessage(messageScroller, this.senseHatLeds, speed, 
        () => {
          resolve();
          this.onMessageCancelListeners = [];
        }, 
        (cancelListener) => this.onMessageCancelListeners.push(cancelListener));
    });

    return promise;
  }

  cancelCurrentMessage() {
    if (this.onMessageCancelListeners.length > 0) {
      this.onMessageCancelListeners.forEach(l => l());
      this.onMessageCancelListeners = [];
    }
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
    if (pixels.length != this.displaySize.x * this.displaySize.y) {
      throw new Error('pixels must contain 64 elements');
    }
    const renderPixels = pixels.map(color => formatColor(color));
    if (this.enableLogging) {
      console.log(`Displaying pixels`, renderPixels);
    }
    this.senseHatLeds.sync.setPixels(renderPixels);
  }
}

function scrollMessage(messageScroller, senseHatLeds, speed, resolve, onCancel) {
  const next = messageScroller.next();
  if (next.done) {
    resolve();
    return;
  }

  senseHatLeds.sync.setPixels(next.value);
  timeout = setTimeout(() => {
    scrollMessage(messageScroller, senseHatLeds, speed, resolve, onCancel);
  }, 1000 * speed);

  onCancel && onCancel(() => {
    clearTimeout(timeout);
  });
}