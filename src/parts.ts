import { PinState } from 'avr8js'
import { Board, Pin } from './board'
import { avrChart } from './chart'
import { DS1307Controller, DS1307_ADDR } from './ds1307'
import { ILI9341Controller } from './ili9341'
import { LCDController, LCD1602_ADDR } from './lcd1602'
import { MPU6050Controller, MPU6050_ADDR } from './mpu6050'
import { SDCardController } from './sdcard'
import { SSD1306Controller, SSD1306_ADDR_32, SSD1306_ADDR_OTHER } from './ssd1306'
import { WS2812Controller } from './ws2812'

/** attaches one element to the board, may return a function called per frame */
type Part = (el: any, board: Board) => (() => void) | void

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const address = (el: Element, fallback: number) =>
  Number(el.getAttribute('address')) || fallback

// ---------------------------------------------------------------- outputs

const led: Part = (el, b) => {
  const p = b.pin(el)
  if (!p) return
  const duty = b.duty([p])
  return () => {
    const [d] = duty()
    el.value = d > 0
    el.brightness = d
  }
}

const rgbLed: Part = (el, b) => {
  const pins = ['pin-r', 'pin-g', 'pin-b'].map((attr) => b.pin(el, attr))
  const anode = el.getAttribute('common') !== 'cathode'
  const lit = (p?: Pin) => !!p && (anode ? b.low(p) : b.high(p))
  const duty = b.duty(pins.filter(Boolean) as Pin[], () => pins.map(lit))
  return () => {
    const [r, g, blue] = duty()
    el.ledRed = r
    el.ledGreen = g
    el.ledBlue = blue
  }
}

const barGraph: Part = (el, b) => {
  const duty = b.duty(b.pins(el))
  return () => {
    el.values = duty().map((d) => (d > 0.05 ? 1 : 0))
  }
}

const sevenSegment: Part = (el, b) => {
  let segments = b.pins(el) // A, B, C, D, E, F, G, DP
  if (segments.length === 1) {
    // legacy: pin="n" maps the segments to bit 0-7 of the port of pin n
    segments = Array.from({ length: 8 }, (_, bit) => ({ port: segments[0].port, bit }))
  }
  const digits = b.pins(el, 'pin-digits')
  const anode = el.getAttribute('common') !== 'cathode'
  const sample = () => {
    // 8 values per digit, DP stays off if it is not connected
    const lit = Array.from({ length: 8 }, (_, i) => {
      const p = segments[i]
      return !!p && (anode ? b.low(p) : b.high(p))
    })
    if (!digits.length) return lit
    return digits.flatMap((d) => {
      const active = anode ? b.high(d) : b.low(d)
      return lit.map((on) => on && active)
    })
  }
  const duty = b.duty([...segments, ...digits], sample)
  return () => {
    el.values = duty().map((d) => (d > 0.05 ? 1 : 0))
  }
}

let audio: AudioContext | undefined

function speaker(b: Board, volume: number) {
  try {
    const ctx = (audio = audio || new AudioContext())
    ctx.resume()
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'square'
    gain.gain.value = 0
    oscillator.connect(gain).connect(ctx.destination)
    oscillator.start()
    b.runner.onStop.push(() => oscillator.stop())
    return (freq: number) => {
      if (freq) oscillator.frequency.setTargetAtTime(freq, ctx.currentTime, 0.002)
      gain.gain.setTargetAtTime(freq ? volume : 0, ctx.currentTime, 0.005)
    }
  } catch (e) {
    return () => {}
  }
}

const buzzer: Part = (el, b) => {
  const p = b.pin(el)
  if (!p) return
  let edges = 0
  let first = 0
  let last = 0
  let high = false
  b.watch(p, () => {
    if (b.high(p) && !high) {
      if (!edges++) first = b.cycles
      last = b.cycles
    }
    high = b.high(p)
  })
  const play = speaker(b, 0.1 * b.num(el, 'volume', 1))
  return () => {
    const freq = edges > 1 ? ((edges - 1) * b.runner.FREQ) / (last - first) : 0
    edges = 0
    el.hasSignal = freq > 0 || b.high(p)
    play(freq)
  }
}

