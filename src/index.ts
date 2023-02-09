import '@wokwi/elements'
import { AVRRunner, PORT } from './execute'
import { formatTime } from './format-time'
//import { WS2812Controller } from "./ws2812";
import { CPUPerformance } from './cpu-performance'
import { PinState } from 'avr8js'
import {
  BuzzerElement,
  LEDElement,
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
    pin = pin - 8
    port = 'B'
  } else if (pin < 24) {
    pin = pin - 16
    port = 'C'
  } else {
    port = null
  }

  return [pin, port]
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
    const resp = await fetch('https://hexi.wokwi.com/asm', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source }),
    })
    return await resp.json()
  },

  execute: function (hex: string, log: any, id: string, MHZ: any) {
    const PORTS: Array<PORT> = ['B', 'C', 'D']

    const container = document.getElementById(id) || document

    const LEDs: Array<LEDElement & HTMLElement> = Array.from(
      container.querySelectorAll('wokwi-led') || []
    )
    const SEG7: Array<SevenSegmentElement & HTMLElement> = Array.from(
      container.querySelectorAll<SevenSegmentElement & HTMLElement>(
        'wokwi-7segment'
      ) || []
    )
    const BUZZER: Array<BuzzerElement & HTMLElement> = Array.from(
      container.querySelectorAll<BuzzerElement & HTMLElement>('wokwi-buzzer') ||
        []
    )

    const PushButton: Array<PushbuttonElement & HTMLElement> = Array.from(
      container.querySelectorAll<PushbuttonElement & HTMLElement>(
        'wokwi-pushbutton'
      ) || []
    )

    const runner = new AVRRunner(hex)

    MHZ = MHZ || 16000000

    for (const PORT of PORTS) {
      // Hook to PORTB register
      const port = runner.port.get(PORT)

      if (port) {
        PushButton.forEach((button) => {
          const [pin, p] = pinPort(button)

          if (typeof pin === 'number' && p === PORT) {
            port.setPin(pin % 8, false)

            button.addEventListener('button-press', () => {
              if (runner) {
                port.setPin(pin % 8, true)
              }
            })

            button.addEventListener('button-release', () => {
              if (runner) {
                port.setPin(pin % 8, false)
              }
            })
          }
        })

        port.addListener((value) => {
          LEDs.forEach((e) => {
            let [pin, p] = pinPort(e)

            if (pin && p === PORT) {
              e.value = runner.port.get(p)?.pinState(pin) === PinState.High
            }
          })

          BUZZER.forEach((e) => {
            let [pin, p] = pinPort(e)

            if (pin && p === PORT) {
              e.hasSignal = value & (1 << (pin - 8)) ? true : false
            }
          })

          SEG7.forEach((e) => {
            let [pin, p] = pinPort(e)

            if (pin && p === PORT) {
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
        })
      }
    }

    // Serial port output support
    runner.usart.onByteTransmit = (value) => {
      log(String.fromCharCode(value))
    }

    const timeSpan = container.querySelector('#simulation-time')
    if (timeSpan) {
      const cpuPerf = new CPUPerformance(runner.cpu, MHZ)
      runner.execute((cpu) => {
        const time = formatTime(cpu.cycles / MHZ)
        const speed = (cpuPerf.update() * 100).toFixed(0)
        if (timeSpan)
          timeSpan.textContent = `Simulation time: ${time} (${speed}%)`
      })
    }

    return runner
  },
}
