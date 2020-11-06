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

  execute: function (hex, log, MHZ) {
    let runner = new AVRRunner(hex);
    MHZ = MHZ || 16000000;

    // Hook to PORTB register
    runner.portD.addListener(value => {
      log(value)
      //updateLEDs(value, 0);
    });
    runner.portB.addListener(value => {
      log(value)
      //updateLEDs(value, 8);
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