function neopixels(
  count: (el: any) => number,
  show: (el: any, color: (i: number) => { r: number; g: number; b: number }) => void
): Part {
  return (el, b) => {
    const p = b.pin(el)
    if (!p) return
    const ws2812 = new WS2812Controller(count(el))
    b.watch(p, () => ws2812.feedValue(b.state(p), b.nanos()))
    return () => {
      const pixels = ws2812.update(b.nanos())
      if (pixels)
        show(el, (i) => ({
          r: ((pixels[i] >> 8) & 0xff) / 255,
          g: ((pixels[i] >> 16) & 0xff) / 255,
          b: (pixels[i] & 0xff) / 255,
        }))
    }
  }
}

const arduino: Part = (el, b) => {
  const duty = b.duty(b.parse('13'))
  el.ledPower = true
  return () => {
    el.led13 = duty()[0] > 0
    el.ledTX = b.serialActivity
  }
}

// ---------------------------------------------------------------- switches

const pushbutton: Part = (el, b) => {
  let pressed = false
  const update = b.contact(b.pin(el), () => pressed)
  b.on(el, 'button-press', () => {
    pressed = true
    update()
  })
  b.on(el, 'button-release', () => {
    pressed = false
    update()
  })
}

const slideSwitch: Part = (el, b) => {
  // common pin 2 at the Arduino, pin 1 (left) at GND, pin 3 (right) at VCC
  const p = b.pin(el)
  if (!p) return
  const update = () => b.set(p, !!Number(el.value))
  b.on(el, 'input', update)
  update()
}

const dipSwitch: Part = (el, b) => {
  const updates = b.pins(el).map((p, i) => b.contact(p, () => !!el.values[i]))
  b.on(el, 'switch-change', () => updates.forEach((update) => update()))
}

const tiltSwitch: Part = (el, b) => {
  // click to tilt, OUT is HIGH while tilted
  const p = b.pin(el)
  let tilted = false
  const update = () => {
    el.style.transform = tilted ? 'rotate(-30deg)' : ''
    if (p) b.set(p, tilted)
  }
  b.on(el, 'click', () => {
    tilted = !tilted
    update()
  })
  b.runner.onStop.push(() => (el.style.transform = ''))
  update()
}

const pir: Part = (el, b) => {
  // click to simulate motion
  const p = b.pin(el)
  if (!p) return
  b.set(p, false)
  let active = false
  let inhibitUntil = 0
  let token = 0
  b.on(el, 'click', () => {
    if (active ? el.getAttribute('retrigger') === '0' : b.cycles < inhibitUntil) return
    active = true
    b.set(p, true)
    const t = ++token
    b.after(b.num(el, 'delayTime', 5) * 1e6, () => {
      if (t !== token) return
      active = false
      b.set(p, false)
      inhibitUntil = b.cycles + b.num(el, 'inhibitTime', 1.2) * b.runner.FREQ
    })
  })
}

const keypad: Part = (el, b) => {
  const rows = b.pins(el, 'pin-rows')
  const cols = b.pins(el, 'pin-cols')
  const pressed = new Set<string>()
  // a pressed key connects its row and column wire, an input pin follows a
  // connected output, otherwise its pull-up
  const level = (p: Pin, connected: Pin[]) => {
    let high = b.state(p) === PinState.InputPullUp
    for (const other of connected) {
      const state = b.state(other)
      if (state === PinState.Low) return false
      if (state === PinState.High) high = true
    }
    return high
  }
  const update = () => {
    rows.forEach((p, r) =>
      b.set(p, level(p, cols.filter((_, c) => pressed.has(`${r},${c}`))))
    )
    cols.forEach((p, c) =>
      b.set(p, level(p, rows.filter((_, r) => pressed.has(`${r},${c}`))))
    )
  }
  b.watch([...rows, ...cols], update)
  b.on(el, 'button-press', (e) => {
    pressed.add(`${e.detail.row},${e.detail.column}`)
    update()
  })
  b.on(el, 'button-release', (e) => {
    pressed.delete(`${e.detail.row},${e.detail.column}`)
    update()
  })
  update()
}

