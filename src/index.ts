import '@wokwi/elements'
import { AVRRunner } from './execute'
import { Board } from './board'
import { parts } from './parts'
import { formatTime } from './format-time'
import { CPUPerformance } from './cpu-performance'

declare const window: any

// Arduino libraries that hexi.wokwi.com only installs when listed in libraries.txt
const LIBRARIES: { [header: string]: string } = {
  'Adafruit_SSD1306.h': 'Adafruit SSD1306',
  'Adafruit_ILI9341.h': 'Adafruit ILI9341',
  'Adafruit_MPU6050.h': 'Adafruit MPU6050',
  'IRremote.h': 'IRremote',
  'IRremote.hpp': 'IRremote',
  'Stepper.h': 'Stepper',
  'AccelStepper.h': 'AccelStepper',
  'HX711.h': 'HX711',
  'SD.h': 'SD',
}

async function compile(url: string, body: string) {
  if (!window.__AVR8jsCache) {
    window.__AVR8jsCache = {}
  }

  if (!window.__AVR8jsCache[body]) {
    const resp = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    window.__AVR8jsCache[body] = await resp.json()
  }

  return window.__AVR8jsCache[body]
}

// the last runner per container, so a new run stops the previous one
const running = new WeakMap<object, AVRRunner>()

window.AVR8js = {
  build: function (sketch: string, files: { name: string; content: string }[] = []) {
    const libraries = new Set<string>()
    for (const file of files.filter((f) => f.name === 'libraries.txt')) {
      file.content.split('\n').forEach((lib) => lib.trim() && libraries.add(lib.trim()))
    }
    for (const code of [sketch, ...files.map((f) => f.content)]) {
      for (const [, header] of (code || '').matchAll(/#include\s*[<"]([\w.]+)[>"]/g)) {
        if (LIBRARIES[header]) libraries.add(LIBRARIES[header])
      }
    }

    files = files.filter((f) => f.name !== 'libraries.txt')
    if (libraries.size) {
      files.push({ name: 'libraries.txt', content: [...libraries].join('\n') })
    }

    return compile('https://hexi.wokwi.com/build', JSON.stringify({ sketch, files }))
  },

  // hexi dropped its /asm endpoint. An empty sketch plus main.S works, as long
  // as main.S defines `main`: then the linker skips the main() of the Arduino core.
  buildASM: function (source: string) {
    return compile(
      'https://hexi.wokwi.com/build',
      JSON.stringify({ sketch: '', files: [{ name: 'main.S', content: source }] })
    )
  },

  execute: function (hex: string, log: (text: string) => void, id?: string) {
    const container = (id && document.getElementById(id)) || document

    running.get(container)?.stop()
    const runner = new AVRRunner(hex)
    running.set(container, runner)

    const board = new Board(runner)
    const frames: Array<() => void> = []
    const elements: Element[] = []
    for (const [tag, attach] of Object.entries(parts)) {
      container.querySelectorAll(tag).forEach((el) => {
        elements.push(el)
        const frame = attach(el, board)
        if (frame) frames.push(frame)
      })
    }

    // LiaScript removes the elements when leaving the slide
    const removed = () =>
      container instanceof Element
        ? !container.isConnected
        : elements.length > 0 && !elements.some((el) => el.isConnected)

    runner.usart.onByteTransmit = (value) => {
      board.serialActivity = true
      log(String.fromCharCode(value))
    }

    const timeSpan = container.querySelector('#simulation-time')
    const cpuPerf = new CPUPerformance(runner.cpu, runner.FREQ)

    runner.execute((cpu) => {
      if (removed()) return runner.stop()

      board.frame()
      frames.forEach((frame) => frame())
      board.serialActivity = false

      if (timeSpan) {
        const time = formatTime(cpu.cycles / runner.FREQ)
        const speed = (cpuPerf.update() * 100).toFixed(0)
        timeSpan.textContent = `Simulation time: ${time} (${speed}%)`
      }
    })

    return runner
  },
}
