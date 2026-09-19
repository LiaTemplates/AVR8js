import { SPIDevice } from './board'

const BLOCK = 512
const SECTORS = 16384 // 8 MB, like the wokwi card
const RESERVED = 1
const FAT_SECTORS = 64
const ROOT_SECTORS = 32 // 512 entries

/**
 * SD card in SPI mode (SDHC, block addressing) with a blank FAT16 file
 * system. Blocks are created on first access, so the 8 MB are never
 * allocated at once.
 */
export class SDCardController implements SPIDevice {
  private blocks = new Map<number, Uint8Array>()
  private command: number[] = []
  private out: number[] = []
  private idle = true
  private appCommand = false
  private readNext = -1 // CMD18 multi block read
  private writeBlock = -1 // CMD24 / CMD25 target block
  private writeMulti = false
  private writeData: number[] | null = null

  block(n: number) {
    let data = this.blocks.get(n)
    if (!data) {
      data = new Uint8Array(BLOCK)
      if (n === 0) format(data)
      if (n === RESERVED || n === RESERVED + FAT_SECTORS) data.set([0xf8, 0xff, 0xff, 0xff])
      this.blocks.set(n, data)
    }
    return data
  }

  transfer(value: number) {
    if (this.writeBlock >= 0 && !this.command.length) return this.receive(value)

    if (this.command.length || (value & 0xc0) === 0x40) {
      this.command.push(value)
      if (this.command.length === 6) {
        this.execute(this.command)
        this.command = []
      }
      return 0xff
    }

    if (!this.out.length && this.readNext >= 0) this.sendBlock(this.readNext++)
    return this.out.length ? this.out.shift()! : 0xff
  }

  private receive(value: number) {
    if (!this.writeData) {
      if (value === 0xfe || value === 0xfc) this.writeData = []
      else if (value === 0xfd) {
        // stop token of a multi block write
        this.writeBlock = -1
        this.out = [0xff, 0x00]
      }
      return this.out.length ? this.out.shift()! : 0xff
    }

    this.writeData.push(value)
    if (this.writeData.length === BLOCK + 2) {
      this.block(this.writeBlock).set(this.writeData.slice(0, BLOCK))
      this.writeData = null
      this.out = [0x05, 0x00, 0xff] // data accepted, busy, ready
      if (this.writeMulti) this.writeBlock++
      else this.writeBlock = -1
      return 0xff
    }
    return 0xff
  }

  private sendBlock(n: number) {
    this.out.push(0xfe, ...this.block(n), 0xff, 0xff)
  }

  private execute([cmd, a3, a2, a1, a0]: number[]) {
    cmd &= 0x3f
    const arg = ((a3 << 24) | (a2 << 16) | (a1 << 8) | a0) >>> 0
    const r1 = this.idle ? 0x01 : 0x00
    const app = this.appCommand
    this.appCommand = false
    this.out = [0xff] // one byte delay before every response

    switch (cmd) {
      case 0: // GO_IDLE_STATE
        this.idle = true
        this.readNext = -1
        this.writeBlock = -1
        this.out.push(0x01)
        break
      case 8: // SEND_IF_COND
        this.out.push(r1, 0x00, 0x00, a1 & 0x0f, a0)
        break
      case 55: // APP_CMD
        this.appCommand = true
        this.out.push(r1)
        break
      case 41: // SD_SEND_OP_COND
      case 1:
        this.idle = false
        this.out.push(app || cmd === 1 ? 0x00 : 0x05)
        break
      case 58: // READ_OCR, power up done and CCS (SDHC)
        this.out.push(r1, 0xc0, 0xff, 0x80, 0x00)
        break
      case 9: // SEND_CSD, version 2, C_SIZE = 15 → 8 MB
        this.out.push(r1, 0xff, 0xfe, 0x40, 0x0e, 0x00, 0x32, 0x5b, 0x59, 0x00,
          0x00, 0x00, SECTORS / 1024 - 1, 0x7f, 0x80, 0x0a, 0x40, 0x00, 0x01, 0xff, 0xff)
        break
      case 10: // SEND_CID
        this.out.push(r1, 0xff, 0xfe, 0x03, 0x53, 0x44, 0x57, 0x4f, 0x4b, 0x57,
          0x49, 0x10, 0, 0, 0, 1, 0x01, 0x51, 0x01, 0xff, 0xff)
        break
      case 12: // STOP_TRANSMISSION
        this.readNext = -1
        this.out.push(0xff, r1)
        break
      case 13: // SEND_STATUS
        this.out.push(r1, 0x00)
        break
      case 17: // READ_SINGLE_BLOCK
        this.out.push(0x00, 0xff)
        this.sendBlock(arg)
        break
      case 18: // READ_MULTIPLE_BLOCK
        this.out.push(0x00, 0xff)
        this.sendBlock(arg)
        this.readNext = arg + 1
        break
      case 24: // WRITE_BLOCK
      case 25: // WRITE_MULTIPLE_BLOCK
        this.out.push(0x00)
        this.writeBlock = arg
        this.writeMulti = cmd === 25
        this.writeData = null
        break
      case 16: // SET_BLOCKLEN
      case 23: // SET_WR_BLK_ERASE_COUNT
      case 59: // CRC_ON_OFF
        this.out.push(r1)
        break
      default:
        this.out.push(r1 | 0x04) // illegal command
    }
  }
}

/** FAT16 boot sector without partition table ("superfloppy") */
function format(b: Uint8Array) {
  const view = new DataView(b.buffer)
  b.set([0xeb, 0x3c, 0x90])
  b.set(Array.from('MSWIN4.1', (c) => c.charCodeAt(0)), 3)
  view.setUint16(11, BLOCK, true)
  b[13] = 1 // sectors per cluster
  view.setUint16(14, RESERVED, true)
  b[16] = 2 // FATs
  view.setUint16(17, (ROOT_SECTORS * BLOCK) / 32, true)
  view.setUint16(19, SECTORS, true)
  b[21] = 0xf8 // media descriptor
  view.setUint16(22, FAT_SECTORS, true)
  view.setUint16(24, 32, true) // sectors per track
  view.setUint16(26, 64, true) // heads
  b[36] = 0x80 // drive number
  b[38] = 0x29 // extended boot signature
  view.setUint32(39, 0x1234abcd, true)
  b.set(Array.from('NO NAME    FAT16   ', (c) => c.charCodeAt(0)), 43)
  b[510] = 0x55
  b[511] = 0xaa
}
