<!--
author:   André Dietrich

email:    LiaScript@web.de

version:  0.0.9

language: en

narrator: US English Female

comment:  LiaScript template for the AVR8js simulator.

script:   https://cdn.jsdelivr.net/gh/liatemplates/avr8js@0.0.9/dist/index.js

@AVR8js.sketch: @AVR8js.project(@0,sketch.ino)

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
     if (e.stderr) {
       let msgs = []

       for(let i = 0; i<name.length; i++) {
         msgs.push([])
       }

       let iter = e.stderr.matchAll(/(\w+\.\w+):(\d+):(\d+): ([^:]+):(.+)/g)

       for(let err=iter.next(); !err.done; err=iter.next()) {
         msgs[name.findIndex((e) => e==err.value[1])].push({
           row :    parseInt(err.value[2]) - 1,
           column : parseInt(err.value[3]),
           text :   err.value[5],
           type :   err.value[4]
         })
       }
       send.lia(e.stderr, msgs, false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       if (e.hex) {
         let runner = AVR8js.execute(e.hex, console.log, id)

         send.handle("input", (input) => {
            runner.serial(input.slice(0, -1))
         })

         send.lia("LIA: terminal")

         send.handle("stop", e => {
           if(runner) {
             runner.stop()
             runner = null
             console.debug("execution stopped")
           }
         })
       } else {
         send.lia("LIA: stop")
       }
     }
   })
"LIA: wait"
</script>

@end



@AVR8js.asm
<script>
let id = "@0"

