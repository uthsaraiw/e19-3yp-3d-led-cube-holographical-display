import json
import time


# Read data from the JSON file

while 1:
    with open("test.json") as config_file:
        config_data = json.load(config_file)

    var = config_data["var"]
    time.sleep(3)
    print(f"var is: {var}")