"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Joystick = void 0;

var _senseJoystick = require("sense-joystick");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Joystick =
/*#__PURE__*/
function () {
  function Joystick() {
    var _this = this;

    _classCallCheck(this, Joystick);

    this.onPressListeners = [];
    this.onHoldListeners = [];
    this.onReleaseListeners = [];

    this.handlePress = function (direction) {
      return _this.onPressListeners.forEach(function (listener) {
        return listener(direction);
      });
    };

    this.handleHold = function (direction) {
      return _this.onHoldListeners.forEach(function (listener) {
        return listener(direction);
      });
    };

    this.handleRelease = function (direction) {
      return _this.onReleaseListeners.forEach(function (listener) {
        return listener(direction);
      });
    };
  }

  _createClass(Joystick, [{
    key: "connect",
    value: function connect(onOpen) {
      var _this2 = this;

      (0, _senseJoystick.getJoystick)().then(function (joystick) {
        _this2.joystick = joystick;
        onOpen && onOpen();

        _this2.joystick.on('press', _this2.handlePress());

        _this2.joystick.on('hold', _this2.handleHold());

        _this2.joystick.on('release', _this2.handleRelease());
      });
    }
  }, {
    key: "close",
    value: function close() {
      if (this.joystick) {
        this.joystick.off('press', this.handlePress);
        this.joystick.off('hold', this.handleHold);
        this.joystick.off('release', this.handleRelease);
        this.onPressListeners = [];
        this.onHoldListeners = [];
        this.onReleaseListeners = [];
      }
    }
  }, {
    key: "on",
    value: function on(event, callback) {
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
          throw new Error("".concat(event, " event is not valid. Try with press, hold and release."));
      }
    }
  }]);

  return Joystick;
}();

exports.Joystick = Joystick;