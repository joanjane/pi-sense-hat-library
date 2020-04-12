import { IMU } from 'nodeimu';

export class EnvironmentSensors {
  constructor() {
    this.imu = null;
  }

  connect(onConnect) {
    this.imu = new IMU();
    onConnect && onConnect();
  }

  getSensorsStatus() {
    const environmentSensors = new Promise((resolve, reject) => {
      this.imu.getValue((error, data) => {
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
}