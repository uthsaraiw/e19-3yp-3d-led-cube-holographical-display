import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)

# Define the GPIO pins for the shift registers
data_pin = 16
clock_pin = 21
latch_pin = 20

GPIO.setup(data_pin, GPIO.OUT)
GPIO.setup(clock_pin, GPIO.OUT)
GPIO.setup(latch_pin, GPIO.OUT)

ledpattern = [1,1,0,1,1,1,0,1]

GPIO.output(latch_pin, GPIO.LOW)

for x in range(8):
    GPIO.output(clock_pin, GPIO.LOW)
    GPIO.output(data_pin, ledpattern[x])
    GPIO.output(clock_pin, GPIO.HIGH)
    
GPIO.output(latch_pin, GPIO.HIGH)

