import {
  avrInstruction,
  AVRTimer,
  CPU,
  timer0Config,
  timer1Config,
  timer2Config,
  AVRUSART,
  usart0Config,
  AVRIOPort,
  portAConfig,
  portBConfig,
  portCConfig,
  portDConfig,
  avrInterrupt
} from 'avr8js';
import { loadHex } from './intelhex';


// ATmega328p params
const FLASH = 0x8000;

export type PORT = 'A' | 'B' | 'C' | 'D' //| 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L';

//const PORTS:Array<PORT> = ['B','C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L'];

export class AVRRunner {
  readonly program = new Uint16Array(FLASH);
  readonly cpu: CPU;
  readonly timer0: AVRTimer;
  readonly timer1: AVRTimer;
  readonly timer2: AVRTimer;
  readonly usart: AVRUSART;
  readonly port = new Map<PORT, AVRIOPort>();
  readonly MHZ = 16e6;
  public serialBuffer: Array<number>;

  private stopped = false;

  constructor(hex: string) {
    loadHex(hex, new Uint8Array(this.program.buffer));
    this.cpu = new CPU(this.program);
    this.timer0  = new AVRTimer(this.cpu, timer0Config);
    this.timer1  = new AVRTimer(this.cpu, timer1Config);
    this.timer2  = new AVRTimer(this.cpu, timer2Config);


    this.port.set('A', new AVRIOPort(this.cpu, portAConfig));
    this.port.set('B', new AVRIOPort(this.cpu, portBConfig));
    this.port.set('C', new AVRIOPort(this.cpu, portCConfig));
    this.port.set('D', new AVRIOPort(this.cpu, portDConfig));
    //this.port.set('E', new AVRIOPort(this.cpu, portEConfig));
    //this.port.set('F', new AVRIOPort(this.cpu, portFConfig));
    //this.port.set('G', new AVRIOPort(this.cpu, portGConfig));
    //this.port.set('H', new AVRIOPort(this.cpu, portHConfig));
    //this.port.set('J', new AVRIOPort(this.cpu, portJConfig));
    //this.port.set('K', new AVRIOPort(this.cpu, portKConfig));
    //this.port.set('L', new AVRIOPort(this.cpu, portLConfig));
    // create an ArrayBuffer with a size in bytes
    this.serialBuffer = [];

    this.usart = new AVRUSART(this.cpu, usart0Config, this.MHZ);
    this.cpu.readHooks[usart0Config.UDR] = () => this.serialBuffer.shift() || 0;
  }

  async execute(callback: (cpu: CPU) => void) {
    this.stopped = false;
    for (;;) {
      avrInstruction(this.cpu);
      this.timer0.tick();
      this.timer1.tick();
      this.timer2.tick();
      this.usart.tick();

      if (this.cpu.cycles % 500000 === 0) {
        callback(this.cpu);
        await new Promise((resolve) => setTimeout(resolve, 0));
        if (this.stopped) {
          break;
        }
      }

      const ucsra = this.cpu.data[usart0Config.UCSRA];
      if (this.cpu.interruptsEnabled && ucsra & 0x20 && this.serialBuffer.length > 0) {
        avrInterrupt(this.cpu, usart0Config.rxCompleteInterrupt);
      }
    }
  }

  serial(input:string) {
    for (var i = 0; i < input.length; i++){
      this.serialBuffer.push(input.charCodeAt(i));
    }
  }

  stop() {
    this.stopped = true;
  }
}
