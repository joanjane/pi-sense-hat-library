"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvironmentSensors = void 0;

var _nodeimu = require("nodeimu");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EnvironmentSensors =
/*#__PURE__*/
function () {
  function EnvironmentSensors() {
    _classCallCheck(this, EnvironmentSensors);

    this.imu = null;
  }

  _createClass(EnvironmentSensors, [{
    key: "connect",
    value: function connect(onConnect) {
      this.imu = new _nodeimu.IMU();
      onConnect && onConnect();
    }
  }, {
    key: "getSensorsStatus",
    value: function getSensorsStatus() {
      var _this = this;

      var environmentSensors = new Promise(function (resolve, reject) {
        _this.imu.getValue(function (error, data) {
          if (error) {
            reject(error);
          } else {
            resolve({
              temperature: data.temperature,
              pressure: data.pressure,
              humidity: data.humidity
            });
          }
        });
      });
      return environmentSensors;
    }
  }]);

  return EnvironmentSensors;
}();

exports.EnvironmentSensors = EnvironmentSensors;