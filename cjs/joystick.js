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
    _classCallCheck(this, Joystick);

    this.onPressListeners = [];
    this.onHoldListeners = [];
    this.onReleaseListeners = [];
  }

  _createClass(Joystick, [{
    key: "connect",
    value: function connect(onOpen) {
      var _this = this;

      (0, _senseJoystick.getJoystick)().then(function (joystick) {
        _this.joystick = joystick;
        onOpen && onOpen();

        _this.joystick.on('press', function (direction) {
          return _this.onPressListeners.forEach(function (listener) {
            return listener(direction);
          });
        });

        _this.joystick.on('hold', function (direction) {
          return _this.onHoldListeners.forEach(function (listener) {
            return listener(direction);
          });
        });

        _this.joystick.on('release', function (direction) {
          return _this.onReleaseListeners.forEach(function (listener) {
            return listener(direction);
          });
        });
      });
    }
  }, {
    key: "close",
    value: function close() {
      if (this.joystick) {
        this.onPressListeners = [];
        this.onHoldListeners = [];
        this.onReleaseListeners = [];
        this.joystick = null;
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