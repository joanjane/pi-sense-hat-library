"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Display = void 0;

var _senseHatLed = _interopRequireDefault(require("sense-hat-led"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Display =
/*#__PURE__*/
function () {
  function Display(enableLogging) {
    _classCallCheck(this, Display);

    this.senseHatLeds = null;
    this.enableLogging = enableLogging || false;
    this.displaySize = {
      x: 8,
      y: 8
    };
  }

  _createClass(Display, [{
    key: "connect",
    value: function connect(onOpen) {
      this.senseHatLeds = _senseHatLed["default"];
      onOpen();
    }
  }, {
    key: "close",
    value: function close() {
      this.senseHatLeds = null;
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.enableLogging) {
        console.log("Cleared display");
      }

      this.senseHatLeds.sync.clear();
    }
  }, {
    key: "showMessage",
    value: function showMessage(message, speed, color, done) {
      var renderColor = this.formatColor(color);

      if (this.enableLogging) {
        console.log("Displaying message '".concat(message, "' in color ").concat(renderColor));
      }

      this.senseHatLeds.showMessage(message, speed, renderColor, [0, 0, 0], done);
    }
  }, {
    key: "setPixel",
    value: function setPixel(x, y, color) {
      var renderColor = this.formatColor(color);

      if (this.enableLogging) {
        console.log("Displaying pixel '".concat(x, "/").concat(y, "' in color ").concat(renderColor));
      }

      this.senseHatLeds.sync.setPixel(x, y, renderColor);
    }
  }, {
    key: "setPixel",
    value: function setPixel(x, y, color) {
      var renderColor = this.formatColor(color);

      if (this.enableLogging) {
        console.log("Displaying pixel '".concat(x, "/").concat(y, "' in color ").concat(renderColor));
      }

      if (typeof x === 'number' && typeof y === 'number') {
        this.senseHatLeds.sync.setPixel(x, y, renderColor);
        return;
      }

      var yMin = y === '*' ? 0 : y;
      var yMax = y === '*' ? this.displaySize.y - 1 : y;
      var xMin = x === '*' ? 0 : x;
      var xMax = x === '*' ? this.displaySize.x - 1 : x;
      var renderPixels = this.senseHatLeds.sync.getPixels();

      for (var yIndex = yMin; yIndex <= yMax; yIndex++) {
        for (var xIndex = xMin; xIndex <= xMax; xIndex++) {
          renderPixels[yIndex * this.displaySize.x + xIndex] = renderColor;
        }
      }

      this.setPixels(renderPixels);
    }
  }, {
    key: "setPixels",
    value: function setPixels(pixels) {
      var _this = this;

      if (pixels.length != 64) {
        throw new Error('pixels must contain 64 elements');
      }

      var renderPixels = pixels.map(function (color) {
        return _this.formatColor(color);
      });

      if (this.enableLogging) {
        console.log("Displaying pixels", renderPixels);
      }

      this.senseHatLeds.sync.setPixels(renderPixels);
    }
  }, {
    key: "formatColor",
    value: function formatColor(color) {
      if (!Array.isArray(color) && typeof color !== 'string') {
        throw new Error("Color is not valid ".concat(color));
      }

      return typeof color === 'string' ? hexToRgb(color) : color;
    }
  }]);

  return Display;
}();

exports.Display = Display;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result || result.length !== 4) {
    throw new Error("'".concat(hex, "' is not a valid color"));
  }

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}