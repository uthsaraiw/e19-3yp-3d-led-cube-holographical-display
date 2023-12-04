#include <Arduino.h>
// This is a simple example of how to use the shift register
// and here I used only one shift register
int clearPin = 5;
int serialData = 6;
int clockPin = 7;
int latchPin = 8;

void setup()
{

    pinMode(clearPin, OUTPUT);
    pinMode(serialData, OUTPUT);
    pinMode(clockPin, OUTPUT);
    pinMode(latchPin, OUTPUT);

    digitalWrite(clearPin, LOW);  // pin is ative-low, this clerars the shift register
    digitalWrite(clearPin, HIGH); // Pin is inactive
}

void loop()
{
    for (int i = 0; i < 256; i++)
    {
        digitalWrite(latchPin, LOW); // Pull latch LOW to start sending data
        shiftOut(serialData, clockPin, MSBFIRST, i);
        digitalWrite(latchPin, HIGH); // Pull latch HIGH to stop sending data
        delay(500);
    }
}