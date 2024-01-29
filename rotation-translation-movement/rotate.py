import numpy as np
import numpy as np

def rotate_xy(matrix, angle=10.0):
    # Convert angle to radians
    angle_rad = np.radians(angle)

    # Get the dimensions of the matrix
    rows = len(matrix)
    cols = len(matrix[0])

    # Calculate the center point of the matrix
    center_x = (cols - 1) / 2
    center_y = (rows - 1) / 2

    # Create a new matrix to store the rotated values
    rotated_matrix = [[0] * cols for _ in range(rows)]

    # Iterate over each element in the matrix
    for y in range(rows):
        for x in range(cols):
            # Calculate the coordinates relative to the center point
            rel_x = x - center_x
            rel_y = y - center_y

            # Apply the rotation transformation
            new_x = rel_x * np.cos(angle_rad) - rel_y * np.sin(angle_rad)
            new_y = rel_x * np.sin(angle_rad) + rel_y * np.cos(angle_rad)

            # Calculate the new coordinates relative to the original matrix
            new_x += center_x
            new_y += center_y

            # Round the coordinates to the nearest integer
            new_x = int(round(new_x))
            new_y = int(round(new_y))

            # Check if the new coordinates are within the matrix bounds
            if 0 <= new_x < cols and 0 <= new_y < rows:
                # Assign the rotated value to the new matrix
                rotated_matrix[y][x] = matrix[new_y][new_x]

    return rotated_matrix

    
def rotate_matz(matrix, angle=10):
    #rotate a matrix around z axis
    rotated_matrix = []
    for i in range(len(matrix)):
        rotated_matrix.append(rotate_xy(matrix[i], angle).tolist())
    return rotated_matrix

def rotate_matx(matrix, angle=10):
    #repeate for all layers in x axis
    #cteate a plan in x axis
    planed = []
    for i in range(len(matrix)):
        planed.append([])
        for j in range(len(matrix[0])):  
            planed[i].append([])
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            for k in range(len(matrix[0][0])):
                planed[i][j].append(matrix[k][j][i])
    #rotate the plan
    matrix = rotate_matz(planed, angle=angle)
    #map the plan to the matrix
    
    planed = []
    for i in range(len(matrix)):
        planed.append([])
        for j in range(len(matrix[0])):  
            planed[i].append([])
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            for k in range(len(matrix[0][0])):
                planed[i][j].append(matrix[k][j][i])

    return planed


def rotate_maty(matrix, angle=10):
    #repeate for all layers in y axis
    #cteate a plan in y axis
    planed = []
    for i in range(len(matrix)):
        planed.append([])
        for j in range(len(matrix[0])):  
            planed[i].append([])
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            for k in range(len(matrix[0][0])):
                planed[i][j].append(matrix[k][i][j]) 
    #rotate the plan
    matrix = rotate_matz(planed, angle=angle)
    #map the plan to the matrix
    planed = []
    for i in range(len(matrix)):
        planed.append([])
        for j in range(len(matrix[0])):  
            planed[i].append([])
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            for k in range(len(matrix[0][0])):
                planed[i][j].append(matrix[j][k][i])
    return planed

#rotated_matrix = rotate_maty([[[1, 2], [3, 4]], [[5, 6], [7, 8]]],90)
#print(rotated_matrix)

print(rotate_xy([[0, 1,0], 
                 [0, 1, 0]],
                  [0, 1, 0]),90)