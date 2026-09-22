import {
  adcConfig,
  avrInstruction,
  AVRADC,
  AVREEPROM,
  AVRIOPort,
  AVRSPI,
  AVRTimer,
  AVRTWI,
  AVRUSART,
  CPU,
  EEPROMMemoryBackend,
  portBConfig,
  portCConfig,
  portDConfig,
  spiConfig,
  timer0Config,
  timer1Config,
  timer2Config,
  twiConfig,
  usart0Config,
} from 'avr8js'
import { loadHex } from './intelhex'
import { MicroTaskScheduler } from './task-scheduler'

// ATmega328p params
const FLASH = 0x8000

export type PORT = 'B' | 'C' | 'D'

export class AVRRunner {
  readonly program = new Uint16Array(FLASH)
  readonly cpu: CPU
  readonly timer0: AVRTimer
  readonly timer1: AVRTimer
  readonly timer2: AVRTimer
  readonly port = new Map<PORT, AVRIOPort>()
  readonly usart: AVRUSART
  readonly adc: AVRADC
  readonly spi: AVRSPI
  readonly eeprom: AVREEPROM
  readonly twi: AVRTWI
  readonly FREQ = 16e6 // 16 MHZ
  readonly workUnitCycles = 500000
  readonly taskScheduler = new MicroTaskScheduler()
  readonly onStop: Array<() => void> = []
  public serialBuffer: Array<number> = []
  /** slow motion factor, 1 is real time */
  public speed = 1
  /** called before every instruction, only set when a chart needs it */
  public probe?: () => void
  private stopped = false
  private lastSpeed = 1
  private startTime = performance.now()
  private startCycles = 0

  constructor(hex: string) {
    loadHex(hex, new Uint8Array(this.program.buffer))
    this.cpu = new CPU(this.program)

    this.timer0 = new AVRTimer(this.cpu, timer0Config)
    this.timer1 = new AVRTimer(this.cpu, timer1Config)
    this.timer2 = new AVRTimer(this.cpu, timer2Config)

    this.port.set('B', new AVRIOPort(this.cpu, portBConfig))
    this.port.set('C', new AVRIOPort(this.cpu, portCConfig))
    this.port.set('D', new AVRIOPort(this.cpu, portDConfig))

    this.twi = new AVRTWI(this.cpu, twiConfig, this.FREQ)
    this.adc = new AVRADC(this.cpu, adcConfig)
    this.spi = new AVRSPI(this.cpu, spiConfig, this.FREQ)
    this.eeprom = new AVREEPROM(this.cpu, new EEPROMMemoryBackend(1024))

    this.usart = new AVRUSART(this.cpu, usart0Config, this.FREQ)

    this.usart.onRxComplete = () => this.feedSerial()

    this.taskScheduler.start()
  }

  execute(callback: (cpu: CPU) => void) {
    if (this.stopped) return

    // run in real time: wait if the simulation is ahead of the wall clock,
    // start over if it fell behind (slow computer, background tab)
    const now = performance.now()
    const speed = this.speed > 0 ? this.speed : 1
    if (speed !== this.lastSpeed) {
      this.lastSpeed = speed
      this.startTime = now
      this.startCycles = this.cpu.cycles
    }
    const ahead =
      ((this.cpu.cycles - this.startCycles) / this.FREQ / speed) * 1000 - (now - this.startTime)
    if (ahead > 1) {
      setTimeout(() => this.execute(callback), ahead)
      return
    }
    if (ahead < -100) {
      this.startTime = now
      this.startCycles = this.cpu.cycles
    }

    // in slow motion, smaller slices keep the frames coming (about 30 ms each)
    const slice = Math.min(this.workUnitCycles, Math.max(256, Math.round(this.FREQ * speed * 0.03)))
    const cyclesToRun = this.cpu.cycles + slice
    const { cpu, probe } = this
    if (probe) {
      while (cpu.cycles < cyclesToRun) {
        probe()
        avrInstruction(cpu)
        cpu.tick()
      }
    } else {
      while (cpu.cycles < cyclesToRun) {
        avrInstruction(cpu)
        cpu.tick()
      }
    }

    callback(this.cpu)
    this.feedSerial() // retry, in case the receiver was not enabled yet
    this.taskScheduler.postTask(() => this.execute(callback))
  }

  stop() {
    this.stopped = true
    this.taskScheduler.stop()
    this.onStop.splice(0).forEach((fn) => fn())
  }

  serial(input: string) {
    for (var i = 0; i < input.length; i++) {
      this.serialBuffer.push(input.charCodeAt(i))
    }
    this.feedSerial()
  }

  // one byte at a time, paced by the configured baud rate
  private feedSerial() {
    if (
      this.serialBuffer.length &&
      !this.usart.rxBusy &&
      this.usart.writeByte(this.serialBuffer[0])
    ) {
      this.serialBuffer.shift()
    }
  }
}
