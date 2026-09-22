import { AVRTimerConfig, PinState, timer0Config, timer1Config, timer2Config } from 'avr8js'
import { Board, Pin } from './board'

/**
 * Records the inner state of the simulated ATmega328p as time series, for
 * <avr-chart>. All times are CPU cycles.
 */

export type Style = 'line' | 'step' | 'points' | 'marks'

export interface Trace {
  name: string
  /** traces with the same group share one y-axis, 'logic' are the digital lanes */
  group: string
  style: Style
  data: Array<[number, number]>
}

// ATmega328p interrupt vectors, the index is the vector number
export const VECTORS = [
  'RESET', 'INT0', 'INT1', 'PCINT0', 'PCINT1', 'PCINT2', 'WDT',
  'TIMER2_COMPA', 'TIMER2_COMPB', 'TIMER2_OVF',
  'TIMER1_CAPT', 'TIMER1_COMPA', 'TIMER1_COMPB', 'TIMER1_OVF',
  'TIMER0_COMPA', 'TIMER0_COMPB', 'TIMER0_OVF',
  'SPI_STC', 'USART_RX', 'USART_UDRE', 'USART_TX', 'ADC', 'EE_READY',
  'ANALOG_COMP', 'TWI', 'SPM_READY',
]

// interrupt flags and the vectors they belong to
const FLAGS: { [flag: string]: string } = {
  TOV0: 'TIMER0_OVF', OCF0A: 'TIMER0_COMPA', OCF0B: 'TIMER0_COMPB',
  TOV1: 'TIMER1_OVF', OCF1A: 'TIMER1_COMPA', OCF1B: 'TIMER1_COMPB', ICF1: 'TIMER1_CAPT',
  TOV2: 'TIMER2_OVF', OCF2A: 'TIMER2_COMPA', OCF2B: 'TIMER2_COMPB',
  INTF0: 'INT0', INTF1: 'INT1', ADIF: 'ADC', SPIF: 'SPI_STC', TWINT: 'TWI',
}

// the pins that the timers drive in PWM mode
const PWM_PINS: { [name: string]: string } = {
  OC0A: '6', OC0B: '5', OC1A: '9', OC1B: '10', OC2A: '11', OC2B: '3',
}

const TIMERS: AVRTimerConfig[] = [timer0Config, timer1Config, timer2Config]

const SREG_FLAGS = 'CZNVSHTI' // bit 0 to 7

const RAMEND = 0x8ff
const VECTOR_TABLE = 2 * VECTORS.length // in words

export class Recorder {
  readonly traces: Trace[] = []
  private samplers: Array<() => void> = []
  private isrState?: {
    stack: number[]
    busy: number
    since: number
    minSP: number
    enter: Array<(vector: number) => void>
    exit: Array<(vector: number) => void>
  }

  /**
   * @param interval cycles between two samples
   * @param keep     cycles of history to keep
   */
  constructor(private board: Board, private interval: number, private keep: number) {}

  private get cpu() {
    return this.board.runner.cpu
  }

  private trace(name: string, group: string, style: Style) {
    const trace: Trace = { name, group, style, data: [] }
    this.traces.push(trace)
    return trace
  }

  /** appends a value, steps only store changes */
  private emit(trace: Trace, value: number) {
    const last = trace.data[trace.data.length - 1]
    if (trace.style === 'step' && last && last[1] === value) return
    trace.data.push([this.cpu.cycles, value])
  }

  private sample(trace: Trace, read: () => number) {
    this.samplers.push(() => this.emit(trace, read()))
  }

  /** reads a timer register, 16-bit for timer 1 */
  private register(timer: AVRTimerConfig, addr: number) {
    const data = this.cpu.data
    return timer.bits === 16 ? data[addr] | (data[addr + 1] << 8) : data[addr]
  }

  /** calls fn with the level of the pin, whenever it changes */
  private level(p: Pin, fn: (high: boolean) => void) {
    const { port, bit } = p
    const PIN = port.portConfig.PIN
    let last: boolean | undefined
    const check = () => {
      // outputs by their driven level, the PIN register lags behind the listeners
      const state = port.pinState(bit)
      const high =
        state === PinState.High ||
        (state !== PinState.Low && !!(this.cpu.data[PIN] & (1 << bit)))
      if (high !== last) fn((last = high))
    }
    this.board.watch(p, check) // exact edges of outputs
    this.samplers.push(check) // inputs driven by parts
    check()
  }

