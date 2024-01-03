import RPi.GPIO as GPIO
import threading
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Define the pin numbers for each LED matrix
led_matrices = [
    {"data_pin": 16, "clock_pin": 21, "latch_pin": 20},
    {"data_pin": 17, "clock_pin": 22, "latch_pin": 23},
    {"data_pin": 18, "clock_pin": 24, "latch_pin": 25},
    {"data_pin": 19, "clock_pin": 26, "latch_pin": 27},
]

# Define the LED patterns for each LED matrix
led_patterns = [
    # Add your LED patterns here
]

def control_led_matrix(data_pin, clock_pin, latch_pin, led_pattern):
    GPIO.setup(data_pin, GPIO.OUT)
    GPIO.setup(clock_pin, GPIO.OUT)
    GPIO.setup(latch_pin, GPIO.OUT)

    GPIO.output(latch_pin, GPIO.LOW)

    for x in range(8):
        for y in range(8):
            GPIO.output(clock_pin, GPIO.LOW)
            GPIO.output(data_pin, led_pattern[x][y])
            GPIO.output(clock_pin, GPIO.HIGH)
        GPIO.output(latch_pin, GPIO.HIGH)
        time.sleep(0.1)
        GPIO.output(latch_pin, GPIO.LOW)

# Create and start a new thread for each LED matrix
for i in range(4):
    threading.Thread(target=control_led_matrix, args=(led_matrices[i]["data_pin"], led_matrices[i]["clock_pin"], led_matrices[i]["latch_pin"], led_patterns[i])).start()