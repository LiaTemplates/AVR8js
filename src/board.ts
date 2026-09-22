import {
  ADCMuxInputType,
  AVRIOPort,
  CPU,
  PinState,
  portBConfig,
  portCConfig,
  portDConfig,
} from 'avr8js'
import { AVRRunner } from './execute'
import { I2CBus } from './i2c-bus'

export interface Pin {
  port: AVRIOPort
  bit: number
  adc?: number // ADC channel, only for A0-A5
}

export interface SPIDevice {
  transfer(value: number): number
}

type Watcher = { mask: number; fn: () => void }

export type AVRInterruptConfig = Parameters<CPU['setInterruptFlag']>[0]

/**
 * Glue between the wokwi elements and the simulated ATmega328p. Every part
 * handler in parts.ts receives one Board instance per run.
 */
export class Board {
  readonly i2c: I2CBus
  readonly signal: AbortSignal
  private watchers = new Map<AVRIOPort, Watcher[]>()
  private claimed = new Map<AVRIOPort, number>()
  private analogSources: Array<() => number> = []
  private spiDevices: Array<{ cs: Pin; device: SPIDevice }> = []
  private probes: Array<() => void> = []
  private interruptListeners: Array<(interrupt: AVRInterruptConfig) => void> = []
  private analogListeners: Array<(channel: number, volts: number) => void> = []
  private frameStart = 0
  frameCycles = 1
  serialActivity = false

  constructor(readonly runner: AVRRunner) {
    const abort = new AbortController()
    this.signal = abort.signal
    runner.onStop.push(() => abort.abort())

    this.i2c = new I2CBus(runner.twi)

    const { cpu } = runner
    const ports: Array<[AVRIOPort, number]> = [
      [runner.port.get('B')!, portBConfig.DDR],
      [runner.port.get('C')!, portCConfig.DDR],
      [runner.port.get('D')!, portDConfig.DDR],
    ]
    for (const [port, DDR] of ports) {
      let lastDDR = 0
      port.addListener((value, oldValue) => {
        const ddr = cpu.data[DDR]
        const changed = (value ^ oldValue) | (ddr ^ lastDDR)
        lastDDR = ddr
        if (!changed) return

        // free input pins with pull-up read HIGH, without pull-up LOW
        const free = changed & ~ddr & ~(this.claimed.get(port) || 0)
        for (let bit = 0; bit < 8; bit++) {
          if (free & (1 << bit)) port.setPin(bit, !!(value & (1 << bit)))
        }

        for (const w of this.watchers.get(port) || []) {
          if (w.mask & changed) w.fn()
        }
      })
    }

    // analog sources are sampled at conversion time, unconnected pins float
    const adc = runner.adc
    const convert = adc.onADCRead
    adc.onADCRead = (input) => {
      if (input.type === ADCMuxInputType.SingleEnded) {
        const source = this.analogSources[input.channel]
        adc.channelValues[input.channel] = source ? source() : Math.random() * 5
        for (const fn of this.analogListeners)
          fn(input.channel, adc.channelValues[input.channel])
      }
      convert(input)
    }

    runner.spi.onByte = (value) => {
      const selected = this.spiDevices.find(
        (d) => d.cs.port.pinState(d.cs.bit) === PinState.Low
      )
      const result = selected ? selected.device.transfer(value) : 0xff
      cpu.addClockEvent(
        () => runner.spi.completeTransfer(result),
        runner.spi.transferCycles
      )
    }
  }

  get cycles() {
    return this.runner.cpu.cycles
  }

  nanos() {
    return Math.round((this.runner.cpu.cycles / this.runner.FREQ) * 1e9)
  }

  millis() {
    return Math.round((this.runner.cpu.cycles / this.runner.FREQ) * 1e3)
  }

  /** called once per run-loop slice, before the part frames */
  frame() {
    this.frameCycles = Math.max(1, this.cycles - this.frameStart)
    this.frameStart = this.cycles
  }

  /**
   * Parses Arduino Uno pin numbers: "13", "A0", or lists like "2,3,4".
   * 0-7 → PORTD, 8-13 → PORTB, 14-19 (A0-A5) → PORTC
   */
  parse(value: string | null): Pin[] {
    const pins: Pin[] = []
    for (let s of (value || '').split(',')) {
      s = s.trim()
      const n = /^A[0-5]$/i.test(s) ? 14 + parseInt(s[1], 10) : parseInt(s, 10)
      if (!(n >= 0 && n <= 19)) {
        if (s) console.warn(`AVR8js: unknown pin "${s}"`)
        continue
      }
      if (n < 8) pins.push({ port: this.runner.port.get('D')!, bit: n })
      else if (n < 14) pins.push({ port: this.runner.port.get('B')!, bit: n - 8 })
      else pins.push({ port: this.runner.port.get('C')!, bit: n - 14, adc: n - 14 })
    }
    return pins
  }

