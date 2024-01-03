import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

data_pin = 16
clock_pin = 21
latch_pin = 20

GPIO.setup(data_pin, GPIO.OUT)
GPIO.setup(clock_pin, GPIO.OUT)
GPIO.setup(latch_pin, GPIO.OUT)

ledpattern = [
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 1, 0, 0, 0],
[0, 0, 1, 1, 1, 1, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 0],
[0, 0, 1, 1, 1, 1, 0, 0],
[0, 0, 0, 1, 1, 0, 0, 0],

]
GPIO.output(latch_pin, GPIO.LOW)

for x in range(8):
    for y in range(8):
        GPIO.output(clock_pin, GPIO.LOW)
        GPIO.output(data_pin, ledpattern[x][y])
        GPIO.output(clock_pin, GPIO.HIGH)
        print(x,"is set to", ledpattern[x][y])
GPIO.output(latch_pin, GPIO.HIGH)

