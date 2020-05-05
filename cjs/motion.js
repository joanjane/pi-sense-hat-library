"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotionSensors = void 0;

var _nodeimu = require("nodeimu");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MotionSensors =
/*#__PURE__*/
function () {
  function MotionSensors() {
    _classCallCheck(this, MotionSensors);

    this.imu = null;
  }

  _createClass(MotionSensors, [{
    key: "connect",
    value: function connect(onConnect) {
      this.imu = new _nodeimu.IMU();
      onConnect && onConnect();
    }
  }, {
    key: "close",
    value: function close() {
      this.imu = null;
    }
  }, {
    key: "getMotionStatus",
    value: function getMotionStatus() {
      var _this = this;

      var environmentSensors = new Promise(function (resolve, reject) {
        _this.imu.getValue(function (error, data) {
          if (error) {
            reject(error);
          } else {
            resolve({
              acceleration: data.accel,
              gyroscope: data.gyro,
              orientation: data.orientation,
              compass: data.compass
            });
          }
        });
      });
      return environmentSensors;
    }
  }]);

  return MotionSensors;
}();

exports.MotionSensors = MotionSensors;