AVR8js.buildASM(`@input`)
   .then((e) => {
     if (e.stderr) {
       let msgs = []

       let iter = e.stderr.matchAll(/main\.s:(\d+):(\d+): ([^:]+):(.+)/g)

       for(let err=iter.next(); !err.done; err=iter.next()) {
         msgs.push({
           row :    parseInt(err.value[1]) - 1,
           column : parseInt(err.value[2]),
           text :   err.value[4],
           type :   err.value[3].toLower()
         })
       }
       send.lia(e.stderr, [msgs], false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       if (e.hex) {
         let runner = AVR8js.execute(e.hex, console.log, id)

         send.handle("input", (input) => {
            runner.serial(input.slice(0, -1))
         })

         send.lia("LIA: terminal")

         send.handle("stop", e => {
           if(runner) {
             runner.stop()
             runner = null
             console.debug("execution stopped")
           }
         })
       } else {
         send.lia("LIA: stop")
       }
     }
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
executable.

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
to the simulation, based on the defined pins. If you want to run multiple
simulations on one side, you can hide the relevant wokwi-elements within a div
or span and pass the id of that element to `@AVR8js.sketch`. If you do not pass
an id, all visible elements within a section will be attached to the simulation.
If an element with the id `simulation-time` is present, this element will be
updated with the current simulation time.


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
#import params.h
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
@AVR8js.project( ,params.h,sketch.ino)
````

## `@AVR8js.asm`

todo


## Examples

### Serial.read

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

<div id="example1">
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
@AVR8js.sketch

### Buttons

<div>
  <wokwi-pushbutton color="green" pin="2" ></wokwi-pushbutton>
  <wokwi-led        color="green" pin="11"></wokwi-led>
  <wokwi-led        color="blue"  pin="12"></wokwi-led>
  <wokwi-led        color="red"   pin="13"></wokwi-led>
  <wokwi-pushbutton color="red"   pin="3" ></wokwi-pushbutton>
</div>

``` cpp
void setup() {
  Serial.begin(115200);
  pinMode(2, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
}

int i = 0;
void loop() {
  bool green = digitalRead(2);
  bool red   = digitalRead(3);
  Serial.print("LED: ");
  Serial.println(i);

  digitalWrite(11, green);
  digitalWrite(13, red);
  delay(250);

  i += 1;

  digitalWrite(12, i % 2);
}
```
@AVR8js.sketch

### Assembly

``` asm
; Created: 25/11/2019 9:45:37 AM
; Author : Annon

; defining some labels to make the code easier to read
LEDs = 20
Switches = 21
outer = 22
inner = 23
inner1 = 24

; GPIO registers (according to datasheet)
DDRA = 0x1
PORTA = 0x2
PINC = 0x6
DDRC = 0x7
PORTC = 0x8

.text
.section	.rodata
.string "Look ma, I'm on a chip!!" ; :P

.text
.org 0000 ; start the code at 0x0000 - we arent using interrupts so don't waste space on them
.global Start
Start:
  clr r19
  OUT DDRC, r19
  ser r19
  OUT DDRA, r19
  OUT PORTC, r19

Loop:
  in Switches,PINC ; read switches
  com Switches ; invert
  cbr Switches, 0x7F ; mask out the lower 7 bits
  cpi r21, 0x80 ; compare r21 with 0x80
  breq setLeds ; turn on leds
  brne clrLeds ; make sure the leds turn off if not set

setLeds:
  ser LEDs ; set all bits high
  out PORTA, LEDs ; send them to the leds
  rcall wait ; wait ~1s
  clr LEDs ; set all bits low
  out PORTA, LEDs ; send them to the leds
  rcall wait ; wait ~1s
  rjmp Loop ; jump back to main loop

clrLeds:
  clr LEDs ; set all bits low
  out PORTA, LEDs ; send them to the leds
  rjmp Loop ; jump back to main loop

wait: ; 255 * 252 * 83 * 3 = 16000740/16mhz = 1.0004625s
  ldi outer,0
waitouter:
  rcall waitinner
  dec outer
  brne waitouter
  ret
waitinner:
  ldi inner,253
waitinner1:
  rcall waitininner
  dec inner
  brne waitinner1
  ret
waitininner:
  ldi inner1,84
waitininner1:
  dec inner1
  brne waitininner1
  ret
```
@AVR8js.asm

### 7-Segment

<wokwi-7segment digits="1" pin="13"></wokwi-7segment>


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
@AVR8js.sketch


### Buzzer

<div id="example1">
  <wokwi-buzzer color="red"   pin="13" label="13"></wokwi-buzzer>
  <wokwi-buzzer color="green" pin="12" label="12"></wokwi-buzzer>
  <wokwi-buzzer color="blue"  pin="11" label="11"></wokwi-buzzer>
  <wokwi-buzzer color="blue"  pin="10" label="10"></wokwi-buzzer>
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
  Serial.print("BUZZER: ");
  Serial.println(i);
  digitalWrite(leds[i], HIGH);
  delay(250);
  digitalWrite(leds[i], LOW);
  i = (i + 1) % sizeof(leds);
}
```
@AVR8js.sketch

### Arduino-Mega

<wokwi-arduino-mega></wokwi-arduino-mega>

### Arduino-Uno

<wokwi-arduino-uno></wokwi-arduino-uno>

### Arduino-Nano

<wokwi-arduino-nano></wokwi-arduino-nano>


### DHT22

<wokwi-dht22></wokwi-dht22>

### LCD1602

<wokwi-lcd1602></wokwi-lcd1602>

### Membrane-Keypad

<wokwi-membrane-keypad></wokwi-membrane-keypad>

### Neopixel

<wokwi-neopixel></wokwi-neopixel>

### Neopixel-Matrix

<wokwi-neopixel-matrix></wokwi-neopixel-matrix>

### Potentiometer

<wokwi-potentiometer></wokwi-potentiometer>

### Resistor

<wokwi-resistor></wokwi-resistor>

### Rotary-Dialer

<wokwi-rotary-dialer></wokwi-rotary-dialer>

### Servo

<wokwi-servo></wokwi-servo>

### SSD1306

<wokwi-ssd1306></wokwi-ssd1306>


### Projects

> Example not working yet ...

<div id="game-container">
  <wokwi-pushbutton color="red" pin="2"></wokwi-pushbutton>
  <wokwi-led color="red" label="9" pin="9"></wokwi-led>
  <wokwi-led color="green" label="10" pin="10"></wokwi-led>
  <wokwi-pushbutton color="green" pin="3"></wokwi-pushbutton>
  <wokwi-pushbutton color="blue" pin="4"></wokwi-pushbutton>
  <wokwi-led color="blue" label="11" pin="11"></wokwi-led>
  <wokwi-led color="yellow" label="12" pin="12"></wokwi-led>
  <wokwi-pushbutton color="yellow" pin="5"></wokwi-pushbutton>
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
``` cpp             -piches.h
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
@AVR8js.project( ,sketch.ino,pitches.h)


## Implementation

The code below shows the implementation of the two macros. The `@AVR8js.project`
defines the main functionality, while `@AVR8js.sketch` only sets the default
file name and passes the id of the HTML-elmenent that contains all connected
wokwi-webcomponents.

This template utilizes a global AVR8js object that is currently defined in
`src/index.ts`. Code is compiled on https://hexi.wokwi.com/build and send back
for execution.

``` html
@@script:   https://cdn.jsdelivr.net/gh/liatemplates/avr8js@0.0.7/dist/index.js

script:   dist/index.js

@AVR8js.sketch: @AVR8js.project(@0,sketch.ino)

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
     if (e.stderr) {
       let msgs = []

       for(let i = 0; i<name.length; i++) {
         msgs.push([])
       }

       let iter = e.stderr.matchAll(/(\w+\.\w+):(\d+):(\d+): ([^:]+):(.+)/g)

       for(let err=iter.next(); !err.done; err=iter.next()) {
         msgs[name.findIndex((e) => e==err.value[1])].push({
           row :    parseInt(err.value[2]) - 1,
           column : parseInt(err.value[3]),
           text :   err.value[5],
           type :   err.value[4]
         })
       }
       send.lia(e.stderr, msgs, false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       if (e.hex) {
         let runner = AVR8js.execute(e.hex, console.log, id)

         send.handle("input", (input) => {
            runner.serial(input.slice(0, -1))
         })

         send.lia("LIA: terminal")

         send.handle("stop", e => {
           if(runner) {
             runner.stop()
             runner = null
             console.debug("execution stopped")
           }
         })
       } else {
         send.lia("LIA: stop")
       }
     }
   })
"LIA: wait"
</script>

@end

@AVR8js.asm
<script>
let id = "@0"

AVR8js.buildASM(`@input`)
   .then((e) => {
     if (e.stderr) {
       let msgs = []

       let iter = e.stderr.matchAll(/main\.s:(\d+):(\d+): ([^:]+):(.+)/g)

       for(let err=iter.next(); !err.done; err=iter.next()) {
         msgs.push({
           row :    parseInt(err.value[1]) - 1,
           column : parseInt(err.value[2]),
           text :   err.value[4],
           type :   err.value[3].toLower()
         })
       }
       send.lia(e.stderr, [msgs], false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       if (e.hex) {
         let runner = AVR8js.execute(e.hex, console.log, id)

         send.handle("input", (input) => {
            runner.serial(input.slice(0, -1))
         })

         send.lia("LIA: terminal")

         send.handle("stop", e => {
           if(runner) {
             runner.stop()
             runner = null
             console.debug("execution stopped")
           }
         })
       } else {
         send.lia("LIA: stop")
       }
     }
   })
"LIA: wait"
</script>

@end
```
