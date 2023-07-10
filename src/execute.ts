import {
  avrInstruction,
  avrInterrupt,
  AVRIOPort,
  AVRTimer,
  AVRUSART,
  CPU,
  timer0Config,
  timer1Config,
  timer2Config,
  portBConfig,
  portCConfig,
  portDConfig,
  usart0Config,
  AVRTWI,
  twiConfig,
} from 'avr8js'
import { loadHex } from './intelhex'
import { MicroTaskScheduler } from './task-scheduler'

// ATmega328p params
const FLASH = 0x8000

export type PORT = 'A' | 'B' | 'C' | 'D' //| 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L';

//const PORTS:Array<PORT> = ['B','C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L'];

export class AVRRunner {
  readonly program = new Uint16Array(FLASH)
  readonly cpu: CPU
  readonly timer0: AVRTimer
  readonly timer1: AVRTimer
  readonly timer2: AVRTimer
  readonly port = new Map<PORT, AVRIOPort>()
  readonly usart: AVRUSART
  readonly speed = 16e6 // 16 MHZ
  readonly workUnitCycles = 500000
  readonly taskScheduler = new MicroTaskScheduler()
  public serialBuffer: Array<number>

  readonly twi: AVRTWI
  readonly FREQ = 16000000

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

    this.serialBuffer = []

    this.usart = new AVRUSART(this.cpu, usart0Config, this.speed)

    this.cpu.readHooks[usart0Config.UDR] = () => this.serialBuffer.shift() || 0

    this.taskScheduler.start()
  }

  execute(callback: (cpu: CPU) => void) {
    const cyclesToRun = this.cpu.cycles + this.workUnitCycles
    while (this.cpu.cycles < cyclesToRun) {
      avrInstruction(this.cpu)
      this.cpu.tick()
    }

    callback(this.cpu)
    this.taskScheduler.postTask(() => this.execute(callback))

    const ucsra = this.cpu.data[usart0Config.UCSRA]
    if (
      this.cpu.interruptsEnabled &&
      ucsra & 0x20 &&
      this.serialBuffer.length > 0
    ) {
      avrInterrupt(this.cpu, usart0Config.rxCompleteInterrupt)
    }
  }

  stop() {
    this.taskScheduler.stop()
  }

  serial(input: string) {
    for (var i = 0; i < input.length; i++) {
      this.serialBuffer.push(input.charCodeAt(i))
    }
  }
}