const encoder: Part = (el, b) => {
  const clk = b.pin(el, 'pin-clk')
  const dt = b.pin(el, 'pin-dt')
  let pressed = false
  const sw = b.contact(b.pin(el, 'pin-sw'), () => pressed, true)
  b.on(el, 'button-press', () => {
    pressed = true
    sw()
  })
  b.on(el, 'button-release', () => {
    pressed = false
    sw()
  })
  if (!clk || !dt) return

  // CLK and DT have pull-ups, clockwise: CLK goes low first, then DT
  b.set(clk, true)
  b.set(dt, true)
  let steps = 0
  let busy = false
  const step = () => {
    if (busy || !steps) return
    busy = true
    const [first, second] = steps > 0 ? [clk, dt] : [dt, clk]
    steps -= Math.sign(steps)
    const edges: Array<[Pin, boolean]> = [
      [first, false],
      [second, false],
      [first, true],
      [second, true],
    ]
    const next = (i: number) => {
      if (i === edges.length) {
        busy = false
        return step()
      }
      b.set(edges[i][0], edges[i][1])
      b.after(1000, () => next(i + 1))
    }
    next(0)
  }
  b.on(el, 'rotate-cw', () => {
    steps++
    step()
  })
  b.on(el, 'rotate-ccw', () => {
    steps--
    step()
  })
}

const dialer: Part = (el, b) => {
  // DIAL is closed (to GND) while dialing, PULSE opens once per pulse
  let dialing = false
  let pulse = false
  const dial = b.contact(b.pin(el, 'pin-dial'), () => dialing, true)
  const pulses = b.contact(b.pin(el, 'pin-pulse'), () => !pulse, true)
  b.on(el, 'dial', (e) => {
    const count = e.detail.digit || 10
    dialing = true
    dial()
    const next = (i: number) => {
      if (i === 2 * count) {
        dialing = false
        return dial()
      }
      pulse = i % 2 === 0
      pulses()
      b.after(pulse ? 60000 : 40000, () => next(i + 1)) // 10 pulses per second
    }
    b.after(100000, () => next(0))
  })
}

// ---------------------------------------------------------------- analog

const potentiometer: Part = (el, b) => {
  b.analog(b.pin(el), () => ((el.value - el.min) / (el.max - el.min)) * 5)
}

const joystick: Part = (el, b) => {
  // VERT: 5V at the top, HORZ: 5V at the left, SEL shorts to GND
  b.analog(b.pin(el, 'pin-vert'), () => ((el.yValue + 1) / 2) * 5)
  b.analog(b.pin(el, 'pin-horz'), () => ((el.xValue + 1) / 2) * 5)
  let pressed = false
  const sel = b.contact(b.pin(el, 'pin-sel'), () => pressed, true)
  b.on(el, 'button-press', () => {
    pressed = true
    sel()
  })
  b.on(el, 'button-release', () => {
    pressed = false
    sel()
  })
}

const photoresistor: Part = (el, b) => {
  // LDR in series with 10k, brighter light gives a lower voltage
  const volts = () => {
    const lux = Math.max(b.num(el, 'lux', 500), 1e-6)
    const r = b.num(el, 'rl10', 50) * 1e3 * Math.pow(10 / lux, b.num(el, 'gamma', 0.7))
    return (5 * r) / (r + 10000)
  }
  b.analog(b.pin(el), volts)
  const dout = b.pin(el, 'pin-do')
  el.ledPower = true
  return () => {
    const dark = volts() > b.num(el, 'threshold', 2.5)
    if (dout) b.set(dout, dark)
    el.ledDO = !dark
  }
}

const ntc: Part = (el, b) => {
  // 10k NTC in series with 10k, hotter gives a lower voltage
  b.analog(b.pin(el), () => {
    const kelvin = b.num(el, 'temperature', 24) + 273.15
    const r = Math.exp(b.num(el, 'beta', 3950) * (1 / kelvin - 1 / 298.15))
    return (5 * r) / (r + 1)
  })
}

const gasSensor: Part = (el, b) => {
  const volts = () => clamp((b.num(el, 'ppm', 400) / 10000) * 5, 0, 5)
  b.analog(b.pin(el), volts)
  const dout = b.pin(el, 'pin-do')
  el.ledPower = true
  return () => {
    const alarm = volts() > b.num(el, 'threshold', 4.4)
    if (dout) b.set(dout, !alarm)
    el.ledD0 = alarm
  }
}

