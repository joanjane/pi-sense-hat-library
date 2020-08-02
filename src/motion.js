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
              mapMotionRadians(data) :
              mapMotionDegrees(data)
            );
        }
      });
    });

    return environmentSensors;
  }
}

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
  let degrees = radians * (180/Math.PI);
  return degrees < 0 ? degrees + 360 : degrees;
}

function convertVector(vector) {
  return [vector.x, vector.y, vector.z];
}