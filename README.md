<!--
author:   André Dietrich

email:    LiaScript@web.de

version:  0.2.0

language: en

narrator: US English Male

comment:  LiaScript template for the AVR8js simulator.

script:   dist/index.js

@AVR8js.sketch: @AVR8js.project(@0,sketch.ino)

@AVR8js.control
<script modify="false" style="display: block">
(([id, attr, min, max, value]) =>
`HTML: <label>${attr}: <input type="range" min="${min}" max="${max}" value="${value}" step="any"
  oninput="let v = Math.round(this.value * 100) / 100;
           document.getElementById('${id}').setAttribute('${attr}', v);
           this.nextElementSibling.value = v"> <output>${value}</output></label>`
)(["@0", "@1", "@2", "@3", "@4"].map((s) => s.trim()))
</script>
@end

@AVR8js.project
<script>
let id = "@0"

let name = [
  "@1", "@2", "@3", "@4", "@5", "@6", "@7", "@8", "@9"
  ]
  .map((e) => e.trim())
  .filter((e) => { return (e[0] !== '@' && e !== "") })

let content = [
  `@input(0)`,
  `@input(1)`,
  `@input(2)`,
  `@input(3)`,
  `@input(4)`,
  `@input(5)`,
  `@input(6)`,
  `@input(7)`,
  `@input(8)`,
  `@input(9)`
  ]

let sketch;
let files = []

for(let i=0; i<name.length; i++) {
  if (name[i] == "sketch.ino") {
    sketch = content[i]
  } else {
    files.push({name: name[i], content: content[i]})
  }
}

