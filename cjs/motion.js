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
    value: function getMotionStatus(options) {
      var _this = this;

      options = options || {};
      options.radians = options.radians || false;
      var environmentSensors = new Promise(function (resolve, reject) {
        _this.imu.getValue(function (error, data) {
          if (error) {
            reject(error);
          } else {
            resolve(options.radians ? mapMotionRadians(data) : mapMotionDegrees(data));
          }
        });
      });
      return environmentSensors;
    }
  }]);

  return MotionSensors;
}();

exports.MotionSensors = MotionSensors;

function mapMotionDegrees(data) {
  return {
    acceleration: convertVector(data.accel).map(radiansToDegrees),
    gyroscope: convertVector(data.gyro).map(radiansToDegrees),
    orientation: convertVector(data.fusionPose).map(radiansToDegrees),
    compass: radiansToDegrees(data.compass.z)
  };
}

function mapMotionRadians(data) {
  return {
    acceleration: convertVector(data.accel),
    gyroscope: convertVector(data.gyro),
    orientation: convertVector(data.fusionPose),
    compass: data.compass.z
  };
}

function radiansToDegrees(radians) {
  var degrees = radians * (180 / Math.PI);
  return degrees < 0 ? degrees + 360 : degrees;
}

function convertVector(vector) {
  return [vector.x, vector.y, vector.z];
}