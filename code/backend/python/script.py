import numpy as np
import plotly.graph_objects as go

# Open the hex file and read the data
with open("data.hex", "rb") as f:
    hex_string = f.read().hex()

# Convert the hex string to a binary string
binary_string = "".join(
    [
        bin(int(hex_string[i : i + 2], 16))[2:].zfill(8)
        for i in range(0, len(hex_string), 2)
    ]
)

# Convert the binary string to a list of integers
integers = [int(bit) for bit in binary_string]

# Convert the list of integers into a 16x16x16 matrix
matrix = np.array(integers).reshape((16, 16, 16))

# Create the x, y, and z coordinates and the color
x, y, z = np.indices((16, 16, 16))
color = matrix.flatten()

# Create a Plotly figure with a 3D scatter plot
fig = go.Figure(
    data=go.Scatter3d(
        x=x.flatten(),
        y=y.flatten(),
        z=z.flatten(),
        mode="markers",
        marker=dict(
            size=2,
            color=color,  # set color to an array/list of desired values
            colorscale="Viridis",  # choose a colorscale
            opacity=0.8,
        ),
    )
)

# Show the figure
fig.show()
