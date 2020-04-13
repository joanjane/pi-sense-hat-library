import { IMU } from 'nodeimu';

export class MotionSensors {
  constructor() {
    this.imu = null;
  }

  connect(onConnect) {
    this.imu = new IMU();
    onConnect && onConnect();
  }

  getMotionStatus() {
    const environmentSensors = new Promise((resolve, reject) => {
      this.imu.getValue((error, data) => {
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
}