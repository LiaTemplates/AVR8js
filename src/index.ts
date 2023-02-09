import '@wokwi/elements'
import { AVRRunner, PORT } from './execute'
import { formatTime } from './format-time'
//import { WS2812Controller } from "./ws2812";
import { CPUPerformance } from './cpu-performance'
import { PinState } from 'avr8js'
import { WS2812Controller } from './ws2812'

import {
  BuzzerElement,
  LEDElement,
  NeopixelMatrixElement,
  PushbuttonElement,
  SevenSegmentElement,
} from '@wokwi/elements'

declare const window: any

function pinPort(e: any): [number | null, string | null] {
  let port: PORT | null
  let pin = e.getAttribute('pin')
  pin = pin ? parseInt(pin, 10) : null

  if (pin == null) {
    port = null
  } else if (pin < 8) {
    port = 'D'
  } else if (pin < 16) {
    port = 'B'
  } else if (pin < 24) {
    port = 'C'
  } else {
    port = null
  }

  return [pin % 8, port]
}

window.AVR8js = {
  build: async function (sketch: string, files = []) {
    if (!window.__AVR8jsCache) {
      window.__AVR8jsCache = {}
    }

    let body = JSON.stringify({ sketch: sketch, files })

    if (window.__AVR8jsCache[body]) {
      return window.__AVR8jsCache[body]
    } else {
      const resp = await fetch('https://hexi.wokwi.com/build', {
        method: 'POST',
        mode: 'cors',
        cache: 'force-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
      const rslt = await resp.json()

      window.__AVR8jsCache[body] = rslt

      return rslt
    }
  },

  buildASM: async function asmToHex(source: string) {
    if (!window.__AVR8jsCache) {
      window.__AVR8jsCache = {}
    }

    let body = JSON.stringify({ files: [{ name: 'main.S', content: source }] })

    if (window.__AVR8jsCache[body]) {
      return window.__AVR8jsCache[body]
    } else {
      const resp = await fetch('https://hexi.wokwi.com/asm', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })

      const rslt = await resp.json()

      window.__AVR8jsCache[body] = rslt

      return rslt
    }
  },

  execute: function (hex: string, log: any, id: string, MHZ: any) {
    const PORTS: Array<PORT> = ['B', 'C', 'D']

    MHZ = MHZ || 16000000
    const cpuNanos = () => Math.round((runner.cpu.cycles / MHZ) * 1000000000)

    const container = document.getElementById(id) || document

    const LEDs: Array<LEDElement & HTMLElement> = Array.from(
      container?.querySelectorAll('wokwi-led') || []
    )
    const SEG7: Array<SevenSegmentElement & HTMLElement> = Array.from(
      container?.querySelectorAll<SevenSegmentElement & HTMLElement>(
        'wokwi-7segment'
      ) || []
    )
    const BUZZER: Array<BuzzerElement & HTMLElement> = Array.from(
      container?.querySelectorAll<BuzzerElement & HTMLElement>(
        'wokwi-buzzer'
      ) || []
    )

    const PushButton: Array<PushbuttonElement & HTMLElement> = Array.from(
      container?.querySelectorAll<PushbuttonElement & HTMLElement>(
        'wokwi-pushbutton'
      ) || []
    )

    const NeoMatrix: Array<NeopixelMatrixElement & HTMLElement> = Array.from(
      container?.querySelectorAll<NeopixelMatrixElement & HTMLElement>(
        'wokwi-neopixel-matrix'
      ) || []
    )

    const NeoMatrixController: WS2812Controller[] = []
    NeoMatrix.forEach((matrix) => {
      NeoMatrixController.push(new WS2812Controller(matrix.cols * matrix.rows))
    })

    const runner = new AVRRunner(hex)

    for (const PORT of PORTS) {
      // Hook to PORTB register
      const port = runner.port.get(PORT)

      if (port) {
        PushButton.forEach((button) => {
          const [pin, p] = pinPort(button)

          if (typeof pin === 'number' && p === PORT) {
            port.setPin(pin, false)

            button.addEventListener('button-press', () => {
              if (runner) {
                port.setPin(pin, true)
              }
            })

            button.addEventListener('button-release', () => {
              if (runner) {
                port.setPin(pin, false)
              }
            })
          }
        })

        port.addListener((value) => {
          LEDs.forEach((e) => {
            let [pin, p] = pinPort(e)

            if (typeof pin === 'number' && p === PORT) {
              e.value = runner.port.get(p)?.pinState(pin) === PinState.High
            }
          })

          BUZZER.forEach((e) => {
            let [pin, p] = pinPort(e)

            if (typeof pin === 'number' && p === PORT) {
              e.hasSignal = runner.port.get(p)?.pinState(pin) || false
            }
          })

          SEG7.forEach((e) => {
            let [pin, p] = pinPort(e)

            if (typeof pin === 'number' && p === PORT) {
              e.values = [
                value & 1,
                value & 2,
                value & 4,
                value & 16,
                value & 32,
                value & 64,
                value & 128,
                value & 256,
              ]
            }
          })

          for (let i = 0; i < NeoMatrix.length; i++) {
            let [pin, p] = pinPort(NeoMatrix[i])

            if (typeof pin === 'number' && p === PORT) {
              NeoMatrixController[i]?.feedValue(
                // @ts-ignore
                runner.port.get(p)?.pinState(pin),
                cpuNanos()
              )
            }
          }
        })
      }
    }

    // Serial port output support
    runner.usart.onByteTransmit = (value) => {
      log(String.fromCharCode(value))
    }

    const timeSpan = container?.querySelector('#simulation-time')

    const cpuPerf = new CPUPerformance(runner.cpu, MHZ)

    runner.execute((cpu) => {
      const time = formatTime(cpu.cycles / MHZ)
      const speed = (cpuPerf.update() * 100).toFixed(0)
      if (timeSpan)
        timeSpan.textContent = `Simulation time: ${time} (${speed}%)`

      for (let i = 0; i < NeoMatrix.length; i++) {
        let pixels = NeoMatrixController[i]?.update(cpuNanos())

        if (pixels) {
          for (let row = 0; row < NeoMatrix[i].rows; row++) {
            for (let col = 0; col < NeoMatrix[i].cols; col++) {
              const value = pixels[row * NeoMatrix[i].cols + col]
              NeoMatrix[i].setPixel(row, col, {
                b: (value & 0xff) / 255,
                r: ((value >> 8) & 0xff) / 255,
                g: ((value >> 16) & 0xff) / 255,
              })
            }
          }
        }
      }
    })

    return runner
  },
}
