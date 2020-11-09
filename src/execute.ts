import {
  avrInstruction,
  AVRTimer,
  CPU,
  timer0Config,
  AVRUSART,
  usart0Config,
  AVRIOPort,
  portBConfig,
  portCConfig,
  portDConfig,
  portEConfig,
  portFConfig,
  portGConfig,
  portHConfig,
  portJConfig,
  portKConfig,
  portLConfig
} from 'avr8js';
import { loadHex } from './intelhex';

// ATmega328p params
const FLASH = 0x8000;

export type PORT = 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L';

//const PORTS:Array<PORT> = ['B','C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L'];

export class AVRRunner {
  readonly program = new Uint16Array(FLASH);
  readonly cpu: CPU;
  readonly timer: AVRTimer;
  readonly usart: AVRUSART;
  readonly port = new Map<PORT, AVRIOPort>();
  readonly MHZ = 16e6;

  private stopped = false;

  constructor(hex: string) {
    loadHex(hex, new Uint8Array(this.program.buffer));
    this.cpu = new CPU(this.program);
    this.timer  = new AVRTimer(this.cpu, timer0Config);

    this.port.set('B', new AVRIOPort(this.cpu, portBConfig));
    this.port.set('C', new AVRIOPort(this.cpu, portCConfig));
    this.port.set('D', new AVRIOPort(this.cpu, portDConfig));
    this.port.set('E', new AVRIOPort(this.cpu, portEConfig));
    this.port.set('F', new AVRIOPort(this.cpu, portFConfig));
    this.port.set('G', new AVRIOPort(this.cpu, portGConfig));
    this.port.set('H', new AVRIOPort(this.cpu, portHConfig));
    this.port.set('J', new AVRIOPort(this.cpu, portJConfig));
    this.port.set('K', new AVRIOPort(this.cpu, portKConfig));
    this.port.set('L', new AVRIOPort(this.cpu, portLConfig));

    this.usart = new AVRUSART(this.cpu, usart0Config, this.MHZ);
  }

  async execute(callback: (cpu: CPU) => void) {
    this.stopped = false;
    for (;;) {
      avrInstruction(this.cpu);
      this.timer.tick();
      this.usart.tick();
      if (this.cpu.cycles % 500000 === 0) {
        callback(this.cpu);
        await new Promise((resolve) => setTimeout(resolve, 0));
        if (this.stopped) {
          break;
        }
      }
    }
  }

  stop() {
    this.stopped = true;
  }
}
