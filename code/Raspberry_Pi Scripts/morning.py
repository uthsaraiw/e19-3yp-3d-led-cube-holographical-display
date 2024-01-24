import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
import time

data_pin = 16
clock_pin = 21
latch_pin = 20

data_pin_C = 13
clock_pin_C = 6
latch_pin_C = 5

def ShiftReg_send_data(data_pin, clock_pin, latch_pin, data):
    # Code to control the shift register
    for bit in data:
        for single_bit in bit:
			#bitInt = int(bit)
            GPIO.output(clock_pin, GPIO.LOW)
            print(bit)
            GPIO.output(data_pin, single_bit)
            GPIO.output(clock_pin, GPIO.HIGH)
    GPIO.output(latch_pin, GPIO.HIGH)
    # time.sleep(0.1)
    GPIO.output(latch_pin, GPIO.LOW)

GPIO.setup(data_pin, GPIO.OUT)
GPIO.setup(clock_pin, GPIO.OUT)
GPIO.setup(latch_pin, GPIO.OUT)
GPIO.setup(data_pin_C, GPIO.OUT)
GPIO.setup(clock_pin_C, GPIO.OUT)
GPIO.setup(latch_pin_C, GPIO.OUT)

ledpattern = [
[1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1],

]
GPIO.output(latch_pin, GPIO.LOW)

for x in range(8):
    for y in range(8):
        GPIO.output(clock_pin, GPIO.LOW)
        GPIO.output(data_pin, ledpattern[x][y])
        GPIO.output(clock_pin, GPIO.HIGH)
        print(x,"is set to", ledpattern[x][y])
GPIO.output(latch_pin, GPIO.HIGH)
while True:
    layers =1
    for i in range (16):
        if i == 0:
            layers = layers <<0
        else:
            layers = layers <<1
        result_not = ~layers
        outputVal = format (result_not & 0xFFFF, '016b')
        cathode_list=[]
        cathode_list.append([int(bit) for bit in outputVal])
        ShiftReg_send_data(data_pin_C,clock_pin_C,latch_pin_C,cathode_list)
        time.sleep(1)
