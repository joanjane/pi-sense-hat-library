const senseHatLed = require('sense-hat-led');

class Display {
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
        this.senseHatLeds.setPixel(x, y, color);
    }
    
    render() {
        this.senseHatLeds.setPixel(x, y, color);
    }
}