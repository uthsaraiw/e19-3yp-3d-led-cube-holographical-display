import threading
import RPi.GPIO as GPIO
import os
import numpy as np

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

current_file_path = os.path.abspath(__file__)
map_file_path = os.path.join(os.path.dirname(current_file_path), 'map.txt')

cube = []

# Define the pin numbers for each shift register
shift_registers = [
    {"data_pin": 16, "clock_pin": 21, "latch_pin": 20},
    {"data_pin": 17, "clock_pin": 22, "latch_pin": 23},
    {"data_pin": 18, "clock_pin": 24, "latch_pin": 25},
    {"data_pin": 19, "clock_pin": 26, "latch_pin": 27},
    {"data_pin": 13, "clock_pin": 6, "latch_pin": 5},
]

def initialize_registers (data_pin, clock_pin, latch_pin):
    GPIO.setup(data_pin, GPIO.OUT)
    GPIO.setup(clock_pin, GPIO.OUT)
    GPIO.setup(latch_pin, GPIO.OUT)

def ShiftReg_send_data(data_pin, clock_pin, latch_pin, data):
	# Code to control the shift register
	for bit in data:
		for single_bit in bit:
			bitInt = int(single_bit)
			GPIO.output(clock_pin, GPIO.LOW)
			print(bit)
			GPIO.output(data_pin, bitInt)
			GPIO.output(clock_pin, GPIO.HIGH)
	GPIO.output(latch_pin, GPIO.HIGH)
	# time.sleep(0.1)
	GPIO.output(latch_pin, GPIO.LOW)

with open(map_file_path, 'r') as file:
    layer = []
    for i, line in enumerate(file):
        layer.append([int(x) for x in line.strip().split()])
        
        # If this was the 16th row of the layer, add the layer to the cube
        if (i + 1) % 16 == 0:
            cube.append(layer)
            layer = []

# Convert the cube to a 3D numpy array
cube = np.array(cube)

# Create and start a new thread for each shift register
data = [1, 0, 1, 0, 1, 0, 1, 0] * 8  # 64-bit binary data

for shift_register in shift_registers:
    initialize_registers(shift_register["data_pin"], shift_register["clock_pin"], shift_register["latch_pin"])

for t in range(1):
	layers =1
	for i in range (16):
		if i == 0:
			layers = layers <<0
		else:
			layers = layers <<1
		result_not = ~layers
		outputVal = format (result_not & 0xFFFF, '016b')
		cathode_list = []
		dataSectionA =[]
		dataSectionB =[]
		dataSectionC =[]
		dataSectionD =[]
        
		cathode_list.append([int(bit) for bit in outputVal])
        
		for x in range(0,128,16):
			dataSectionA.append(cube[i][x:x+8])
			dataSectionB.append(cube[i][x+8:x+16])
			dataSectionC.append(cube[i][x+128:x+136])
			dataSectionD.append(cube[i][x+136:x+144])
            
        # SectionA = threading.Thread(target=ShiftReg_send_data, args=(shift_registers[0]["data_pin"], shift_registers[0]["clock_pin"], shift_registers[0]["latch_pin"], dataSectionA)).start()
        # SectionB = threading.Thread(target=ShiftReg_send_data, args=(shift_registers[1]["data_pin"], shift_registers[1]["clock_pin"], shift_registers[1]["latch_pin"], dataSectionB)).start()
        # SectionC = threading.Thread(target=ShiftReg_send_data, args=(shift_registers[2]["data_pin"], shift_registers[2]["clock_pin"], shift_registers[2]["latch_pin"], dataSectionC)).start()
        # SectionD = threading.Thread(target=ShiftReg_send_data, args=(shift_registers[3]["data_pin"], shift_registers[3]["clock_pin"], shift_registers[3]["latch_pin"], dataSectionD)).start()
        # Cathodes = threading.Thread(target=ShiftReg_send_data, args=(shift_registers[4]["data_pin"], shift_registers[4]["clock_pin"], shift_registers[4]["latch_pin"], cathode_list)).start()
		threads = []
		for i, data_section in enumerate([dataSectionA, dataSectionB, dataSectionC, dataSectionD]):
			thread = threading.Thread(target=ShiftReg_send_data, args=(shift_registers[i]["data_pin"], shift_registers[i]["clock_pin"], shift_registers[i]["latch_pin"], data_section))
			thread.start()
			threads.append(thread)

		cathodes_thread = threading.Thread(target=ShiftReg_send_data, args=(shift_registers[4]["data_pin"], shift_registers[4]["clock_pin"], shift_registers[4]["latch_pin"], cathode_list))
		cathodes_thread.start()
		threads.append(cathodes_thread)

		# Wait for all threads to finish
		for thread in threads:
			thread.join()    

		print("current Layers:",outputVal, "Sussesfully sent data")
		print("Main thread is running")
        
	#sleep(1)
        
print("Main thread is running")
	 