AVR8js.build(sketch, files)
   .then((e) => {
     if (!e.hex) {
       let msgs = name.map(() => [])

       for (const err of (e.stderr || "").matchAll(/([\w.-]+):(\d+):(\d+): ([^:\n]+):(.+)/g)) {
         let file = name.indexOf(err[1])
         if (file >= 0) {
           msgs[file].push({
             row :    parseInt(err[2]) - 1,
             column : parseInt(err[3]),
             text :   err[5],
             type :   err[4].includes("error") ? "error" : err[4].includes("warning") ? "warning" : "info"
           })
         }
       }
       send.lia(e.stderr || "build failed", msgs, false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       let runner = AVR8js.execute(e.hex, console.stream, id)

       // the simulation stops itself, if its elements are removed
       runner.onStop.push(() => {
         if (runner) {
           runner = null
           send.lia("LIA: stop")
         }
       })

       send.handle("input", (input) => {
          if (runner) runner.serial(input.slice(0, -1))
       })

       send.lia("LIA: terminal")

       send.handle("stop", e => {
         if(runner) {
           let r = runner
           runner = null
           r.stop()
           console.debug("execution stopped")
         }
       })
     }
   })
   .catch((e) => {
     console.error(e.message)
     send.lia("LIA: stop")
   })
"LIA: wait"
</script>

@end


@AVR8js.asm
<script>
let id = "@0"

AVR8js.buildASM(`@input`)
   .then((e) => {
     if (!e.hex) {
       let msgs = []

       for (const err of (e.stderr || "").matchAll(/main\.S:(\d+):(?:(\d+):)? (\w+): (.+)/g)) {
         msgs.push({
           row :    parseInt(err[1]) - 1,
           column : parseInt(err[2] || 0),
           text :   err[4],
           type :   err[3].toLowerCase()
         })
       }
       send.lia(e.stderr || "build failed", [msgs], false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       let runner = AVR8js.execute(e.hex, console.stream, id)

       // the simulation stops itself, if its elements are removed
       runner.onStop.push(() => {
         if (runner) {
           runner = null
           send.lia("LIA: stop")
         }
       })

       send.handle("input", (input) => {
          if (runner) runner.serial(input.slice(0, -1))
       })

       send.lia("LIA: terminal")

       send.handle("stop", e => {
         if(runner) {
           let r = runner
           runner = null
           r.stop()
           console.debug("execution stopped")
         }
       })
     }
   })
   .catch((e) => {
     console.error(e.message)
     send.lia("LIA: stop")
   })
"LIA: wait"
</script>

@end

-->

[![LiaScript](https://raw.githubusercontent.com/LiaScript/LiaScript/master/badges/course.svg)](https://LiaScript.github.io/course/?https://raw.githubusercontent.com/LiaTemplates/AVR8js/main/README.md)

# AVR8js - Template

          --{{0}}--
This document defines some basic macros for integrating the Arduino Simulator
[AVR8js](https://github.com/wokwi/avr8js) into
[LiaScript](https://LiaScript.github.io) and to make Markdown code-blocks
executable. The hardware parts are the
[wokwi-elements](https://github.com/wokwi/wokwi-elements) web components, most
of them are connected to the simulated Arduino Uno (ATmega328p).

__Try it on LiaScript:__

https://liascript.github.io/course/?https://raw.githubusercontent.com/liaTemplates/AVR8js/main/README.md

__See the project on Github:__

https://github.com/liaTemplates/AVR8js

          --{{1}}--
There are three ways to use this template. The easiest way is to use the
`import` statement and the url of the raw text-file of the master branch or any
other branch or version. But you can also copy the required functionionality
directly into the header of your Markdown document, see therefor the [last
slide](#implementation). And of course, you could also clone this project and
change it, as you wish.

           {{1}}
1. Load the macros via

   `import: https://raw.githubusercontent.com/liaTemplates/AVR8js/main/README.md`

2. Copy the definitions into your Project

3. Clone this repository on GitHub


## `@AVR8js.sketch`

If you only have a simple sketch-file that you want to execute, then simply
add `@AVR8js.sketch` to the end of your code-block, to make it executable and
editable. All errors within your code will be displayed in the terminal as well
as in the editor. Serial.IO is already connected.

```` markdown
``` cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
   while (Serial.available() > 0 ) {

     String str = Serial.readString();

     if (str.equals("send")) {
        Serial.println("identified");
     } else {
        Serial.println("unknown");
     }
   }
}
```
@AVR8js.sketch
````

The project tries to attach all pins of your wokwi-webcomponents automatically
to the simulation, based on the defined pins (see [Wiring](#wiring)). If you
want to run multiple simulations on one side, you can hide the relevant
wokwi-elements within a div or span and pass the id of that element to
`@AVR8js.sketch`. If you do not pass an id, all visible elements within a
section will be attached to the simulation. If an element with the id
`simulation-time` is present, this element will be updated with the current
simulation time.


```` markdown
<div id="example">
<wokwi-led color="red"   pin="13" label="13"></wokwi-led>
<wokwi-led color="green" pin="12" label="12"></wokwi-led>
<wokwi-led color="blue"  pin="11" label="11"></wokwi-led>
<wokwi-led color="blue"  pin="10" label="10"></wokwi-led>
<span id="simulation-time"></span>
</div>

``` cpp
byte leds[] = {13, 12, 11, 10};
void setup() {
  Serial.begin(115200);
  for (byte i = 0; i < sizeof(leds); i++) {
    pinMode(leds[i], OUTPUT);
  }
}

int i = 0;
void loop() {
  Serial.print("LED: ");
  Serial.println(i);
  digitalWrite(leds[i], HIGH);
  delay(250);
  digitalWrite(leds[i], LOW);
  i = (i + 1) % sizeof(leds);
}
```
@AVR8js.sketch(example)
````

## `@AVR8js.project`


If you have a more complex example, you can also create a LiaScript project by
defining multiple code blocks, the names in the head are optional, but the the
naming in the `@AVR8js.project` has to match your code blocks and one
`sketch.ino` file must exist. Checkout the last section for a more complex
example.


```` markdown
<div id="example">
<wokwi-led color="red"   pin="13" label="13"></wokwi-led>
...
</div>

``` cpp      params.h
byte leds[] = {13, 12, 11, 10};
```
``` cpp      sketch.ino
#include "params.h"
void setup() {
  Serial.begin(115200);
  for (byte i = 0; i < sizeof(leds); i++) {
    pinMode(leds[i], OUTPUT);
  }
}

int i = 0;
void loop() {
  Serial.print("LED: ");
  Serial.println(i);
  digitalWrite(leds[i], HIGH);
  delay(250);
  digitalWrite(leds[i], LOW);
  i = (i + 1) % sizeof(leds);
}
```
@AVR8js.project(example,params.h,sketch.ino)
````

The code is compiled on https://hexi.wokwi.com, which comes with many Arduino
libraries (`Servo`, `DHT`, `Keypad`, `LiquidCrystal_I2C`, `FastLED`,
`Adafruit_NeoPixel`, `RTClib`, ...). Some libraries have to be requested
explicitly. For `Adafruit_SSD1306.h`, `Adafruit_ILI9341.h`,
`Adafruit_MPU6050.h`, `IRremote.h(pp)`, `Stepper.h`, `AccelStepper.h`, `HX711.h`
and `SD.h` this is done automatically. For any other library, add a file
`libraries.txt` to your project, with one library name per line, as it is used
in the Arduino library manager:

```` markdown
``` cpp      sketch.ino
#include <Bounce2.h>
...
```
``` text    -libraries.txt
Bounce2
```
@AVR8js.project( ,sketch.ino,libraries.txt)
````

## `@AVR8js.asm`

Use `@AVR8js.asm` or `@AVR8js.asm(id)` to run AVR assembly. The code is
assembled with the GNU assembler (avr-gcc), so you can use the C preprocessor
and `#include <avr/io.h>` for the register names. Use `_SFR_IO_ADDR()` for
instructions that address the I/O space (`in`, `out`, `sbi`, `cbi`, ...). The
program starts at the label `main`, which has to be declared as `.global`.

<div id="asm-example">
<wokwi-led color="red" pin="13" label="13"></wokwi-led>
<span id="simulation-time"></span>
</div>

``` asm
; Blink the LED on pin 13 (PB5)
#include <avr/io.h>

.global main
main:
  sbi   _SFR_IO_ADDR(DDRB), 5   ; pin 13 as output

loop:
  sbi   _SFR_IO_ADDR(PINB), 5   ; writing a 1 to PINB toggles PORTB5
  rcall wait
  rjmp  loop

; 41 * 256 * 256 * 3 cycles ≈ 8,000,000 cycles = 0.5s at 16 MHz
wait:
  ldi   r20, 41
wait_outer:
  ldi   r19, 0                  ; 0 means 256 iterations
wait_middle:
  ldi   r18, 0
wait_inner:
  dec   r18
  brne  wait_inner
  dec   r19
  brne  wait_middle
  dec   r20
  brne  wait_outer
  ret
```
@AVR8js.asm(asm-example)

## Wiring

Every wokwi-element within the container is connected to the simulated Arduino
Uno by its attributes:

* `pin="13"` is the main pin of a part. Digital pins are `0` - `13`, analog
  pins are `A0` - `A5` (or `14` - `19`).
* Parts with several data lines take a list, like `pin="2,3,4"`, or one
  attribute per line, like `pin-trig="3" pin-echo="2"`.
* Sensor values are attributes too, such as `temperature="24"`. They are read
  while the simulation runs, so you can change them with
  `@AVR8js.control(element-id, attribute, min, max, value)`, which creates a
  slider:

  ```` markdown
  <wokwi-dht22 id="my-dht" pin="2"></wokwi-dht22>

  @AVR8js.control(my-dht, temperature, -40, 80, 24)
  ````

* Buttons and switches behave like real ones: they connect the pin to GND if
  the pin is an `INPUT_PULLUP` (pressed is `LOW`) and to VCC with a pull-down
  resistor if the pin is an `INPUT` (pressed is `HIGH`). Unconnected
  `INPUT_PULLUP` pins read `HIGH`, unconnected analog pins return noise.
* I2C parts use their default address, you can change it with
  `address="0x69"`.
* SPI parts use the hardware SPI pins 11 (MOSI), 12 (MISO), 13 (SCK) and their
  own chip select pin `pin-cs`.

<!-- data-type="none" -->
| Part                                                                                   | Attributes                                                                                                     |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`wokwi-led`](#led)                                                                    | `pin` (PWM sets the brightness)                                                                                |
| [`wokwi-rgb-led`](#rgb-led)                                                            | `pin-r`, `pin-g`, `pin-b`, `common="anode"` (default, `LOW` is on) or `"cathode"`                              |
| [`wokwi-led-bar-graph`](#led-bar-graph)                                                | `pin` list with up to 10 pins                                                                                  |
| [`wokwi-7segment`](#7-segment)                                                         | `pin` list A, B, C, D, E, F, G, DP, `pin-digits` list for multiplexed displays, `common="anode"` or `"cathode"` |
| [`wokwi-buzzer`](#buzzer)                                                              | `pin`, `volume` (0 - 1)                                                                                        |
| [`wokwi-pushbutton`, `wokwi-pushbutton-6mm`](#pushbuttons)                             | `pin`                                                                                                          |
| [`wokwi-slide-switch`](#switches)                                                      | `pin` (the common pin 2, left is `LOW`, right is `HIGH`)                                                       |
| [`wokwi-dip-switch-8`](#switches)                                                      | `pin` list with 8 pins                                                                                         |
| [`wokwi-tilt-switch`](#switches)                                                       | `pin`, click to tilt                                                                                           |
| [`wokwi-pir-motion-sensor`](#pir-motion-sensor)                                        | `pin`, `delayTime` (5 s), `inhibitTime` (1.2 s), `retrigger`, click to move                                    |
| [`wokwi-potentiometer`, `wokwi-slide-potentiometer`](#potentiometer)                   | `pin` (analog)                                                                                                 |
| [`wokwi-analog-joystick`](#analog-joystick)                                            | `pin-vert`, `pin-horz` (analog), `pin-sel`                                                                     |
| [`wokwi-photoresistor-sensor`](#photoresistor-and-ntc)                                 | `pin` (AO), `pin-do`, `lux` (500), `threshold` (2.5 V), `rl10` (50), `gamma` (0.7)                             |
| [`wokwi-ntc-temperature-sensor`](#photoresistor-and-ntc)                               | `pin`, `temperature` (24 °C), `beta` (3950)                                                                    |
| [`wokwi-gas-sensor`](#gas-flame-sound-and-heart-beat)                                  | `pin` (AO), `pin-do`, `ppm` (400), `threshold` (4.4 V)                                                         |
| [`wokwi-flame-sensor`, `wokwi-small-sound-sensor`, `wokwi-big-sound-sensor`](#gas-flame-sound-and-heart-beat) | `pin` (AO), `pin-do`, `level` (0 - 1023), `threshold` (512)                                                    |
| [`wokwi-heart-beat-sensor`](#gas-flame-sound-and-heart-beat)                           | `pin`, `bpm` (70)                                                                                              |
| [`wokwi-servo`](#servo)                                                                | `pin`                                                                                                          |
| [`wokwi-stepper-motor`](#stepper-motor)                                                | `pin` list A-, A+, B+, B-                                                                                      |
| [`wokwi-biaxial-stepper`](#stepper-motor)                                              | `pin-outer`, `pin-inner` lists A-, A+, B+, B-                                                                  |
| [`wokwi-neopixel`, `wokwi-led-ring`, `wokwi-neopixel-matrix`](#neopixel)               | `pin`                                                                                                          |
| [`wokwi-dht22`](#dht22)                                                                | `pin`, `temperature` (24 °C), `humidity` (40 %)                                                                |
| [`wokwi-hc-sr04`](#hc-sr04)                                                            | `pin-trig`, `pin-echo`, `distance` (400 cm)                                                                    |
| [`wokwi-membrane-keypad`](#membrane-keypad)                                            | `pin-rows`, `pin-cols`                                                                                         |
| [`wokwi-ky-040`](#rotary-encoder-ky-040)                                               | `pin-clk`, `pin-dt`, `pin-sw`                                                                                  |
| [`wokwi-rotary-dialer`](#rotary-dialer)                                                | `pin-dial`, `pin-pulse`                                                                                        |
| [`wokwi-ir-receiver`, `wokwi-ir-remote`](#ir-remote)                                   | `pin` (receiver), the remote sends NEC codes to all receivers                                                  |
| [`wokwi-hx711`](#hx711-load-cell)                                                      | `pin-dt`, `pin-sck`, `load` (kg)                                                                               |
| [`wokwi-lcd1602`, `wokwi-lcd2004`](#lcd1602-and-lcd2004)                               | I2C `0x27`                                                                                                     |
| [`wokwi-ssd1306`](#ssd1306)                                                            | I2C `0x3C` and `0x3D`                                                                                          |
| [`wokwi-ds1307`](#ds1307-real-time-clock)                                              | I2C `0x68`, `initTime` (`now`, `0` or an ISO date)                                                             |
| [`wokwi-mpu6050`](#mpu6050)                                                            | I2C `0x68`, `accelX`, `accelY`, `accelZ` (g), `rotationX`, `rotationY`, `rotationZ` (°/s), `temperature`       |
| [`wokwi-ili9341`](#ili9341)                                                            | SPI, `pin-cs` (10), `pin-dc` (9)                                                                               |
| [`wokwi-microsd-card`](#microsd-card)                                                  | SPI, `pin-cs` (10), an empty 8 MB FAT16 card                                                                   |
| [`wokwi-arduino-uno`, `wokwi-arduino-nano`](#arduino-boards)                           | shows the LED on pin 13, the TX LED and the power LED                                                          |

Other elements are shown, but not simulated: `wokwi-resistor`,
`wokwi-ks2e-m-dc5` (relay), and the boards `wokwi-arduino-mega`,
`wokwi-esp32-devkit-v1`, `wokwi-nano-rp2040-connect` and `wokwi-franzininho`,
which have a different microcontroller.

> __Changes in version 0.1.0:__ Buttons are no longer inverted (with
> `INPUT_PULLUP` a pressed button reads `LOW`), the pins 14 - 19 are A0 - A5
> as on the Arduino Uno, `wokwi-7segment` and `wokwi-rgb-led` are common
> anode by default, as on wokwi.com, and assembly programs start at `main`.

## Examples

### Serial.read

Type `send` into the terminal.

``` cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
   while (Serial.available() > 0 ) {

     String str = Serial.readString();

     if (str.equals("send")) {
        Serial.println("identified");
     } else {
        Serial.println("unknown");
     }
   }
}
```
@AVR8js.sketch

### LED

<div id="led-example">
<wokwi-led color="red"   pin="13" label="13"></wokwi-led>
<wokwi-led color="green" pin="12" label="12"></wokwi-led>
<wokwi-led color="blue"  pin="11" label="11 (PWM)"></wokwi-led>
<span id="simulation-time"></span>
</div>

``` cpp
void setup() {
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  digitalWrite(12, LOW);
  for (int brightness = 0; brightness < 256; brightness += 5) {
    analogWrite(11, brightness);
    delay(20);
  }

  digitalWrite(13, LOW);
  digitalWrite(12, HIGH);
  for (int brightness = 255; brightness >= 0; brightness -= 5) {
    analogWrite(11, brightness);
    delay(20);
  }
}
```
@AVR8js.sketch(led-example)

### RGB-LED

<div id="rgb-example">
<wokwi-rgb-led pin-r="9" pin-g="10" pin-b="11"></wokwi-rgb-led>
</div>

``` cpp
// common anode: 0 is full brightness, 255 is off
void setColor(int red, int green, int blue) {
  analogWrite(9, 255 - red);
  analogWrite(10, 255 - green);
  analogWrite(11, 255 - blue);
}

void setup() { }

void loop() {
  setColor(255, 0, 0);   delay(500);
  setColor(0, 255, 0);   delay(500);
  setColor(0, 0, 255);   delay(500);
  setColor(255, 255, 0); delay(500);
  setColor(0, 255, 255); delay(500);
  setColor(128, 0, 255); delay(500);
}
```
@AVR8js.sketch(rgb-example)

### LED-Bar-Graph

Turn the potentiometer.

<div id="bar-example">
<wokwi-led-bar-graph color="GYR" pin="2,3,4,5,6,7,8,9,10,11"></wokwi-led-bar-graph>
<wokwi-potentiometer pin="A0" value="600"></wokwi-potentiometer>
</div>

``` cpp
const int leds[] = {2, 3, 4, 5, 6, 7, 8, 9, 10, 11};

void setup() {
  for (int pin : leds) {
    pinMode(pin, OUTPUT);
  }
}

void loop() {
  int level = map(analogRead(A0), 0, 1023, 0, 10);
  for (int i = 0; i < 10; i++) {
    digitalWrite(leds[i], i < level);
  }
}
```
@AVR8js.sketch(bar-example)

### 7-Segment

The segments A - G and DP are listed in the `pin` attribute. With
`common="cathode"` a segment is on if its pin is `HIGH`, with the default
`common="anode"` it is on if its pin is `LOW`.

<div id="7segment-example">
<wokwi-7segment common="cathode" pin="2,3,4,5,6,7,8,9"></wokwi-7segment>
</div>

``` cpp
// segments A, B, C, D, E, F, G on the pins 2 - 8, DP on pin 9
const byte digits[10] = {
  0b0111111, 0b0000110, 0b1011011, 0b1001111, 0b1100110,
  0b1101101, 0b1111101, 0b0000111, 0b1111111, 0b1101111
};

void setup() {
  for (int pin = 2; pin <= 9; pin++) {
    pinMode(pin, OUTPUT);
  }
}

int n = 0;
void loop() {
  for (int segment = 0; segment < 7; segment++) {
    digitalWrite(2 + segment, bitRead(digits[n], segment));
  }
  digitalWrite(9, n % 2);
  n = (n + 1) % 10;
  delay(500);
}
```
@AVR8js.sketch(7segment-example)

Displays with several digits share the segment pins. Every digit has its own
common pin, listed in `pin-digits`, and the sketch shows one digit after the
other.

<div id="7segment4-example">
<wokwi-7segment digits="4" common="cathode" pin="2,3,4,5,6,7,8" pin-digits="9,10,11,12"></wokwi-7segment>
</div>

``` cpp
// segments A - G on the pins 2 - 8, digits 1 - 4 on the pins 9 - 12
// common cathode: a digit is on if its pin is LOW
const byte digits[10] = {
  0b0111111, 0b0000110, 0b1011011, 0b1001111, 0b1100110,
  0b1101101, 0b1111101, 0b0000111, 0b1111111, 0b1101111
};
const int power[4] = {1000, 100, 10, 1};

void setup() {
  for (int pin = 2; pin <= 12; pin++) {
    pinMode(pin, OUTPUT);
  }
}

void loop() {
  int value = (millis() / 100) % 10000;
  for (int d = 0; d < 4; d++) {
    for (int pin = 9; pin <= 12; pin++) {
      digitalWrite(pin, HIGH);
    }
    for (int segment = 0; segment < 7; segment++) {
      digitalWrite(2 + segment, bitRead(digits[value / power[d] % 10], segment));
    }
    digitalWrite(9 + d, LOW);
    delay(2);
  }
}
```
@AVR8js.sketch(7segment4-example)

### Buzzer

The buzzer plays the frequency of the signal on its pin, use `volume="0"` to
mute it.

<div id="buzzer-example">
<wokwi-buzzer pin="8" volume="0.5"></wokwi-buzzer>
</div>

``` cpp
int melody[] = {262, 294, 330, 349, 392, 440, 494, 523};

void setup() { }

void loop() {
  for (int note : melody) {
    tone(8, note, 200);
    delay(250);
  }
  delay(1000);
}
```
@AVR8js.sketch(buzzer-example)

### Pushbuttons

<div id="buttons-example">
  <wokwi-pushbutton color="green" pin="2"></wokwi-pushbutton>
  <wokwi-led        color="green" pin="11"></wokwi-led>
  <wokwi-led        color="blue"  pin="12"></wokwi-led>
  <wokwi-led        color="red"   pin="13"></wokwi-led>
  <wokwi-pushbutton-6mm color="red" pin="3"></wokwi-pushbutton-6mm>
</div>

``` cpp
void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
}

int i = 0;
void loop() {
  // INPUT_PULLUP: a pressed button connects the pin to GND
  bool green = digitalRead(2) == LOW;
  bool red   = digitalRead(3) == LOW;

  digitalWrite(11, green);
  digitalWrite(13, red);
  digitalWrite(12, i % 2);

  i += 1;
  delay(250);
}
```
@AVR8js.sketch(buttons-example)

### Switches

Click the slide switch, the DIP switches, and the tilt switch.

<div id="switch-example">
<wokwi-slide-switch pin="2"></wokwi-slide-switch>
<wokwi-dip-switch-8 pin="3,4,5,6,7,8,9,10"></wokwi-dip-switch-8>
<wokwi-tilt-switch pin="11"></wokwi-tilt-switch>
</div>

``` cpp
const int dip[] = {3, 4, 5, 6, 7, 8, 9, 10};

void setup() {
  Serial.begin(115200);
  pinMode(2, INPUT);
  pinMode(11, INPUT);
  for (int pin : dip) {
    pinMode(pin, INPUT_PULLUP);
  }
}

String last;
void loop() {
  String state = "slide: " + String(digitalRead(2)) + "  dip: ";
  for (int pin : dip) {
    state += digitalRead(pin) == LOW ? "1" : "0";
  }
  state += "  tilt: " + String(digitalRead(11));

  if (state != last) {
    Serial.println(state);
    last = state;
  }
  delay(50);
}
```
@AVR8js.sketch(switch-example)

### PIR Motion Sensor

Click the sensor to simulate a motion.

<div id="pir-example">
<wokwi-pir-motion-sensor pin="2" delayTime="3"></wokwi-pir-motion-sensor>
<wokwi-led color="red" pin="13"></wokwi-led>
</div>

``` cpp
void setup() {
  Serial.begin(115200);
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
}

int last = LOW;
void loop() {
  int motion = digitalRead(2);
  digitalWrite(13, motion);
  if (motion != last) {
    Serial.println(motion ? "Motion detected!" : "Motion ended");
    last = motion;
  }
}
```
@AVR8js.sketch(pir-example)

### Potentiometer

<div id="pot-example">
<wokwi-potentiometer pin="A0"></wokwi-potentiometer>
<wokwi-slide-potentiometer pin="A1" travelLength="30"></wokwi-slide-potentiometer>
<wokwi-led color="yellow" pin="9"></wokwi-led>
</div>

``` cpp
void setup() {
  Serial.begin(115200);
  pinMode(9, OUTPUT);
}

void loop() {
  int knob = analogRead(A0);
  int slider = analogRead(A1);
  analogWrite(9, knob / 4);

  Serial.print("potentiometer: ");
  Serial.print(knob);
  Serial.print("  slider: ");
  Serial.println(slider);
  delay(250);
}
```
@AVR8js.sketch(pot-example)

### Analog-Joystick

<div id="joystick-example">
<wokwi-analog-joystick pin-vert="A0" pin-horz="A1" pin-sel="2"></wokwi-analog-joystick>
</div>

``` cpp
void setup() {
  Serial.begin(115200);
  pinMode(2, INPUT_PULLUP);
}

void loop() {
  int vert = analogRead(A0);
  int horz = analogRead(A1);

  String direction = "";
  if (vert > 800) direction += "up ";
  if (vert < 200) direction += "down ";
  if (horz > 800) direction += "left ";
  if (horz < 200) direction += "right ";
  if (digitalRead(2) == LOW) direction += "pressed";

  Serial.print(vert);
  Serial.print(", ");
  Serial.print(horz);
  Serial.print("  ");
  Serial.println(direction);
  delay(250);
}
```
@AVR8js.sketch(joystick-example)

### Photoresistor and NTC

<div id="light-example">
<wokwi-photoresistor-sensor id="ldr" pin="A0" pin-do="2" lux="500"></wokwi-photoresistor-sensor>
<wokwi-ntc-temperature-sensor id="ntc" pin="A1" temperature="24"></wokwi-ntc-temperature-sensor>
</div>

@AVR8js.control(ldr, lux, 1, 10000, 500)
@AVR8js.control(ntc, temperature, -24, 80, 24)

``` cpp
const float GAMMA = 0.7;
const float RL10 = 50;
const float BETA = 3950;

void setup() {
  Serial.begin(115200);
  pinMode(2, INPUT);
}

void loop() {
  float voltage = analogRead(A0) / 1024. * 5;
  float resistance = 2000 * voltage / (1 - voltage / 5);
  float lux = pow(RL10 * 1e3 * pow(10, GAMMA) / resistance, (1 / GAMMA));

  int ntc = analogRead(A1);
  float celsius = 1 / (log(1 / (1023. / ntc - 1)) / BETA + 1.0 / 298.15) - 273.15;

  Serial.print("Light: ");
  Serial.print(lux);
  Serial.print(" lux");
  Serial.print(digitalRead(2) ? " (dark)" : " (bright)");
  Serial.print("  Temperature: ");
  Serial.print(celsius);
  Serial.println(" C");
  delay(1000);
}
```
@AVR8js.sketch(light-example)

### Gas, Flame, Sound and Heart-Beat

These modules have an analog output and a digital output, which goes `LOW`
if the value exceeds the threshold.

<div id="module-example">
<wokwi-gas-sensor id="gas" pin="A0" pin-do="2" ppm="400"></wokwi-gas-sensor>
<wokwi-flame-sensor id="flame" pin="A1" pin-do="3" level="100"></wokwi-flame-sensor>
<wokwi-small-sound-sensor id="sound" pin="A2" pin-do="4" level="100"></wokwi-small-sound-sensor>
<wokwi-heart-beat-sensor id="heart" pin="A3" bpm="70"></wokwi-heart-beat-sensor>
</div>

@AVR8js.control(gas, ppm, 0, 10000, 400)
@AVR8js.control(flame, level, 0, 1023, 100)
@AVR8js.control(sound, level, 0, 1023, 100)
@AVR8js.control(heart, bpm, 40, 180, 70)

``` cpp
void setup() {
  Serial.begin(115200);
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
}

unsigned long lastPrint = 0, lastBeat = 0;
bool beat = false;
int bpm = 0;

void loop() {
  int pulse = analogRead(A3);
  if (pulse > 700 && !beat) {
    beat = true;
    if (lastBeat) bpm = 60000 / (millis() - lastBeat);
    lastBeat = millis();
  }
  if (pulse < 600) beat = false;

  if (millis() - lastPrint > 1000) {
    lastPrint = millis();
    Serial.print("gas: ");
    Serial.print(analogRead(A0));
    Serial.print(digitalRead(2) ? "" : " ALARM");
    Serial.print("  flame: ");
    Serial.print(analogRead(A1));
    Serial.print(digitalRead(3) ? "" : " FIRE");
    Serial.print("  sound: ");
    Serial.print(analogRead(A2));
    Serial.print(digitalRead(4) ? "" : " LOUD");
    Serial.print("  pulse: ");
    Serial.print(bpm);
    Serial.println(" bpm");
  }
}
```
@AVR8js.sketch(module-example)

### Servo

<div id="servo-example">
<wokwi-servo pin="9"></wokwi-servo>
<wokwi-potentiometer pin="A0" value="512"></wokwi-potentiometer>
</div>

``` cpp
#include <Servo.h>

Servo servo;

void setup() {
  servo.attach(9);
}

void loop() {
  servo.write(map(analogRead(A0), 0, 1023, 0, 180));
  delay(20);
}
```
@AVR8js.sketch(servo-example)

### Stepper-Motor

<div id="stepper-example">
<wokwi-stepper-motor size="17" pin="8,9,10,11"></wokwi-stepper-motor>
<wokwi-biaxial-stepper pin-outer="2,3,4,5" pin-inner="A0,A1,A2,A3"></wokwi-biaxial-stepper>
</div>

``` cpp
#include <Stepper.h>

// 200 steps per revolution, pins A-, A+, B+, B-
Stepper motor(200, 8, 9, 10, 11);
Stepper outer(200, 2, 3, 4, 5);
Stepper inner(200, A0, A1, A2, A3);

void setup() {
  motor.setSpeed(30);
  outer.setSpeed(60);
  inner.setSpeed(60);
}

void loop() {
  motor.step(50);
  outer.step(10);
  inner.step(-5);
}
```
@AVR8js.sketch(stepper-example)

### NeoPixel

<div id="neopixel-example">
<wokwi-neopixel pin="6"></wokwi-neopixel>
<wokwi-led-ring pin="5" pixels="16"></wokwi-led-ring>
</div>

``` cpp
#include <Adafruit_NeoPixel.h>

Adafruit_NeoPixel pixel(1, 6, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel ring(16, 5, NEO_GRB + NEO_KHZ800);

void setup() {
  pixel.begin();
  ring.begin();
}

int step = 0;
void loop() {
  pixel.setPixelColor(0, pixel.ColorHSV(step * 512));
  pixel.show();

  ring.clear();
  ring.setPixelColor(step % 16, ring.Color(0, 150, 255));
  ring.setPixelColor((step + 8) % 16, ring.Color(255, 60, 0));
  ring.show();

  step++;
  delay(100);
}
```
@AVR8js.sketch(neopixel-example)

### Neopixel-Matrix

<div id="matrix-experiment">
<wokwi-neopixel-matrix pin="3" cols="9" rows="9"></wokwi-neopixel-matrix>
<span id="simulation-time"></span>
</div>

``` cpp
#include "FastLED.h"

// Matrix size
#define NUM_ROWS 9
#define NUM_COLS 9

// LEDs pin
#define DATA_PIN 3

// LED brightness
#define BRIGHTNESS 180

#define NUM_LEDS NUM_ROWS * NUM_COLS

// Define the array of leds
CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  FastLED.setBrightness(BRIGHTNESS);
}

int counter = 0;
void loop() {
  for (byte row = 0; row < NUM_ROWS; row++) {
    for (byte col = 0; col < NUM_COLS; col++) {
      int delta = abs(NUM_ROWS - row * 2) + abs(NUM_COLS - col * 2);
      leds[row * NUM_COLS + col] = CHSV(delta * 4 + counter, 255, 255);
    }
  }
  FastLED.show();
  delay(5);
  counter++;
}
```
@AVR8js.sketch(matrix-experiment)

### DHT22

<div id="dht-example">
<wokwi-dht22 id="dht" pin="2" temperature="24" humidity="40"></wokwi-dht22>
</div>

@AVR8js.control(dht, temperature, -40, 80, 24)
@AVR8js.control(dht, humidity, 0, 100, 40)

``` cpp
#include <DHT.h>

DHT dht(2, DHT22);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  delay(2000);
  Serial.print("Temperature: ");
  Serial.print(dht.readTemperature());
  Serial.print(" C  Humidity: ");
  Serial.print(dht.readHumidity());
  Serial.println(" %");
}
```
@AVR8js.sketch(dht-example)

### HC-SR04

<div id="sonar-example">
<wokwi-hc-sr04 id="sonar" pin-trig="3" pin-echo="2" distance="100"></wokwi-hc-sr04>
</div>

@AVR8js.control(sonar, distance, 2, 400, 100)

``` cpp
void setup() {
  Serial.begin(115200);
  pinMode(3, OUTPUT);
  pinMode(2, INPUT);
}

void loop() {
  // a pulse of 10µs starts the measurement
  digitalWrite(3, HIGH);
  delayMicroseconds(10);
  digitalWrite(3, LOW);

  long duration = pulseIn(2, HIGH);
  Serial.print("Distance: ");
  Serial.print(duration / 58);
  Serial.println(" cm");
  delay(500);
}
```
@AVR8js.sketch(sonar-example)

### Membrane-Keypad

<div id="keypad-example">
<wokwi-membrane-keypad pin-rows="9,8,7,6" pin-cols="5,4,3,2"></wokwi-membrane-keypad>
</div>

``` cpp
#include <Keypad.h>

const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};
byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

void setup() {
  Serial.begin(115200);
  Serial.println("Press a key");
}

void loop() {
  char key = keypad.getKey();
  if (key) {
    Serial.println(key);
  }
}
```
@AVR8js.sketch(keypad-example)

### Rotary Encoder KY-040

Turn the knob with the mouse or the arrow keys, press it with the space key.

<div id="encoder-example">
<wokwi-ky-040 pin-clk="2" pin-dt="3" pin-sw="4"></wokwi-ky-040>
</div>

``` cpp
#define ENCODER_CLK 2
#define ENCODER_DT  3
#define ENCODER_SW  4

int counter = 0;
int lastClk = HIGH;

void setup() {
  Serial.begin(115200);
  pinMode(ENCODER_CLK, INPUT);
  pinMode(ENCODER_DT, INPUT);
  pinMode(ENCODER_SW, INPUT_PULLUP);
}

void loop() {
  int clk = digitalRead(ENCODER_CLK);
  if (clk != lastClk) {
    lastClk = clk;
    if (clk == LOW) {
      // DT is still HIGH when turning clockwise
      counter += digitalRead(ENCODER_DT) == HIGH ? 1 : -1;
      Serial.print("Counter: ");
      Serial.println(counter);
    }
  }
  if (digitalRead(ENCODER_SW) == LOW) {
    counter = 0;
    Serial.println("Reset");
    delay(300);
  }
}
```
@AVR8js.sketch(encoder-example)

### Rotary-Dialer

Dial a number. While dialing, the DIAL pin is connected to GND, the PULSE pin
opens once for every pulse (ten pulses for 0).

<div id="dialer-example">
<wokwi-rotary-dialer pin-dial="2" pin-pulse="3"></wokwi-rotary-dialer>
</div>

``` cpp
void setup() {
  Serial.begin(115200);
  pinMode(2, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
}

bool dialing = false;
int pulses = 0;
int last = LOW;

void loop() {
  bool active = digitalRead(2) == LOW;
  if (active && !dialing) pulses = 0;
  if (!active && dialing) Serial.print(pulses % 10);
  dialing = active;

  int pulse = digitalRead(3);
  if (pulse == HIGH && last == LOW && dialing) pulses++;
  last = pulse;
}
```
@AVR8js.sketch(dialer-example)

### IR-Remote

<div id="ir-example">
<wokwi-ir-receiver pin="2"></wokwi-ir-receiver>
<wokwi-ir-remote></wokwi-ir-remote>
</div>

``` cpp
#include <IRremote.hpp>

void setup() {
  Serial.begin(115200);
  IrReceiver.begin(2);
  Serial.println("Press a button on the remote");
}

void loop() {
  if (IrReceiver.decode()) {
    int command = IrReceiver.decodedIRData.command;
    Serial.print(command);
    Serial.print(": ");
    switch (command) {
      case 162: Serial.println("POWER"); break;
      case 226: Serial.println("MENU"); break;
      case 34:  Serial.println("TEST"); break;
      case 2:   Serial.println("PLUS"); break;
      case 194: Serial.println("BACK"); break;
      case 224: Serial.println("PREV"); break;
      case 168: Serial.println("PLAY"); break;
      case 144: Serial.println("NEXT"); break;
      case 152: Serial.println("MINUS"); break;
      case 176: Serial.println("C"); break;
      case 104: Serial.println("0"); break;
      case 48:  Serial.println("1"); break;
      case 24:  Serial.println("2"); break;
      case 122: Serial.println("3"); break;
      case 16:  Serial.println("4"); break;
      case 56:  Serial.println("5"); break;
      case 90:  Serial.println("6"); break;
      case 66:  Serial.println("7"); break;
      case 74:  Serial.println("8"); break;
      case 82:  Serial.println("9"); break;
      default:  Serial.println("?");
    }
    IrReceiver.resume();
  }
}
```
@AVR8js.sketch(ir-example)

### HX711 Load Cell

The load cell reports 420 per kg.

<div id="scale-example">
<wokwi-hx711 id="scale" pin-dt="A1" pin-sck="A0" type="50kg" load="10"></wokwi-hx711>
</div>

@AVR8js.control(scale, load, 0, 50, 10)

``` cpp
#include <HX711.h>

HX711 scale;

void setup() {
  Serial.begin(115200);
  scale.begin(A1, A0);  // DT, SCK
  scale.set_scale(420);
}

void loop() {
  Serial.print("Weight: ");
  Serial.print(scale.get_units(1), 2);
  Serial.println(" kg");
  delay(500);
}
```
@AVR8js.sketch(scale-example)

### LCD1602 and LCD2004

Both displays are connected via I2C at the address `0x27`.

<div id="lcd1602-example">
<wokwi-lcd1602></wokwi-lcd1602>
</div>

``` cpp
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

byte heart[8] = {
  0b00000, 0b01010, 0b11111, 0b11111,
  0b01110, 0b00100, 0b00000, 0b00000
};

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.createChar(0, heart);
  lcd.setCursor(1, 0);
  lcd.print("I ");
  lcd.write(0);
  lcd.print(" Arduino");
}

int counter = 0;
void loop() {
  lcd.setCursor(0, 1);
  lcd.print("Counter: ");
  lcd.print(counter++);
  delay(500);
}
```
@AVR8js.sketch(lcd1602-example)

<div id="lcd2004-example">
<wokwi-lcd2004></wokwi-lcd2004>
</div>

``` cpp
#include <LiquidCrystal_I2C.h>

#define I2C_ADDR    0x27
#define LCD_COLUMNS 20
#define LCD_LINES   4

LiquidCrystal_I2C lcd(I2C_ADDR, LCD_COLUMNS, LCD_LINES);

void setup() {
  // Init
  lcd.init();
  lcd.backlight();

  // Print something
  lcd.setCursor(3, 0);
  lcd.print("Hello, world!");
  lcd.setCursor(2, 1);
  lcd.print("Wokwi Online IoT");
  lcd.setCursor(5, 2);
  lcd.print("Simulator");
  lcd.setCursor(7, 3);
  lcd.print("Enjoy!");
}

void loop() {
}
```
@AVR8js.sketch(lcd2004-example)

### SSD1306

<div id="ssd1306-experiment">
<wokwi-ssd1306></wokwi-ssd1306>
<span id="simulation-time"></span>
</div>

``` cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.display();
  delay(1000);
}

int counter = 0;
void loop() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(4, 4);
  display.println(F("Hello, Wokwi!"));
  display.setTextSize(2);
  display.setCursor(54, 24);
  display.println(counter);
  display.display();
  counter++;
  delay(1000);
}
```
@AVR8js.sketch(ssd1306-experiment)

### DS1307 Real Time Clock

The clock starts with the current time of your computer, or with the time in
`initTime`, and keeps the time that the sketch sets.

<div id="rtc-example">
<wokwi-ds1307></wokwi-ds1307>
</div>

``` cpp
#include <RTClib.h>

RTC_DS1307 rtc;

void setup() {
  Serial.begin(115200);
  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
}

void loop() {
  char format[] = "DDD, DD.MM.YYYY hh:mm:ss";
  Serial.println(rtc.now().toString(format));
  delay(1000);
}
```
@AVR8js.sketch(rtc-example)

### MPU6050

<div id="mpu-example">
<wokwi-mpu6050 id="mpu" accelZ="1"></wokwi-mpu6050>
</div>

@AVR8js.control(mpu, accelX, -2, 2, 0)
@AVR8js.control(mpu, accelY, -2, 2, 0)
@AVR8js.control(mpu, accelZ, -2, 2, 1)
@AVR8js.control(mpu, rotationZ, -250, 250, 0)
@AVR8js.control(mpu, temperature, -40, 85, 24)

``` cpp
#include <Adafruit_MPU6050.h>

Adafruit_MPU6050 mpu;

void setup() {
  Serial.begin(115200);
  if (!mpu.begin()) {
    Serial.println("Couldn't find MPU6050");
    while (1);
  }
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  Serial.print("Acceleration: ");
  Serial.print(a.acceleration.x);
  Serial.print(", ");
  Serial.print(a.acceleration.y);
  Serial.print(", ");
  Serial.print(a.acceleration.z);
  Serial.print(" m/s^2  Rotation z: ");
  Serial.print(g.gyro.z);
  Serial.print(" rad/s  Temperature: ");
  Serial.print(temp.temperature);
  Serial.println(" C");
  delay(500);
}
```
@AVR8js.sketch(mpu-example)

### ILI9341

<div id="tft-example">
<wokwi-ili9341 pin-cs="10" pin-dc="9"></wokwi-ili9341>
</div>

``` cpp
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

#define TFT_DC 9
#define TFT_CS 10

Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC);

void setup() {
  tft.begin();
  tft.fillScreen(ILI9341_BLACK);

  tft.setCursor(26, 40);
  tft.setTextColor(ILI9341_RED);
  tft.setTextSize(3);
  tft.println("Hello, TFT!");

  tft.setCursor(20, 80);
  tft.setTextColor(ILI9341_GREEN);
  tft.setTextSize(2);
  tft.println("I can has colors?");
}

int radius = 0;
void loop() {
  tft.drawCircle(120, 220, radius, tft.color565(radius * 3, 255 - radius * 3, 128));
  radius = (radius + 4) % 80;
  if (radius == 0) {
    tft.fillRect(40, 140, 160, 160, ILI9341_BLACK);
  }
  delay(50);
}
```
@AVR8js.sketch(tft-example)

### microSD Card

The card is empty at every start.

<div id="sd-example">
<wokwi-microsd-card pin-cs="10"></wokwi-microsd-card>
</div>

``` cpp
#include <SPI.h>
#include <SD.h>

void setup() {
  Serial.begin(115200);
  if (!SD.begin(10)) {
    Serial.println("Card initialization failed!");
    return;
  }

  File log = SD.open("log.txt", FILE_WRITE);
  for (int i = 1; i <= 3; i++) {
    log.print("Line ");
    log.println(i);
  }
  log.close();

  File root = SD.open("/");
  for (File entry = root.openNextFile(); entry; entry = root.openNextFile()) {
    Serial.print(entry.name());
    Serial.print("  ");
    Serial.print(entry.size());
    Serial.println(" bytes");
    entry.close();
  }

  log = SD.open("log.txt");
  while (log.available()) {
    Serial.write(log.read());
  }
  log.close();
}

void loop() { }
```
@AVR8js.sketch(sd-example)

### Arduino Boards

The Uno and the Nano show the state of the LED on pin 13 and the TX LED.

<div id="board-example">
<wokwi-arduino-uno></wokwi-arduino-uno>
</div>

``` cpp
void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.println("on");
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```
@AVR8js.sketch(board-example)

The Nano works the same way. The following elements are only shown, they are
not simulated:

<wokwi-arduino-mega></wokwi-arduino-mega>
<wokwi-resistor value="470"></wokwi-resistor>
<wokwi-ks2e-m-dc5></wokwi-ks2e-m-dc5>

### Projects

Simon says: repeat the sequence of lights and tones with the buttons.

<div id="game-container">
  <wokwi-pushbutton color="red" pin="2"></wokwi-pushbutton>
  <wokwi-led color="red" label="9" pin="9"></wokwi-led>
  <wokwi-led color="green" label="10" pin="10"></wokwi-led>
  <wokwi-pushbutton color="green" pin="3"></wokwi-pushbutton>
  <wokwi-pushbutton color="blue" pin="4"></wokwi-pushbutton>
  <wokwi-led color="blue" label="11" pin="11"></wokwi-led>
  <wokwi-led color="yellow" label="12" pin="12"></wokwi-led>
  <wokwi-pushbutton color="yellow" pin="5"></wokwi-pushbutton>
  <wokwi-buzzer pin="8" volume="0.3"></wokwi-buzzer>
</div>

``` cpp           sketch.ino
/**
   Simon Game for Arduino

   Copyright (C) 2016, Uri Shaked

   Licensed under the MIT License.
*/

#include "pitches.h"

/* Constants - define pin numbers for leds, buttons and speaker, and also the game tones */
char ledPins[] = {9, 10, 11, 12};
char buttonPins[] = {2, 3, 4, 5};
#define SPEAKER_PIN 8

// If you run this code directly on the WeMos D1 Mini Board, use the following pin mapping:
//char ledPins[] = {D1, D3, D0, D8};
//char buttonPins[] = {D4, D5, D6, D7};
//#define SPEAKER_PIN D2

#define MAX_GAME_LENGTH 100

int gameTones[] = { NOTE_G3, NOTE_C4, NOTE_E4, NOTE_G5};

/* Global variales - store the game state */
byte gameSequence[MAX_GAME_LENGTH] = {0};
byte gameIndex = 0;

/**
   Set up the Arduino board and initialize Serial communication
*/
void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 4; i++) {
    pinMode(ledPins[i], OUTPUT);
    pinMode(buttonPins[i], INPUT_PULLUP);
  }
  pinMode(SPEAKER_PIN, OUTPUT);
  // The following line primes the random number generator. It assumes pin A0 is floating (disconnected)
  randomSeed(analogRead(A0));
}

/**
   Lights the given led and plays the suitable tone
*/
void lightLedAndPlaySound(byte ledIndex) {
  digitalWrite(ledPins[ledIndex], HIGH);
  tone(SPEAKER_PIN, gameTones[ledIndex]);
  delay(300);
  digitalWrite(ledPins[ledIndex], LOW);
  noTone(SPEAKER_PIN);
}

/**
   Plays the current sequence of notes that the user has to repeat
*/
void playSequence() {
  for (int i = 0; i < gameIndex; i++) {
    char currentLed = gameSequence[i];
    lightLedAndPlaySound(currentLed);
    delay(50);
  }
}

/**
    Waits until the user pressed one of the buttons, and returns the index of that button
*/
byte readButton() {
  for (;;) {
    for (int i = 0; i < 4; i++) {
      byte buttonPin = buttonPins[i];
      if (digitalRead(buttonPin) == LOW) {
        return i;
      }
    }
    delay(1);
  }
}

/**
  Play the game over sequence, and report the game score
*/
void gameOver() {
  Serial.print("Game over! your score: ");
  Serial.println(gameIndex - 1);
  gameIndex = 0;
  delay(200);
  // Play a Wah-Wah-Wah-Wah sound
  tone(SPEAKER_PIN, NOTE_DS5);
  delay(300);
  tone(SPEAKER_PIN, NOTE_D5);
  delay(300);
  tone(SPEAKER_PIN, NOTE_CS5);
  delay(300);
  for (int i = 0; i < 200; i++) {
    tone(SPEAKER_PIN, NOTE_C5 + (i % 20 - 10));
    delay(5);
  }
  noTone(SPEAKER_PIN);
  delay(500);
}

/**
   Get the user input and compare it with the expected sequence. If the user fails, play the game over sequence and restart the game.
*/
void checkUserSequence() {
  for (int i = 0; i < gameIndex; i++) {
    char expectedButton = gameSequence[i];
    char actualButton = readButton();
    lightLedAndPlaySound(actualButton);
    if (expectedButton == actualButton) {
      /* good */
    } else {
      gameOver();
      return;
    }
  }
}

/**
   Plays an hooray sound whenever the user finishes a level
*/
void levelUp() {
  tone(SPEAKER_PIN, NOTE_E4);
  delay(150);
  tone(SPEAKER_PIN, NOTE_G4);
  delay(150);
  tone(SPEAKER_PIN, NOTE_E5);
  delay(150);
  tone(SPEAKER_PIN, NOTE_C5);
  delay(150);
  tone(SPEAKER_PIN, NOTE_D5);
  delay(150);
  tone(SPEAKER_PIN, NOTE_G5);
  delay(150);
  noTone(SPEAKER_PIN);
}

/**
   The main game loop
*/
void loop() {
  // Add a random color to the end of the sequence
  gameSequence[gameIndex] = random(0, 4);
  gameIndex++;

  playSequence();
  checkUserSequence();
  delay(300);

  if (gameIndex > 0) {
    levelUp();
    delay(300);
  }
}
```
``` cpp             -pitches.h
/*************************************************
 * Public Constants
 *************************************************/

#define NOTE_B0  31
#define NOTE_C1  33
#define NOTE_CS1 35
#define NOTE_D1  37
#define NOTE_DS1 39
#define NOTE_E1  41
#define NOTE_F1  44
#define NOTE_FS1 46
#define NOTE_G1  49
#define NOTE_GS1 52
#define NOTE_A1  55
#define NOTE_AS1 58
#define NOTE_B1  62
#define NOTE_C2  65
#define NOTE_CS2 69
#define NOTE_D2  73
#define NOTE_DS2 78
#define NOTE_E2  82
#define NOTE_F2  87
#define NOTE_FS2 93
#define NOTE_G2  98
#define NOTE_GS2 104
#define NOTE_A2  110
#define NOTE_AS2 117
#define NOTE_B2  123
#define NOTE_C3  131
#define NOTE_CS3 139
#define NOTE_D3  147
#define NOTE_DS3 156
#define NOTE_E3  165
#define NOTE_F3  175
#define NOTE_FS3 185
#define NOTE_G3  196
#define NOTE_GS3 208
#define NOTE_A3  220
#define NOTE_AS3 233
#define NOTE_B3  247
#define NOTE_C4  262
#define NOTE_CS4 277
#define NOTE_D4  294
#define NOTE_DS4 311
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_FS4 370
#define NOTE_G4  392
#define NOTE_GS4 415
#define NOTE_A4  440
#define NOTE_AS4 466
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_CS5 554
#define NOTE_D5  587
#define NOTE_DS5 622
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_FS5 740
#define NOTE_G5  784
#define NOTE_GS5 831
#define NOTE_A5  880
#define NOTE_AS5 932
#define NOTE_B5  988
#define NOTE_C6  1047
#define NOTE_CS6 1109
#define NOTE_D6  1175
#define NOTE_DS6 1245
#define NOTE_E6  1319
#define NOTE_F6  1397
#define NOTE_FS6 1480
#define NOTE_G6  1568
#define NOTE_GS6 1661
#define NOTE_A6  1760
#define NOTE_AS6 1865
#define NOTE_B6  1976
#define NOTE_C7  2093
#define NOTE_CS7 2217
#define NOTE_D7  2349
#define NOTE_DS7 2489
#define NOTE_E7  2637
#define NOTE_F7  2794
#define NOTE_FS7 2960
#define NOTE_G7  3136
#define NOTE_GS7 3322
#define NOTE_A7  3520
#define NOTE_AS7 3729
#define NOTE_B7  3951
#define NOTE_C8  4186
#define NOTE_CS8 4435
#define NOTE_D8  4699
#define NOTE_DS8 4978
```
@AVR8js.project(game-container,sketch.ino,pitches.h)


## Implementation

The code below shows the implementation of the macros. The `@AVR8js.project`
defines the main functionality, while `@AVR8js.sketch` only sets the default
file name and passes the id of the HTML-elmenent that contains all connected
wokwi-webcomponents. `@AVR8js.control` creates a slider, that changes an
attribute of a wokwi-element.

This template utilizes a global AVR8js object that is currently defined in
`src/index.ts`. Code is compiled on https://hexi.wokwi.com/build and send back
for execution.

``` html
script:   https://cdn.jsdelivr.net/gh/liatemplates/avr8js@0.1.0/dist/index.js

@AVR8js.sketch: @AVR8js.project(@0,sketch.ino)

@AVR8js.control
<script modify="false" style="display: block">
(([id, attr, min, max, value]) =>
`HTML: <label>${attr}: <input type="range" min="${min}" max="${max}" value="${value}" step="any"
  oninput="let v = Math.round(this.value * 100) / 100;
           document.getElementById('${id}').setAttribute('${attr}', v);
           this.nextElementSibling.value = v"> <output>${value}</output></label>`
)(["@0", "@1", "@2", "@3", "@4"].map((s) => s.trim()))
</script>
@end

@AVR8js.project
<script>
let id = "@0"

let name = [
  "@1", "@2", "@3", "@4", "@5", "@6", "@7", "@8", "@9"
  ]
  .map((e) => e.trim())
  .filter((e) => { return (e[0] !== '@' && e !== "") })

let content = [
  `@input(0)`,
  `@input(1)`,
  `@input(2)`,
  `@input(3)`,
  `@input(4)`,
  `@input(5)`,
  `@input(6)`,
  `@input(7)`,
  `@input(8)`,
  `@input(9)`
  ]

let sketch;
let files = []

for(let i=0; i<name.length; i++) {
  if (name[i] == "sketch.ino") {
    sketch = content[i]
  } else {
    files.push({name: name[i], content: content[i]})
  }
}

AVR8js.build(sketch, files)
   .then((e) => {
     if (!e.hex) {
       let msgs = name.map(() => [])

       for (const err of (e.stderr || "").matchAll(/([\w.-]+):(\d+):(\d+): ([^:\n]+):(.+)/g)) {
         let file = name.indexOf(err[1])
         if (file >= 0) {
           msgs[file].push({
             row :    parseInt(err[2]) - 1,
             column : parseInt(err[3]),
             text :   err[5],
             type :   err[4].includes("error") ? "error" : err[4].includes("warning") ? "warning" : "info"
           })
         }
       }
       send.lia(e.stderr || "build failed", msgs, false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       let runner = AVR8js.execute(e.hex, console.stream, id)

       // the simulation stops itself, if its elements are removed
       runner.onStop.push(() => {
         if (runner) {
           runner = null
           send.lia("LIA: stop")
         }
       })

       send.handle("input", (input) => {
          if (runner) runner.serial(input.slice(0, -1))
       })

       send.lia("LIA: terminal")

       send.handle("stop", e => {
         if(runner) {
           let r = runner
           runner = null
           r.stop()
           console.debug("execution stopped")
         }
       })
     }
   })
   .catch((e) => {
     console.error(e.message)
     send.lia("LIA: stop")
   })
"LIA: wait"
</script>

@end


@AVR8js.asm
<script>
let id = "@0"

AVR8js.buildASM(`@input`)
   .then((e) => {
     if (!e.hex) {
       let msgs = []

       for (const err of (e.stderr || "").matchAll(/main\.S:(\d+):(?:(\d+):)? (\w+): (.+)/g)) {
         msgs.push({
           row :    parseInt(err[1]) - 1,
           column : parseInt(err[2] || 0),
           text :   err[4],
           type :   err[3].toLowerCase()
         })
       }
       send.lia(e.stderr || "build failed", [msgs], false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       let runner = AVR8js.execute(e.hex, console.stream, id)

       // the simulation stops itself, if its elements are removed
       runner.onStop.push(() => {
         if (runner) {
           runner = null
           send.lia("LIA: stop")
         }
       })

       send.handle("input", (input) => {
          if (runner) runner.serial(input.slice(0, -1))
       })

       send.lia("LIA: terminal")

       send.handle("stop", e => {
         if(runner) {
           let r = runner
           runner = null
           r.stop()
           console.debug("execution stopped")
         }
       })
     }
   })
   .catch((e) => {
     console.error(e.message)
     send.lia("LIA: stop")
   })
"LIA: wait"
</script>

@end
```
