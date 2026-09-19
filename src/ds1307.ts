import { I2CDevice } from './i2c-bus'

export const DS1307_ADDR = 0x68

const bcd = (value: number) => (((value / 10) | 0) << 4) | value % 10
const dec = (value: number) => (value >> 4) * 10 + (value & 0x0f)

/**
 * DS1307 real time clock: 7 time registers, 1 control register, 56 bytes RAM.
 * The time runs with the simulation clock, starting at initTime.
 */
export class DS1307Controller implements I2CDevice {
  private registers = new Uint8Array(64)
  private pointer = 0
  private firstByte = true
  private timeWritten = false
  private base: number // wall clock time (as UTC fields) at simulation time 0

  constructor(private cpuMillis: () => number, initTime: string | null) {
    let time: number
    if (initTime === '0') time = Date.UTC(2000, 0, 1)
    else if (initTime && initTime !== 'now')
      time = Date.parse(/z$/i.test(initTime) ? initTime : initTime + 'Z')
    else time = Date.now() - new Date().getTimezoneOffset() * 60000

    this.base = (isNaN(time) ? Date.now() : time) - cpuMillis()
  }

  private latchTime() {
    const now = new Date(this.base + this.cpuMillis())
    const r = this.registers
    r[0] = bcd(now.getUTCSeconds())
    r[1] = bcd(now.getUTCMinutes())
    r[2] = bcd(now.getUTCHours())
    r[3] = now.getUTCDay() + 1
    r[4] = bcd(now.getUTCDate())
    r[5] = bcd(now.getUTCMonth() + 1)
    r[6] = bcd(now.getUTCFullYear() % 100)
  }

  i2cConnect(addr: number, write: boolean) {
    this.firstByte = write
    if (!write) this.latchTime()
    return true
  }

  i2cWriteByte(value: number) {
    if (this.firstByte) {
      this.firstByte = false
      this.pointer = value & 0x3f
      this.latchTime()
    } else {
      if (this.pointer < 7) this.timeWritten = true
      this.registers[this.pointer] = value
      this.pointer = (this.pointer + 1) & 0x3f
    }
    return true
  }

  i2cReadByte() {
    const value = this.registers[this.pointer]
    this.pointer = (this.pointer + 1) & 0x3f
    return value
  }

  i2cDisconnect() {
    if (!this.timeWritten) return
    this.timeWritten = false
    const r = this.registers
    const hours =
      r[2] & 0x40 // 12h mode
        ? (dec(r[2] & 0x1f) % 12) + (r[2] & 0x20 ? 12 : 0)
        : dec(r[2] & 0x3f)
    const time = Date.UTC(
      2000 + dec(r[6]),
      dec(r[5] & 0x1f) - 1,
      dec(r[4] & 0x3f),
      hours,
      dec(r[1] & 0x7f),
      dec(r[0] & 0x7f)
    )
    this.base = time - this.cpuMillis()
  }
}
