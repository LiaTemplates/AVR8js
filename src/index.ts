import "@wokwi/elements";
import { AVRRunner, PORT } from "./execute";
import { formatTime } from "./format-time";
import {
  BuzzerElement,
  LEDElement,
  PushbuttonElement,
  SevenSegmentElement
} from "@wokwi/elements";


declare const window: any;

function pinPort(e) : [number | null, string | null]{
  const pin  = e.getAttribute("pin")
  const port = e.getAttribute("port")

  return [
    pin  ? parseInt(pin, 10)  : null,
    port
  ]
}


window.AVR8js = {
  build: async function (sketch:string, files = []) {
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
        body: body
      });
      const rslt = await resp.json()

      window.__AVR8jsCache[body] = rslt

      return rslt;
    }
  },

  execute: function (hex:string, log:any, id:string, MHZ: number | null) {
    const PORTS:Array<PORT> = ["B", "C", "D", "E", "F", "G", "H", "J", "K"]

    const container = document.getElementById(id) || document

    const LEDs: NodeListOf<LEDElement & HTMLElement> = container.querySelectorAll("wokwi-led");
    const SEG7 = container.querySelectorAll<SevenSegmentElement & HTMLElement>("wokwi-7segment");
    const BUZZER = container.querySelectorAll<BuzzerElement & HTMLElement>("wokwi-buzzer");
    const PushButton = container.querySelectorAll<PushbuttonElement & HTMLElement>("wokwi-pushbutton");

    const runner = new AVRRunner(hex);
    MHZ = MHZ || 16000000;

    for(const PORT of PORTS) {
      // Hook to PORTB register
      const port = runner.port.get(PORT)

      if(port) {
        PushButton.forEach (button => {
          const [pin, p] = pinPort(button)

          if (pin && p === PORT) {
            port.setPin(pin, true);

            button.addEventListener("button-press", () => {
              if (runner) {
                port.setPin(pin, false);
              }
            });

            button.addEventListener("button-release", () => {
              if (runner) {
                port.setPin(pin, true);
              }
            });
          }
        })

        port.addListener(value => {
          LEDs.forEach(e => {
            let [pin, p] = pinPort(e)

            if (pin && p === PORT) {
              e.value = value & (1 << (pin - 8)) ? true : false;
            }
          })

          BUZZER.forEach(e => {
            let [pin, p] = pinPort(e)

            if (pin && p === PORT) {
              e.hasSignal = value & (1 << (pin - 8)) ? true : false;
            }
          })

          SEG7.forEach(e => {
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
                value & 256
              ]
            }
          })
        });
      }
    }

    // Serial port output support
    runner.usart.onLineTransmit = (value) => {
      log((value));
    };


    const timeSpan = container.querySelector("#simulation-time")
    runner.execute(cpu => {
      const time = formatTime(cpu.cycles / MHZ);
      if(timeSpan)
        timeSpan.textContent = "Simulation time: " + time;
    })

    return runner
  }


}