  pins(el: Element, attr = 'pin'): Pin[] {
    return this.parse(el.getAttribute(attr))
  }

  pin(el: Element, attr = 'pin'): Pin | undefined {
    return this.pins(el, attr)[0]
  }

  state(p: Pin) {
    return p.port.pinState(p.bit)
  }

  high(p: Pin) {
    return p.port.pinState(p.bit) === PinState.High
  }

  low(p: Pin) {
    return p.port.pinState(p.bit) === PinState.Low
  }

  /** calls fn whenever the level or the mode of one of the pins changes */
  watch(pins: Pin | Pin[], fn: () => void) {
    for (const p of Array.isArray(pins) ? pins : [pins]) {
      const list = this.watchers.get(p.port) || []
      list.push({ mask: 1 << p.bit, fn })
      this.watchers.set(p.port, list)
    }
  }

  /** drives an input pin from outside */
  set(p: Pin, level: boolean) {
    this.claimed.set(p.port, (this.claimed.get(p.port) || 0) | (1 << p.bit))
    p.port.setPin(p.bit, level)
  }

  /**
   * A switch between the pin and GND (with INPUT_PULLUP) or VCC (with an
   * external pull-down, for INPUT). Parts that are wired to GND internally
   * (joystick SEL, KY-040 SW, ...) pass toGround. Returns the function to call
   * when the switch state changes.
   */
  contact(p: Pin | undefined, closed: () => boolean, toGround = false) {
    if (!p) return () => {}
    const update = () => {
      const pullup = this.state(p) === PinState.InputPullUp
      this.set(p, toGround ? !closed() && pullup : closed() !== pullup)
    }
    this.watch(p, update)
    update()
    return update
  }

  /**
   * Integrates the sampled boolean states over CPU cycles. The returned
   * function gives the share of time each state was true since its last call,
   * this is the PWM duty cycle for LEDs.
   */
  duty(pins: Pin[], sample: () => boolean[] = () => pins.map((p) => this.high(p))) {
    let state = sample()
    const acc = new Float64Array(state.length)
    let last = this.cycles
    let start = last
    const flush = () => {
      const now = this.cycles
      state.forEach((on, i) => on && (acc[i] += now - last))
      last = now
    }
    this.watch(pins, () => {
      flush()
      state = sample()
    })
    return () => {
      flush()
      const total = last - start || 1
      const result = Array.from(acc, (a) => a / total)
      acc.fill(0)
      start = last
      return result
    }
  }

  after(us: number, fn: () => void) {
    this.runner.cpu.addClockEvent(fn, Math.max(1, Math.round(us * 16)))
  }

  /** drives the pin through a list of [level, duration in µs] steps */
  sequence(p: Pin, steps: Array<[boolean, number]>, done?: () => void) {
    const next = (i: number) => {
      if (i >= steps.length) return done && done()
      this.set(p, steps[i][0])
      this.after(steps[i][1], () => next(i + 1))
    }
    next(0)
  }

  /** voltage source (0-5V) for an analog pin, sampled on every analogRead */
  analog(p: Pin | undefined, volts: () => number) {
    if (p && p.adc !== undefined) this.analogSources[p.adc] = volts
  }

  /** fn runs before every instruction, this slows the simulation down */
  probe(fn: () => void) {
    const probes = this.probes
    probes.push(fn)
    this.runner.probe = probes.length === 1 ? fn : () => probes.forEach((p) => p())
  }

  /** called whenever a peripheral raises an interrupt flag (TOV0, INTF0, ...) */
  onInterrupt(fn: (interrupt: AVRInterruptConfig) => void) {
    if (!this.interruptListeners.length) {
      const cpu = this.runner.cpu
      const raise = cpu.setInterruptFlag.bind(cpu)
      cpu.setInterruptFlag = (interrupt) => {
        for (const listener of this.interruptListeners) listener(interrupt)
        raise(interrupt)
      }
    }
    this.interruptListeners.push(fn)
  }

  /** called on every analogRead with the channel and the sampled voltage */
  onAnalogRead(fn: (channel: number, volts: number) => void) {
    this.analogListeners.push(fn)
  }

  /** the voltage an analog source currently delivers, undefined if unconnected */
  voltage(channel: number): number | undefined {
    const source = this.analogSources[channel]
    return source && source()
  }

  spi(cs: Pin | undefined, device: SPIDevice) {
    if (cs) this.spiDevices.push({ cs, device })
  }

  on(el: Element, type: string, fn: (e: any) => void) {
    el.addEventListener(type, fn, { signal: this.signal })
  }

  num(el: Element, attr: string, fallback: number) {
    const value = parseFloat(el.getAttribute(attr) || '')
    return isNaN(value) ? fallback : value
  }
}
