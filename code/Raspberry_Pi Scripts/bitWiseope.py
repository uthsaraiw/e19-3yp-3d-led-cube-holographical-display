layers =  1
print(layers)

result_not = ~layers

outputVal = format (result_not & 0xFFFF, '016b')
print(outputVal)
print("-----------------")
while(True):
    layers =1
    for i in range (16):
        if i == 0:
            layers = layers <<0
        else:
            layers = layers <<1
        result_not = ~layers
        outputVal = format (result_not & 0xFFFF, '016b')
        print(outputVal)