/** flame and sound modules: level 0-1023 on AOUT, DOUT goes LOW above threshold */
function module(power: string, signal: string): Part {
  return (el, b) => {
    const level = () => clamp(b.num(el, 'level', 0), 0, 1023)
    b.analog(b.pin(el), () => (level() * 5) / 1023)
    const dout = b.pin(el, 'pin-do')
    el[power] = true
    return () => {
      const detected = level() > b.num(el, 'threshold', 512)
      if (dout) b.set(dout, !detected)
      el[signal] = detected
    }
  }
}

const heartBeat: Part = (el, b) => {
  b.analog(b.pin(el), () => {
    const beats = (b.cycles / b.runner.FREQ) * (b.num(el, 'bpm', 70) / 60)
    const phase = beats % 1
    return 2.5 + 2 * Math.exp(-Math.pow((phase - 0.2) / 0.03, 2))
  })
}

// ---------------------------------------------------------------- motors

const servo: Part = (el, b) => {
  const p = b.pin(el)
  if (!p) return
  let rise = -1
  let angle = el.angle
  b.watch(p, () => {
    if (b.high(p)) rise = b.cycles
    else if (rise >= 0) {
      const us = (b.cycles - rise) / 16
      rise = -1
      // Servo library defaults: 544µs → 0°, 2400µs → 180°
      if (us > 400 && us < 2800) angle = clamp(((us - 544) / (2400 - 544)) * 180, 0, 180)
    }
  })
  return () => {
    el.angle = angle
  }
}

/** decodes the coil currents A-, A+, B+, B- into the angle in degrees */
function stepper(b: Board, pins: Pin[]) {
  if (pins.length < 4) return () => 0
  const [am, ap, bp, bm] = pins
  let last = 3 // the rotor rests at step 0 of the Stepper library (1010)
  let halfSteps = 0
  let pending = false
  const evaluate = () => {
    pending = false
    const a = +b.high(ap) - +b.high(am)
    const c = +b.high(bp) - +b.high(bm)
    if (!a && !c) return
    const phase = Math.round(Math.atan2(c, a) / (Math.PI / 4)) & 7
    let delta = (last - phase) & 7
    if (delta > 4) delta -= 8
    halfSteps += delta
    last = phase
  }
  b.watch(pins, () => {
    // the pins of one step are written one after another, skip the in-between states
    if (!pending) b.after(50, evaluate)
    pending = true
  })
  return () => halfSteps * 0.9
}

const stepperMotor: Part = (el, b) => {
  const angle = stepper(b, b.pins(el))
  return () => {
    el.angle = angle()
  }
}

const biaxialStepper: Part = (el, b) => {
  const outer = stepper(b, b.pins(el, 'pin-outer'))
  const inner = stepper(b, b.pins(el, 'pin-inner'))
  return () => {
    el.outerHandAngle = outer()
    el.innerHandAngle = inner()
  }
}

// ---------------------------------------------------------------- protocols

const dht22: Part = (el, b) => {
  const p = b.pin(el)
  if (!p) return
  b.set(p, true) // pull-up on the module
  let lowSince = -1
  let lowTime = 0
  let busy = false
  b.watch(p, () => {
    const state = b.state(p)
    if (state === PinState.Low) {
      if (lowSince < 0) lowSince = b.cycles
      return
    }
    if (lowSince >= 0) {
      lowTime = (b.cycles - lowSince) / 16
      lowSince = -1
    }
    // start signal: host pulls low for ≥ 1ms, then releases the line
    if (!busy && lowTime >= 500 && state !== PinState.High) {
      lowTime = 0
      busy = true
      const humidity = Math.round(clamp(b.num(el, 'humidity', 40), 0, 100) * 10)
      const t = Math.round(b.num(el, 'temperature', 24) * 10)
      const temperature = t < 0 ? 0x8000 | -t : t
      const bytes = [humidity >> 8, humidity & 0xff, temperature >> 8, temperature & 0xff]
      bytes.push(bytes.reduce((sum, x) => sum + x) & 0xff)
      const steps: Array<[boolean, number]> = [[true, 30], [false, 80], [true, 80]]
      for (const byte of bytes)
        for (let i = 7; i >= 0; i--) steps.push([false, 50], [true, (byte >> i) & 1 ? 70 : 26])
      steps.push([false, 50])
      b.sequence(p, steps, () => {
        b.set(p, true)
        busy = false
      })
    }
  })
}