  /** calls fn whenever the interrupt flag of the vector is raised */
  private interrupt(vector: number, fn: () => void) {
    this.board.onInterrupt((interrupt) => {
      if (interrupt.address === 2 * vector) fn()
    })
  }

  /** tracks which interrupt service routine runs, needs the per-instruction probe */
  private isr() {
    if (this.isrState) return this.isrState
    const { cpu } = this
    const program = this.board.runner.program
    const state = (this.isrState = {
      stack: [] as number[],
      busy: 0,
      since: 0,
      minSP: cpu.SP,
      enter: [] as Array<(vector: number) => void>,
      exit: [] as Array<(vector: number) => void>,
    })
    this.board.probe(() => {
      const pc = cpu.pc
      if (pc < VECTOR_TABLE) {
        // an interrupt jumps to its vector, pc 0 is the reset
        if (pc > 0 && !(pc & 1)) {
          if (!state.stack.length) state.since = cpu.cycles
          state.stack.push(pc >> 1)
          state.enter.forEach((fn) => fn(pc >> 1))
        }
      } else if (program[pc] === 0x9518 && state.stack.length) {
        // RETI
        const vector = state.stack.pop()!
        if (!state.stack.length) state.busy += cpu.cycles - state.since
        state.exit.forEach((fn) => fn(vector))
      }
      const sp = cpu.SP
      if (sp < state.minSP) state.minSP = sp
    })
    return state
  }

