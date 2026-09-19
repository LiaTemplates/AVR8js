import { I2CDevice } from './i2c-bus'

export const MPU6050_ADDR = 0x68

const GYRO_CONFIG = 0x1b
const ACCEL_CONFIG = 0x1c
const ACCEL_XOUT_H = 0x3b
const PWR_MGMT_1 = 0x6b
const WHO_AM_I = 0x75

export interface MotionValues {
  accel: [number, number, number] // g
  gyro: [number, number, number] // °/s
  temperature: number // °C
}

/**
 * MPU6050 register model: the sensor registers (0x3B-0x48) are filled from
 * the element attributes whenever a read starts.
 */
export class MPU6050Controller implements I2CDevice {
  private registers = new Uint8Array(128)
  private pointer = 0
  private firstByte = true

  constructor(private values: () => MotionValues) {
    this.reset()
  }

  private reset() {
    this.registers.fill(0)
    this.registers[PWR_MGMT_1] = 0x40 // sleep
    this.registers[WHO_AM_I] = 0x68
  }

  private latchValues() {
    const { accel, gyro, temperature } = this.values()
    const accelScale = 16384 >> ((this.registers[ACCEL_CONFIG] >> 3) & 3)
    const gyroScale = [131, 65.5, 32.8, 16.4][(this.registers[GYRO_CONFIG] >> 3) & 3]
    const words = [
      ...accel.map((g) => g * accelScale),
      (temperature - 36.53) * 340,
      ...gyro.map((dps) => dps * gyroScale),
    ]
    words.forEach((value, i) => {
      const word = Math.max(-32768, Math.min(32767, Math.round(value))) & 0xffff
      this.registers[ACCEL_XOUT_H + 2 * i] = word >> 8
      this.registers[ACCEL_XOUT_H + 2 * i + 1] = word & 0xff
    })
  }

  i2cConnect(addr: number, write: boolean) {
    this.firstByte = write
    if (!write) this.latchValues()
    return true
  }

  i2cWriteByte(value: number) {
    if (this.firstByte) {
      this.firstByte = false
      this.pointer = value & 0x7f
      return true
    }
    if (this.pointer === PWR_MGMT_1 && value & 0x80) {
      this.reset() // DEVICE_RESET clears itself
    } else if (this.pointer !== WHO_AM_I) {
      this.registers[this.pointer] = value
    }
    this.pointer = (this.pointer + 1) & 0x7f
    return true
  }

  i2cReadByte() {
    const value = this.registers[this.pointer]
    this.pointer = (this.pointer + 1) & 0x7f
    return value
  }

  i2cDisconnect() {}
}
