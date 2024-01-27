import numpy as np

def read_hex_file(hex_file_path):
    try:
        with open(hex_file_path, 'r') as hex_file:
            hex_string = hex_file.read()
    except FileNotFoundError:
        print(f"Error: File '{hex_file_path}' not found.")
        return None
    except PermissionError:
        print(f"Error: Permission denied to open file '{hex_file_path}'.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

    return hex_string

def hex_to_array(hex_string, array_shape=(16, 16, 16)):
    try:
        # Convert hexadecimal string to decimal values
        decimal_values = [int(hex_string[i:i+2], 16) for i in range(0, len(hex_string), 2)]

        # Convert decimal values to binary and reshape into the array shape
        binary_array = np.array([int(format(value, '08b')[i]) for value in decimal_values for i in range(8)], dtype=np.uint8)
        binary_array = binary_array.reshape(array_shape)

        return binary_array
    except Exception as e:
        print(f"Error converting hex to array: {e}")
        return None
    
def save_array_to_txt(array, txt_file_path, columns=16):
    try:
        reshaped_array = array.reshape(-1, columns)
        np.savetxt(txt_file_path, reshaped_array, fmt="%d", delimiter=" ")
        print(f"Array successfully saved to '{txt_file_path}'.")
    except Exception as e:
        print(f"Error saving array to txt file: {e}")


def save_array_to_txt(array, txt_file_path, rows=8, columns=8):
    try:
        reshaped_array = array.reshape(rows, columns)
        np.savetxt(txt_file_path, reshaped_array, fmt="%d", delimiter=" ")
        print(f"Array successfully saved to '{txt_file_path}'.")
    except Exception as e:
        print(f"Error saving array to txt file: {e}")



# Example usage
hex_file_path = 'common_matrix.hex'
hex_string = read_hex_file(hex_file_path)

if hex_string is not None:
    binary_array = hex_to_array(hex_string, array_shape=(16, 16, 16))
    
    if binary_array is not None:
        # Save the binary array to a text file
        txt_file_path = 'binary_array.txt'
        save_array_to_txt(binary_array, txt_file_path,16)

# Example 16x16x16 array (you can replace it with your actual data)
array_16x16x16 = binary_array

# Separate layers of the 16x16x16 array
layers = [array_16x16x16[:, :, i] for i in range(array_16x16x16.shape[2])]

# Divide each layer into 8x8 arrays A, B, C, D
arrays_A = [layer[:8, :8] for layer in layers]
arrays_B = [layer[:8, 8:] for layer in layers]
arrays_C = [layer[8:, :8] for layer in layers]
arrays_D = [layer[8:, 8:] for layer in layers]

# Save divided arrays A, B, C, D to text files
for i, (arr_A, arr_B, arr_C, arr_D) in enumerate(zip(arrays_A, arrays_B, arrays_C, arrays_D)):
    txt_file_path_A = f'array_A_layer_{i}.txt'
    txt_file_path_B = f'array_B_layer_{i}.txt'
    txt_file_path_C = f'array_C_layer_{i}.txt'
    txt_file_path_D = f'array_D_layer_{i}.txt'

    save_array_to_txt(arr_A, txt_file_path_A,8,8)
    save_array_to_txt(arr_B, txt_file_path_B,8,8)
    save_array_to_txt(arr_C, txt_file_path_C,8,8)
    save_array_to_txt(arr_D, txt_file_path_D,8,8)
'''
# Optionally, print the resulting arrays as well
for i, (arr_A, arr_B, arr_C, arr_D) in enumerate(zip(arrays_A, arrays_B, arrays_C, arrays_D)):
    print(f"\nLayer {i + 1} - Array A:")
    print(arr_A)
    print(f"\nLayer {i + 1} - Array B:")
    print(arr_B)
    print(f"\nLayer {i + 1} - Array C:")
    print(arr_C)
    print(f"\nLayer {i + 1} - Array D:")
    print(arr_D)
'''

# Connect all the A matrices into one matrix with 8 columns and 128 rows
connected_A_matrix = np.concatenate(arrays_A, axis=0)
connected_B_matrix = np.concatenate(arrays_B, axis=0)
connected_C_matrix = np.concatenate(arrays_C, axis=0)
connected_D_matrix = np.concatenate(arrays_D, axis=0)

# Save the connected A matrix to a text file
txt_file_path_connected_A = 'connected_A_matrix.txt'
save_array_to_txt(connected_A_matrix, txt_file_path_connected_A, rows=128, columns=8)
txt_file_path_connected_A = 'connected_B_matrix.txt'
save_array_to_txt(connected_B_matrix, txt_file_path_connected_A, rows=128, columns=8)
txt_file_path_connected_A = 'connected_C_matrix.txt'
save_array_to_txt(connected_C_matrix, txt_file_path_connected_A, rows=128, columns=8)
txt_file_path_connected_A = 'connected_D_matrix.txt'
save_array_to_txt(connected_D_matrix, txt_file_path_connected_A, rows=128, columns=8)


# Optionally, print the resulting connected A matrix
print("\nConnected A Matrix:")
A_array = connected_A_matrix.reshape(16, 64)
A = A_array.tolist()
print(A)

print("\nConnected B Matrix:")
B_array = connected_B_matrix.reshape(16, 64)
B = B_array.tolist()
print(B)

print("\nConnected C Matrix:")
C_array = connected_C_matrix.reshape(16, 64)
C = C_array.tolist()
print(C)

print("\nConnected D Matrix:")
D_array = connected_D_matrix.reshape(16, 64)
D = D_array.tolist()
print(D)