const ultrasonic: Part = (el, b) => {
  const trig = b.pin(el, 'pin-trig')
  const echo = b.pin(el, 'pin-echo')
  if (!trig || !echo) return
  b.set(echo, false)
  let rise = -1
  let busy = false
  b.watch(trig, () => {
    if (b.high(trig)) rise = b.cycles
    else if (rise >= 0) {
      const us = (b.cycles - rise) / 16
      rise = -1
      if (us < 8 || busy) return
      busy = true
      const cm = clamp(b.num(el, 'distance', 400), 2, 400)
      b.sequence(echo, [[false, 250], [true, cm * 58], [false, 0]], () => (busy = false))
    }
  })
}

const hx711: Part = (el, b) => {
  const dout = b.pin(el, 'pin-dt')
  const sck = b.pin(el, 'pin-sck')
  if (!dout || !sck) return
  b.set(dout, false) // LOW = data ready
  let ready = true
  let bit = 0
  let value = 0
  b.watch(sck, () => {
    if (!b.high(sck) || !ready) return
    if (bit === 0) value = Math.round(b.num(el, 'load', 0) * 420) & 0xffffff // 420 per kg
    if (bit < 24) {
      b.set(dout, !!((value >> (23 - bit)) & 1)) // MSB first, on the rising edge
      bit++
    } else {
      // 25th pulse: conversion starts, gain pulses 26/27 are ignored
      bit = 0
      ready = false
      b.set(dout, true)
      b.after(12500, () => {
        ready = true
        b.set(dout, false)
      }) // 80 samples per second
    }
  })
}

const irReceivers = new WeakMap<Board, Pin[]>()

const irReceiver: Part = (el, b) => {
  const p = b.pin(el)
  if (!p) return
  b.set(p, true) // idle HIGH, LOW while receiving the 38 kHz carrier
  irReceivers.set(b, [...(irReceivers.get(b) || []), p])
}

const irRemote: Part = (el, b) => {
  b.on(el, 'button-press', (e) => {
    // NEC frame, address 0, bytes are sent LSB first
    const command = e.detail.irCode & 0xff
    const steps: Array<[boolean, number]> = [[false, 9000], [true, 4500]]
    for (const byte of [0x00, 0xff, command, ~command & 0xff])
      for (let i = 0; i < 8; i++) steps.push([false, 562], [true, (byte >> i) & 1 ? 1687 : 562])
    steps.push([false, 562], [true, 0])
    for (const p of irReceivers.get(b) || []) b.sequence(p, steps)
  })
}

// ---------------------------------------------------------------- I2C & SPI

const ssd1306: Part = (el, b) => {
  const controller = new SSD1306Controller(() => b.millis())
  const addr = address(el, 0)
  for (const a of addr ? [addr] : [SSD1306_ADDR_32, SSD1306_ADDR_OTHER])
    b.i2c.registerDevice(a, controller)
  return () => {
    if (controller.update()) {
      controller.toImageData(el.imageData)
      el.redraw()
    }
  }
}

const lcd: Part = (el, b) => {
  const controller = new LCDController(el.cols || 16, el.rows || 2)
  b.i2c.registerDevice(address(el, LCD1602_ADDR), controller)
  return () => {
    const lcd = controller.update()
    if (!lcd) return
    el.characters = lcd.characters
    el.backlight = lcd.backlight
    el.cursor = lcd.cursor
    el.blink = lcd.blink
    el.cursorX = lcd.cursorX
    el.cursorY = lcd.cursorY
    if (lcd.cgramUpdated) {
      const font = el.font.slice(0)
      font.set(controller.cgram, 0)
      font.set(controller.cgram, 0x40)
      el.font = font
    }
  }
}

const ds1307: Part = (el, b) => {
  const controller = new DS1307Controller(() => b.millis(), el.getAttribute('initTime'))
  b.i2c.registerDevice(address(el, DS1307_ADDR), controller)
}

