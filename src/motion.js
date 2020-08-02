import { IMU } from 'nodeimu';

export class MotionSensors {
  constructor() {
    this.imu = null;
  }

  connect(onConnect) {
    this.imu = new IMU();
    onConnect && onConnect();
  }

  close() {
    this.imu = null;
  }

  getMotionStatus(options) {
    options = options || {};
    options.radians = options.radians || false;

    const environmentSensors = new Promise((resolve, reject) => {
      this.imu.getValue((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            options.radians ? 
              this.mapMotionRadians(data) :
              this.mapMotionDegrees(data)
            );
        }
      });
    });

    return environmentSensors;
  }

  mapMotionDegrees(data) {
    return {
      acceleration: data.accel.map(radiansToDegrees),
      gyroscope: data.gyro.map(radiansToDegrees),
      orientation: data.fusionPose.map(radiansToDegrees),
      compass: radiansToDegrees(data.compass[2])
    };
  }

  mapMotionRadians(data) {
    return {
      acceleration: data.accel,
      gyroscope: data.gyro,
      orientation: data.fusionPose,
      compass: data.compass[2]
    };
  }
}

function radiansToDegrees(radians) {
  let degrees = radians * (180/Math.PI);
  return degrees < 0 ? degrees + 360 : degrees;
}