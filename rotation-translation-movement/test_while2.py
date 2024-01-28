import json
import time


# Read data from the JSON file
with open("test.json", "r+") as config_file:
    config_data = json.load(config_file)

    while True:
        time.sleep(1)
        config_data["var"].append(1)
        print(config_data["var"])
        config_file.seek(0)  # Move the file pointer to the beginning
        json.dump(config_data, config_file, indent=4)
        config_file.truncate()  # Remove the remaining content in the file


