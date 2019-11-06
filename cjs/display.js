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
  function Display() {
    _classCallCheck(this, Display);

    this.senseHatLeds = null;
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
      this.senseHatLeds.clear();
    }
  }, {
    key: "showMessage",
    value: function showMessage(message, speed, color, done) {
      this.senseHatLeds.showMessage(message, speed, color, done);
    }
  }, {
    key: "setPixel",
    value: function setPixel(x, y, color) {
      this.senseHatLeds.setPixel(x, y, color);
    }
  }, {
    key: "render",
    value: function render() {
      this.senseHatLeds.setPixel(x, y, color);
    }
  }]);

  return Display;
}();

exports.Display = Display;