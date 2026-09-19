import { SPIDevice } from './board'

const WIDTH = 240
const HEIGHT = 320

const SWRESET = 0x01
const INVOFF = 0x20
const INVON = 0x21
const CASET = 0x2a
const PASET = 0x2b
const RAMWR = 0x2c
const MADCTL = 0x36

/**
 * ILI9341 240x320 TFT controller, 16 bit colors (RGB565). Implements the
 * commands that drawing libraries like Adafruit_ILI9341 use, reads return 0.
 */
export class ILI9341Controller implements SPIDevice {
  readonly image = new ImageData(WIDTH, HEIGHT)
  dirty = true

  private command = 0
  private params: number[] = []
  private highByte = -1
  private x0 = 0
  private x1 = WIDTH - 1
  private y0 = 0
  private y1 = HEIGHT - 1
  private x = 0
  private y = 0
  private madctl = 0
  private invert = false

  constructor(private dataMode: () => boolean) {
    this.reset()
  }

  private reset() {
    this.madctl = 0
    this.invert = false
    this.image.data.fill(0)
    for (let i = 3; i < this.image.data.length; i += 4) this.image.data[i] = 255
    this.dirty = true
  }

  transfer(value: number) {
    if (this.dataMode()) this.data(value)
    else {
      this.command = value
      this.params = []
      this.highByte = -1
      if (value === RAMWR) {
        this.x = this.x0
        this.y = this.y0
      } else if (value === SWRESET) this.reset()
      else if ((value === INVON) !== this.invert && (value === INVON || value === INVOFF)) {
        // inversion is its own inverse, so flip the whole frame buffer
        this.invert = value === INVON
        const d = this.image.data
        for (let i = 0; i < d.length; i++) if (i % 4 !== 3) d[i] = 255 - d[i]
        this.dirty = true
      }
    }
    return 0
  }

  private data(value: number) {
    if (this.command === RAMWR) {
      if (this.highByte < 0) {
        this.highByte = value
      } else {
        this.pixel((this.highByte << 8) | value)
        this.highByte = -1
      }
      return
    }

    const p = this.params
    p.push(value)
    if (this.command === CASET && p.length === 4) {
      this.x0 = (p[0] << 8) | p[1]
      this.x1 = (p[2] << 8) | p[3]
    } else if (this.command === PASET && p.length === 4) {
      this.y0 = (p[0] << 8) | p[1]
      this.y1 = (p[2] << 8) | p[3]
    } else if (this.command === MADCTL) {
      this.madctl = value
    }
  }

  private pixel(color: number) {
    // MADCTL: MY 0x80, MX 0x40, MV 0x20, BGR 0x08. The panel is mounted
    // mirrored in x and with BGR subpixels, which the libraries compensate.
    let px = this.x
    let py = this.y
    if (this.madctl & 0x20) [px, py] = [py, px]
    if (!(this.madctl & 0x40)) px = WIDTH - 1 - px
    if (this.madctl & 0x80) py = HEIGHT - 1 - py

    if (px >= 0 && px < WIDTH && py >= 0 && py < HEIGHT) {
      let r = (((color >> 11) & 0x1f) * 255) / 31
      const g = (((color >> 5) & 0x3f) * 255) / 63
      let b = ((color & 0x1f) * 255) / 31
      if (!(this.madctl & 0x08)) [r, b] = [b, r]
      const i = (py * WIDTH + px) * 4
      const d = this.image.data
      d[i] = this.invert ? 255 - r : r
      d[i + 1] = this.invert ? 255 - g : g
      d[i + 2] = this.invert ? 255 - b : b
      this.dirty = true
    }

    if (++this.x > this.x1) {
      this.x = this.x0
      if (++this.y > this.y1) this.y = this.y0
    }
  }
}
