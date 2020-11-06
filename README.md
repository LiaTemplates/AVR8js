<!--
author:   André Dietrich

email:    LiaScript@web.de

version:  0.0.1

language: en

narrator: US English Female

comment:  Try to write a short comment about
          your course, multiline is also okay.

script:   https://cdn.jsdelivr.net/gh/liatemplates/avr8js@main/dist/index.js

@AVR8js.run
<script>
let id = "@0"

if (id[0] == "@" && id[0] == "1")
  id = null

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

<div id="example1">
  <wokwi-led color="red"   pin="13" port="B" label="13"></wokwi-led>
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
@AVR8js.run(example1)


<div id="exmaple2">
  <wokwi-buzzer color="red"   pin="13" port="B" label="13"></wokwi-buzzer>
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
@AVR8js.run(example2)
