"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Display = void 0;

var _senseHatLed = _interopRequireDefault(require("sense-hat-led"));

var _displayUtils = require("./display-utils");

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
    this.onMessageCancelListeners = [];
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
    value: function showMessage(message, speed, color, background) {
      var _this = this;

      if (this.enableLogging) {
        console.log("Displaying message '".concat(message, "'"));
      }

      this.cancelCurrentMessage();
      var promise = new Promise(function (resolve, reject) {
        _this.onMessageCancelListeners.push(reject);

        var messageScroller = new _displayUtils.DisplayMessageScroller(message, color, background);
        scrollMessage(messageScroller, _this.senseHatLeds, speed, resolve, function (cancelListener) {
          return _this.onMessageCancelListeners.push(cancelListener);
        });
        var screen = messageScroller.next();

        while (!screen.done) {
          _this.senseHatLeds.sync.setPixels(screen.value);

          messageScroller.next();
        }

        _this.onMessageCancelListeners = [];
        resolve();
      });
      return promise;
    }
  }, {
    key: "cancelCurrentMessage",
    value: function cancelCurrentMessage() {
      if (this.onMessageCancelListeners.length > 0) {
        this.onMessageCancelListeners.forEach(function (l) {
          return l();
        });
        this.onMessageCancelListeners = [];
      }
    }
  }, {
    key: "setPixel",
    value: function setPixel(x, y, color) {
      var renderColor = (0, _displayUtils.formatColor)(color);

      if (this.enableLogging) {
        console.log("Displaying pixel '".concat(x, "/").concat(y, "' in color ").concat(renderColor));
      }

      this.senseHatLeds.sync.setPixel(x, y, renderColor);
    }
  }, {
    key: "setPixel",
    value: function setPixel(x, y, color) {
      var renderColor = (0, _displayUtils.formatColor)(color);

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
      if (pixels.length != this.displaySize.x * this.displaySize.y) {
        throw new Error('pixels must contain 64 elements');
      }

      var renderPixels = pixels.map(function (color) {
        return (0, _displayUtils.formatColor)(color);
      });

      if (this.enableLogging) {
        console.log("Displaying pixels", renderPixels);
      }

      this.senseHatLeds.sync.setPixels(renderPixels);
    }
  }]);

  return Display;
}();

exports.Display = Display;

function scrollMessage(messageScroller, senseHatLeds, speed, resolve, onCancel) {
  var next = messageScroller.next();

  if (next.done) {
    resolve();
    return;
  }

  senseHatLeds.sync.setPixels(screen.value);
  timeout = setTimeout(function () {
    scrollMessage(messageScroller, senseHatLeds, speed, resolve, onCancel);
  }, 1000 * speed);
  onCancel && onCancel(function () {
    clearTimeout(timeout);
  });
}