  /** parses one signal name and starts recording it, returns false if unknown */
  add(spec: string): boolean {
    const name = spec.trim().toUpperCase()
    let m: RegExpMatchArray | null

    if ((m = name.match(/^TCNT([012])$/))) {
      const timer = TIMERS[+m[1]]
      // reading TCNT through the CPU lets avr8js bring the counter up to date
      this.sample(this.trace(name, 'count', 'line'), () => {
        this.cpu.readData(timer.TCNT)
        return this.register(timer, timer.TCNT)
      })
      return true
    }
    if ((m = name.match(/^OCR([012])([AB])$/))) {
      const timer = TIMERS[+m[1]]
      const addr = m[2] === 'A' ? timer.OCRA : timer.OCRB
      this.sample(this.trace(name, 'count', 'step'), () => this.register(timer, addr))
      return true
    }
    if (name === 'ICR1') {
      this.sample(this.trace(name, 'count', 'step'), () =>
        this.register(timer1Config, timer1Config.ICR)
      )
      return true
    }
    if ((m = name.match(/^TOP([012])$/))) {
      const timer = [this.board.runner.timer0, this.board.runner.timer1, this.board.runner.timer2][+m[1]]
      this.sample(this.trace(name, 'count', 'step'), () => timer.TOP)
      return true
    }
    if ((m = name.match(/^ADC([0-5])$/))) {
      const channel = +m[1]
      const volts = this.trace(`${name} (V)`, 'V', 'line')
      const reads = this.trace(`analogRead(A${channel})`, 'V', 'points')
      this.sample(volts, () => this.board.voltage(channel) ?? 0)
      this.board.onAnalogRead((ch, v) => ch === channel && this.emit(reads, v))
      return true
    }
    if (FLAGS[name] || VECTORS.indexOf(name) > 0) {
      const marks = this.trace(name, 'logic', 'marks')
      this.interrupt(VECTORS.indexOf(FLAGS[name] || name), () => this.emit(marks, 1))
      return true
    }
    if (name === 'ISR') {
      const lanes: { [vector: number]: Trace } = {}
      const lane = (vector: number) =>
        (lanes[vector] = lanes[vector] || this.trace(`ISR ${VECTORS[vector]}`, 'logic', 'step'))
      const state = this.isr()
      state.enter.push((vector) => this.emit(lane(vector), 1))
      state.exit.push((vector) => this.emit(lane(vector), 0))
      return true
    }
    if (name === 'LOAD') {
      // moving average over 40 samples (a tenth of the window by default),
      // a single sample is often shorter than one ISR
      const state = this.isr()
      const history: Array<[number, number]> = []
      this.sample(this.trace('LOAD (% in ISR)', '%', 'line'), () => {
        const now = this.cpu.cycles
        const total = state.busy + (state.stack.length ? now - state.since : 0)
        history.push([now, total])
        if (history.length > 40) history.shift()
        const [at, busy] = history[0]
        return now > at ? (100 * (total - busy)) / (now - at) : 0
      })
      return true
    }
    if (name === 'SP') {
      this.sample(this.trace(name, 'address', 'step'), () => this.cpu.SP)
      return true
    }
    if (name === 'STACK') {
      const state = this.isr()
      this.sample(this.trace('STACK (bytes)', 'bytes', 'step'), () => {
        const depth = RAMEND - state.minSP
        state.minSP = this.cpu.SP
        return depth
      })
      return true
    }
    if ((m = name.match(/^SREG(?:\.([CZNVSHTI]))?$/))) {
      for (const flag of m[1] ? [m[1]] : SREG_FLAGS.split('').reverse()) {
        const bit = SREG_FLAGS.indexOf(flag)
        this.sample(this.trace(`SREG.${flag}`, 'logic', 'step'), () => (this.cpu.SREG >> bit) & 1)
      }
      return true
    }
    if ((m = name.match(/^MEM:(0X[0-9A-F]+|\d+)(?::(U8|U16|I8|I16))?$/))) {
      const addr = Number(m[1].toLowerCase())
      const type = m[2] || 'U8'
      const view = this.cpu.dataView
      this.sample(this.trace(`MEM ${m[1]}`, 'value', 'step'), () =>
        type === 'U16' ? view.getUint16(addr, true)
        : type === 'I16' ? view.getInt16(addr, true)
        : type === 'I8' ? view.getInt8(addr)
        : view.getUint8(addr)
      )
      return true
    }

    // digital pins: D0-D13, A0-A5, 0-19, or the PWM outputs OC0A ...
    const pinName = PWM_PINS[name] || name.replace(/^D(\d+)$/, '$1')
    const p = this.board.parse(pinName)[0]
    if (p && /^(A[0-5]|\d+)$/.test(pinName)) {
      const label = PWM_PINS[name] ? `${name} (D${pinName})` : /^\d+$/.test(name) ? `D${name}` : name
      const trace = this.trace(label, 'logic', 'step')
      this.level(p, (high) => this.emit(trace, high ? 1 : 0))
      return true
    }
    return false
  }

  /**
   * Calls fn on a trigger event: an interrupt flag or vector (TOV0,
   * TIMER1_COMPA), or a pin edge (D2:rise, OC0A:fall, A0:change).
   */
  trigger(spec: string, fn: () => void): boolean {
    const [name, edge = 'rise'] = spec.trim().toUpperCase().split(':')
    const vector = VECTORS.indexOf(FLAGS[name] || name)
    if (vector > 0) {
      this.interrupt(vector, fn)
      return true
    }
    const pinName = PWM_PINS[name] || name.replace(/^D(\d+)$/, '$1')
    const p = /^(A[0-5]|\d+)$/.test(pinName) && this.board.parse(pinName)[0]
    if (!p) return false
    let first = true
    this.level(p, (high) => {
      if (first) first = false
      else if (edge === 'CHANGE' || high === (edge === 'RISE')) fn()
    })
    return true
  }

  /** starts sampling, it runs until the CPU stops */
  start() {
    const tick = () => {
      this.samplers.forEach((sample) => sample())
      this.trim()
      this.cpu.addClockEvent(tick, this.interval)
    }
    tick()
  }

  /** drops the history older than keep, one older point stays for the steps */
  private trim() {
    const limit = this.cpu.cycles - this.keep
    for (const { data } of this.traces) {
      if (data.length < 64 || data[32][0] >= limit) continue
      let i = 0
      while (i < data.length - 1 && data[i + 1][0] < limit) i++
      data.splice(0, i)
    }
  }
}