const mpu6050: Part = (el, b) => {
  const controller = new MPU6050Controller(() => ({
    accel: [b.num(el, 'accelX', 0), b.num(el, 'accelY', 0), b.num(el, 'accelZ', 1)],
    gyro: [b.num(el, 'rotationX', 0), b.num(el, 'rotationY', 0), b.num(el, 'rotationZ', 0)],
    temperature: b.num(el, 'temperature', 24),
  }))
  b.i2c.registerDevice(address(el, MPU6050_ADDR), controller)
  el.led1 = true
}

const ili9341: Part = (el, b) => {
  const dc = b.pin(el, 'pin-dc') || b.parse('9')[0]
  const cs = b.pin(el, 'pin-cs') || b.parse('10')[0]
  const controller = new ILI9341Controller(() => b.high(dc))
  b.spi(cs, controller)
  return () => {
    const canvas: HTMLCanvasElement | null = el.canvas
    if (canvas && controller.dirty) {
      controller.dirty = false
      canvas.getContext('2d')?.putImageData(controller.image, 0, 0)
    }
  }
}

const sdCard: Part = (el, b) => {
  b.spi(b.pin(el, 'pin-cs') || b.parse('10')[0], new SDCardController())
}

// ---------------------------------------------------------------- registry

export const parts: { [tag: string]: Part } = {
  'wokwi-led': led,
  'wokwi-rgb-led': rgbLed,
  'wokwi-led-bar-graph': barGraph,
  'wokwi-7segment': sevenSegment,
  'wokwi-buzzer': buzzer,
  'wokwi-neopixel': neopixels(
    () => 1,
    (el, color) => Object.assign(el, color(0))
  ),
  'wokwi-led-ring': neopixels(
    (el) => el.pixels,
    (el, color) => {
      for (let i = 0; i < el.pixels; i++) el.setPixel(i, color(i))
    }
  ),
  'wokwi-neopixel-matrix': neopixels(
    (el) => el.rows * el.cols,
    (el, color) => {
      for (let row = 0; row < el.rows; row++)
        for (let col = 0; col < el.cols; col++)
          el.setPixel(row, col, color(row * el.cols + col))
    }
  ),
  'wokwi-arduino-uno': arduino,
  'wokwi-arduino-nano': arduino,
  'wokwi-pushbutton': pushbutton,
  'wokwi-pushbutton-6mm': pushbutton,
  'wokwi-slide-switch': slideSwitch,
  'wokwi-dip-switch-8': dipSwitch,
  'wokwi-tilt-switch': tiltSwitch,
  'wokwi-pir-motion-sensor': pir,
  'wokwi-membrane-keypad': keypad,
  'wokwi-ky-040': encoder,
  'wokwi-rotary-dialer': dialer,
  'wokwi-potentiometer': potentiometer,
  'wokwi-slide-potentiometer': potentiometer,
  'wokwi-analog-joystick': joystick,
  'wokwi-photoresistor-sensor': photoresistor,
  'wokwi-ntc-temperature-sensor': ntc,
  'wokwi-gas-sensor': gasSensor,
  'wokwi-flame-sensor': module('ledPower', 'ledSignal'),
  'wokwi-small-sound-sensor': module('ledPower', 'ledSignal'),
  'wokwi-big-sound-sensor': module('led1', 'led2'),
  'wokwi-heart-beat-sensor': heartBeat,
  'wokwi-servo': servo,
  'wokwi-stepper-motor': stepperMotor,
  'wokwi-biaxial-stepper': biaxialStepper,
  'wokwi-dht22': dht22,
  'wokwi-hc-sr04': ultrasonic,
  'wokwi-hx711': hx711,
  'wokwi-ir-receiver': irReceiver,
  'wokwi-ir-remote': irRemote,
  'wokwi-ssd1306': ssd1306,
  'wokwi-lcd1602': lcd,
  'wokwi-lcd2004': lcd,
  'wokwi-ds1307': ds1307,
  'wokwi-mpu6050': mpu6050,
  'wokwi-ili9341': ili9341,
  'wokwi-microsd-card': sdCard,
  'avr-chart': avrChart,
}
