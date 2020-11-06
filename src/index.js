import {
  avrInstruction,
  AVRTimer,
  CPU,
  timer0Config,
  AVRIOPort,
  portBConfig,
  portCConfig,
  portDConfig
} from 'avr8js';
import { AVRRunner } from "./execute";
import { formatTime } from "./format-time";

import {
  BuzzerElement,
  LEDElement,
  NeopixelMatrixElement
} from "@wokwi/elements";


window.AVR8js = {
  build: async function (string) {
    const resp = await fetch('https://hexi.wokwi.com/build', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sketch: string }),
    });
    return (await resp.json());
  },

  execute: function (hex, log, id, MHZ) {
    const container = document.getElementById(id) || document

    const LEDs = container.querySelectorAll("wokwi-led") || [];
    const SEG7 = container.querySelectorAll("wokwi-7segment") || [];
    const BUZZER = container.querySelectorAll("wokwi-buzzer") || [];

    let runner = new AVRRunner(hex);
    MHZ = MHZ || 16000000;

    // Hook to PORTB register
    runner.portD.addListener(value => {
      for (const led of LEDs) {
        if (led.getAttribute("port") == "D") {
          const pin = parseInt(led.getAttribute("pin"), 10);
          led.value = value & (1 << (pin - 8)) ? true : false;
        }
      }

      for (const e of BUZZER) {
        if (e.getAttribute("port") == "D") {
          const pin = parseInt(e.getAttribute("pin"), 10);
          e.hasSignal = value & (1 << (pin - 8)) ? true : false;
        }
      }

      for (const e of SEG7) {
        if (e.getAttribute("port") == "D") {
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
      }
    });
    runner.portB.addListener(value => {
      for (const led of LEDs) {
        if (led.getAttribute("port") == "B") {
          const pin = parseInt(led.getAttribute("pin"), 10);
          led.value = value & (1 << (pin - 8)) ? true : false;
        }
      }

      for (const e of BUZZER) {
        if (e.getAttribute("port") == "B") {
          const pin = parseInt(e.getAttribute("pin"), 10);
          e.hasSignal = value & (1 << (pin - 8)) ? true : false;
        }
      }

      for (const e of SEG7) {
        if (e.getAttribute("port") == "B") {
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
      }
    });
    // Serial port output support
    runner.usart.onLineTransmit = (value) => {
      log((value));
    };


    runner.execute(cpu => {
      const time = formatTime(cpu.cycles / MHZ);
      //statusLabel.textContent = "Simulation time: " + time;
    })

    return runner
  }


}
