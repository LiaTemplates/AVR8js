/**
 * HD44780 character LCD behind a PCF8574 I2C backpack (LCD1602, LCD2004)
 * Part of AVR8js Electron Playground
 *
 * Copyright (C) 2019, Uri Shaked
 * Copyright (C) 2020, Anderson Costa
 */
import { I2CDevice } from './i2c-bus'

export const LCD1602_ADDR = 0x27

// PCF8574 pins: P0 = RS, P1 = RW, P2 = EN, P3 = backlight, P4-P7 = D4-D7
const RS = 0x01
const RW = 0x02
const EN = 0x04
const BACKLIGHT = 0x08

export class LCDController implements I2CDevice {
  readonly cgram = new Uint8Array(64)
  private ddram = new Uint8Array(128).fill(32)

  private addr = 0
  private shift = 0
  private cgramMode = false
  private increment = true
  private shiftMode = false
  private is8bit = true
  private nibble = -1 // pending high nibble in 4 bit mode
  private enable = false

  private displayOn = false
  private cursorOn = false
  private blinkOn = false
  private backlight = false

  private updated = true
  private cgramUpdated = false

  constructor(readonly cols = 16, readonly rows = 2) {}

  i2cConnect() {
    return true
  }

  i2cDisconnect() {}

  i2cReadByte() {
    return 0xff
  }

  i2cWriteByte(value: number) {
    const backlight = !!(value & BACKLIGHT)
    if (backlight !== this.backlight) {
      this.backlight = backlight
      this.updated = true
    }

    // the HD44780 latches data on the falling edge of EN
    const enable = !!(value & EN)
    if (this.enable && !enable && !(value & RW)) {
      this.latch(value & 0xf0, !!(value & RS))
    }
    this.enable = enable
    return true
  }

  private latch(data: number, rs: boolean) {
    if (!this.is8bit) {
      if (this.nibble < 0) {
        this.nibble = data
        return
      }
      data = this.nibble | (data >> 4)
      this.nibble = -1
    }

    if (rs) this.write(data)
    else this.command(data)

    this.updated = true
  }

  private command(value: number) {
    if (value & 0x80) {
      this.cgramMode = false
      this.addr = value & 0x7f
    } else if (value & 0x40) {
      this.cgramMode = true
      this.addr = value & 0x3f
    } else if (value & 0x20) {
      this.is8bit = !!(value & 0x10)
      this.nibble = -1
    } else if (value & 0x10) {
      if (value & 0x08) {
        // display shift: shifting left moves the window to the right
        this.shift = (this.shift + (value & 0x04 ? -1 : 1) + 40) % 40
      } else {
        this.addr = (this.addr + (value & 0x04 ? 1 : -1)) & 0x7f
      }
    } else if (value & 0x08) {
      this.displayOn = !!(value & 0x04)
      this.cursorOn = !!(value & 0x02)
      this.blinkOn = !!(value & 0x01)
    } else if (value & 0x04) {
      this.increment = !!(value & 0x02)
      this.shiftMode = !!(value & 0x01)
    } else if (value & 0x02) {
      this.cgramMode = false
      this.addr = 0
      this.shift = 0
    } else if (value & 0x01) {
      this.cgramMode = false
      this.ddram.fill(32)
      this.addr = 0
      this.shift = 0
      this.increment = true
    }
  }

  private write(value: number) {
    if (this.cgramMode) {
      // the wokwi font stores the 5 pixel columns in reverse order
      this.cgram[this.addr] =
        ((value & 0x01) << 4) |
        ((value & 0x02) << 2) |
        (value & 0x04) |
        ((value & 0x08) >> 2) |
        ((value & 0x10) >> 4)
      this.addr = (this.addr + 1) & 0x3f
      this.cgramUpdated = true
    } else {
      const step = this.increment ? 1 : -1
      this.ddram[this.addr] = value
      this.addr = (this.addr + step) & 0x7f
      if (this.shiftMode) this.shift = (this.shift + step + 40) % 40
    }
  }

  update() {
    if (!this.updated) return null
    this.updated = false

    // row start addresses: 0x00, 0x40, 0x14, 0x54 for a 20x4 display
    const offsets = [0x00, 0x40, this.cols, 0x40 + this.cols]
    const characters = new Uint8Array(this.cols * this.rows).fill(32)
    let cursorX = -1
    let cursorY = -1

    for (let row = 0; row < this.rows; row++) {
      const line = offsets[row] & 0x40
      const start = offsets[row] & 0x3f
      if (this.displayOn) {
        for (let col = 0; col < this.cols; col++) {
          characters[row * this.cols + col] =
            this.ddram[line + ((start + col + this.shift) % 40)]
        }
      }
      const x = (this.addr & 0x3f) - start - this.shift
      if ((this.addr & 0x40) === line && x >= 0 && x < this.cols) {
        cursorX = x
        cursorY = row
      }
    }

    const visible = this.displayOn && !this.cgramMode && cursorY >= 0
    const result = {
      characters,
      backlight: this.backlight,
      cursor: visible && this.cursorOn,
      blink: visible && this.blinkOn,
      cursorX,
      cursorY,
      cgramUpdated: this.cgramUpdated,
    }
    this.cgramUpdated = false
    return result
  }
}
