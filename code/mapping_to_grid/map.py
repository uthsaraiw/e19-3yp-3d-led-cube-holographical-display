import numpy as np
from mayavi import mlab
from skimage import measure
import os

def read_obj_file(file_path):
    vertices = []
    faces = []
    with open(file_path, 'r') as f:
        for line in f:
            parts = line.split()
            if len(parts) > 0:
                if parts[0] == 'v':
                    vertex = list(map(float, parts[1:]))
                    vertices.append(vertex)
                elif parts[0] == 'f':
                    face = [int(v.split('/')[0]) - 1 for v in parts[1:]]
                    faces.extend(face)
    return np.array(vertices), np.array(faces)

def map_to_grid(vertices, faces, grid_size):
    min_coords = np.min(vertices, axis=0)
    max_coords = np.max(vertices, axis=0)
    normalized_coords = (vertices - min_coords) / (max_coords - min_coords)
    scaled_coords = normalized_coords * (grid_size - 1)
    grid = np.zeros((grid_size, grid_size, grid_size), dtype=int)
    faces = faces.reshape((len(faces) // 3, 3))

    for face in faces:
        face_coords = scaled_coords[face, :]
        rounded_coords = np.round(face_coords).astype(int)
        grid[rounded_coords[:, 0], rounded_coords[:, 1], rounded_coords[:, 2]] = 1

    return grid

def extract_surface(grid):
    verts, faces, _, _ = measure.marching_cubes(grid, level=0, spacing=(1, 1, 1))
    return verts, faces

file_path = 'new sphere.obj'
grid_size = 16

vertices, faces = read_obj_file(file_path)
grid = map_to_grid(vertices, faces, grid_size)

mlab.figure(bgcolor=(0, 0, 0), size=(800, 800))

# Assuming your 16x16x16 grid spans a certain range in each dimension (adjust these as needed)
x_range = np.linspace(0, 15, 16)
y_range = np.linspace(0, 15, 16)
z_range = np.linspace(0, 15, 16)

# Generate the grid points
grid_points = np.array(np.meshgrid(x_range, y_range, z_range)).reshape(3, -1).T

# Plot the 16x16x16 grid points
mlab.points3d(grid_points[:, 0], grid_points[:, 1], grid_points[:, 2], color=(0.5, 0.5, 0.5), mode='point', scale_factor=10)

# Plot surface points from the object
verts, faces_surface = extract_surface(grid)
mlab.points3d(verts[:, 0], verts[:, 1], verts[:, 2], color=(1, 1, 0), mode='point', scale_factor=10)

mlab.show()
