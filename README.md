<!--
author:   André Dietrich

email:    LiaScript@web.de

version:  0.0.1

language: en

narrator: US English Female

comment:  Try to write a short comment about
          your course, multiline is also okay.

script:   dist/index.js

@AVR8js.run
<script>
let id = "@0"

if (id[0] == "@" && id[0] == "1")
  id = null

alert("-"+id)

AVR8js.build(`@input`)
   .then((e) => {
     if (e.stderr) {
       let msgs = []
       let iter = e.stderr.matchAll(/sketch\.ino:(\d+):(\d+): ([^:]+):(.+)/g)

       for(let err=iter.next(); !err.done; err=iter.next()) {
         msgs.push({
           row :    parseInt(err.value[1]) - 1,
           column : parseInt(err.value[2]),
           text :   err.value[4],
           type :   err.value[3]
         })
       }
       send.lia(e.stderr, [msgs], false)
       send.lia("LIA: stop")
     }
     else {
       console.debug(e.stdout)

       if (e.hex) {
         let runner = AVR8js.execute(e.hex, console.log, id)

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

# AVR8js - Template

## LEDs

<div id="example1">
  <wokwi-led color="red"   pin="13" port="B" label="13"></wokwi-led>
  <wokwi-led color="green" pin="12" port="B"></wokwi-led>
  <wokwi-led color="blue"  pin="11" port="B"></wokwi-led>
  <wokwi-led color="blue"  pin="10" port="B"></wokwi-led>
  <wokwi-led color="white" pin="9"  port="B"></wokwi-led>

  <wokwi-7segment port="B" digits="2" ></wokwi-7segment>

  <wokwi-pushbutton port="B" pin="12" ></wokwi-pushbutton>
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
@AVR8js.run(example1)


<div id="exmaple2">
  <wokwi-buzzer color="red"   pin="13" port="B" label="13"></wokwi-buzzer>
  <wokwi-led color="green" pin="12" port="B"></wokwi-led>
  <wokwi-led color="blue"  pin="11" port="B"></wokwi-led>
  <wokwi-led color="blue"  pin="10" port="B"></wokwi-led>
  <wokwi-led color="white" pin="9"  port="B"></wokwi-led>
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
@AVR8js.run(example2)

## asdfa


<div class="pixels"><wokwi-neopixel-matrix cols="9" rows="9"></wokwi-neopixel-matrix></div>

This is your **course** initialization stub.

Please see the [Docs](https://liascript.github.io/course/?https://raw.githubusercontent.com/liaScript/docs/master/README.md)
to find out what is possible in [LiaScript](https://liascript.github.io).

If you want to use instant help in your Atom IDE, please type **lia** to see all available shortcuts.

## Markdown

You can use common [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) syntax to create your course, such as:

1. Lists
2. ordered or

   * unordered
   * ones ...


| Header 1   | Header 2   |
| :--------- | :--------- |
| Item 1     | Item 2     |


Images:

![images](https://farm2.static.flickr.com/1618/26701766821_7bea494826.jpg)


### Extensions

     --{{0}}--
But you can also include other features such as spoken text.

      --{{1}}--
Insert any kind of audio file:

       {{1}}
?[audio](https://bigsoundbank.com/UPLOAD/mp3/1068.mp3)


     --{{2}}--
Even videos or change the language completely.

       {{2-3}}
!?[video](https://www.youtube.com/watch?v=bICfKRyKTwE)


      --{{3 Russian Female}}--
Первоначально создан в 2004 году Джоном Грубером (англ. John Gruber) и Аароном
Шварцем. Многие идеи языка были позаимствованы из существующих соглашений по
разметке текста в электронных письмах...


    {{3}}
Type "voice" to see a list of all available languages.


### Styling

<!-- class = "animated rollIn" style = "animation-delay: 2s; color: purple" -->
The whole text-block should appear in purple color and with a wobbling effect.
Which is a **bad** example, please use it with caution ...
~~ only this is red ;-) ~~ <!-- class = "animated infinite bounce" style = "color: red;" -->

## Charts

Use ASCII-Art to draw diagrams:

                                    Multiline
    1.9 |    DOTS
        |                 ***
      y |               *     *
      - | r r r r r r r*r r r r*r r r r r r r
      a |             *         *
      x |            *           *
      i | B B B B B * B B B B B B * B B B B B
      s |         *                 *
        | *  * *                       * *  *
     -1 +------------------------------------
        0              x-axis               1

## Quizzes

### A Textquiz

What did the **fish** say when he hit a **concrete wall**?

    [[dam]]

### Multiple Choice

Just add as many points as you wish:

    [[X]] Only the **X** marks the correct point.
    [[ ]] Empty ones are wrong.
    [[X]] ...

### Single Choice

Just add as many points as you wish:

    [( )] ...
    [(X)] <-- Only the **X** is allowed.
    [( )] ...

## Executable Code

A drawing example, for demonstrating that any JavaScript library can be used, also for drawing.

```javascript
// Initialize a Line chart in the container with the ID chart1
new Chartist.Line('#chart1', {
  labels: [1, 2, 3, 4],
  series: [[100, 120, 180, 200]]
});

// Initialize a Line chart in the container with the ID chart2
new Chartist.Bar('#chart2', {
  labels: [1, 2, 3, 4],
  series: [[5, 2, 8, 3]]
});
```
<script>@input</script>

<div class="ct-chart ct-golden-section" id="chart1"></div>
<div class="ct-chart ct-golden-section" id="chart2"></div>


### Projects

You can make your code executable and define projects:

``` js     -EvalScript.js
let who = data.first_name + " " + data.last_name;

if(data.online) {
  who + " is online"; }
else {
  who + " is NOT online"; }
```
``` json    +Data.json
{
  "first_name" :  "Sammy",
  "last_name"  :  "Shark",
  "online"     :  true
}
```
<script>
  // insert the JSON dataset into the local variable data
  let data = @input(1);

  // eval the script that uses this dataset
  eval(`@input(0)`);
</script>

## More

Find out what you can even do more with quizzes:

https://liascript.github.io/course/?https://raw.githubusercontent.com/liaScript/docs/master/README.md
