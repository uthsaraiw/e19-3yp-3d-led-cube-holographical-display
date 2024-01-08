import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:typed_data';
import 'dart:convert';
import 'package:sensors/sensors.dart';
import 'package:http/http.dart' as http;

String gyroscopeData = ''; // Define the variable gyroscopeData
final TextEditingController emailController = TextEditingController();
final TextEditingController passwordController = TextEditingController();
BluetoothConnection? bluetoothConnection;

void main() {
  requestPermissions(); // Call requestPermissions function
  runApp(MyApp());
}

void requestPermissions() async {
  Map<Permission, PermissionStatus> statuses = await [
    Permission.location,
    Permission.storage,
  ].request();
  print(statuses[Permission.location]);
  print(statuses[Permission.storage]);
}

void enableBluetooth() {
  FlutterBluetoothSerial.instance
      .requestEnable(); // Request Bluetooth to be turned on
}

void getPairedDevices(BuildContext context) {
  FlutterBluetoothSerial.instance
      .getBondedDevices() // Get list of paired devices
      .then((List<BluetoothDevice> pairedDevices) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Paired Devices'),
          content: SingleChildScrollView(
            child: ListBody(
              children: pairedDevices.map((device) {
                return GestureDetector(
                  child: Text(device.name ?? ''),
                  onTap: () {
                    connectToDevice('00:19:10:09:23:2F');
                    Navigator.of(context).pop();
                  },
                );
              }).toList(),
            ),
          ),
        );
      },
    );
  });
}

void connectToDevice(String address) {
  BluetoothConnection.toAddress(address).then((connection) {
    bluetoothConnection = connection;

    // ...

    bluetoothConnection?.input?.listen((List<int> data) {
      // Use a logging framework instead of print
      // Example: logger.info('Received data from the device');
      print('Received data from the device');
    }).onDone(() {
      // Use a logging framework instead of print
      // Example: logger.info('Disconnected by remote request');
      print('Disconnected by remote request');
    });
  });
}

void sendDataToConnectedDevice(String data) {
  if (bluetoothConnection != null && bluetoothConnection!.isConnected) {
    bluetoothConnection?.output?.add(Uint8List.fromList(utf8.encode(data)));
    bluetoothConnection?.output?.allSent.then((_) {
      // Use a logging framework instead of print
      // Example: logger.info('Data sent successfully');
      print('Data sent successfully');
    }).catchError((error) {
      // Use a logging framework instead of print
      // Example: logger.error('Failed to send data: $error');
      print('Failed to send data: $error');
    });
  } else {
    // Use a logging framework instead of print
    // Example: logger.warning('No connected device');
    print('No connected device');
  }
}

void sendBytesToConnectedDevice(Uint8List bytes) {
  if (bluetoothConnection != null && bluetoothConnection!.isConnected) {
    bluetoothConnection?.output?.add(bytes);
    bluetoothConnection?.output?.allSent.then((_) {
      // Use a logging framework instead of print
      // Example: logger.info('Bytes sent successfully');
      print('Bytes sent successfully');
    }).catchError((error) {
      // Use a logging framework instead of print
      // Example: logger.error('Failed to send bytes: $error');
      print('Failed to send bytes: $error');
    });
  } else {
    // Use a logging framework instead of print
    // Example: logger.warning('No connected device');
    print('No connected device');
  }
}

//getting gyroscope data
void printGyroscopeData(BuildContext context) {
  gyroscopeEvents.listen((GyroscopeEvent event) {
    gyroscopeData = 'X: ${event.x}\nY: ${event.y}\nZ: ${event.z}';
  });
}

void loginForm(BuildContext context) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text('Login'),
        content: SingleChildScrollView(
          child: ListBody(
            children: [
              Padding(
                padding: EdgeInsets.symmetric(vertical: 6.0),
                child: TextField(
                  controller: emailController,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Email',
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 6.0),
                child: TextField(
                  controller: passwordController,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Password',
                  ),
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            child: Text('Login'),
            onPressed: () {
              print(emailController.text);
              print(passwordController.text);
              Navigator.of(context).pop();
            },
          ),
        ],
      );
    },
  );
}

//change this to convert to a binary format
Future<int> fetchDataFromAPI(String n) async {
  final response = await http
      .get(Uri.parse('https://jsonplaceholder.typicode.com/todos/$n'));
  if (response.statusCode == 200) {
    final json = jsonDecode(response.body);
    print(json);
    return json["id"];
  } else {
    throw Exception('Failed to fetch data from API');
  }
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String gyroscopeData = '';

  @override
  void initState() {
    super.initState();
    gyroscopeEvents.listen((GyroscopeEvent event) {
      setState(() {
        gyroscopeData = 'X: ${event.x}, \nY: ${event.y}, \nZ: ${event.z}';
      });
    });
  }

  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('HoloCube App'),
        ),
        body: Builder(
          builder: (BuildContext context) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(
                    child: const Text('Enable Bluetooth'),
                    onPressed: () {
                      enableBluetooth(); // Call enableBluetooth function
                      ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Bluetooth enabled')));
                    },
                  ),
                  ElevatedButton(
                    child: const Text('Get Paired Devices'),
                    onPressed: () {
                      getPairedDevices(
                          context); // Call getPairedDevices function
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                          content: Text('Fetching paired devices')));
                    },
                  ),
                  ElevatedButton(
                    child: const Text('send data'),
                    onPressed: () {
                      sendDataToConnectedDevice(
                          '$gyroscopeData'); // Call getPairedDevices function
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                          content: Text('Fetching paired devices')));
                    },
                  ),
                  ElevatedButton(
                    child: const Text('Download Cube'),
                    onPressed: () {
                      fetchDataFromAPI(emailController.text).then((data) {
                        ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Downloading Cube Data')));
                        print(data);
                      }).catchError((error) {
                        ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                                content: Text('Failed to download Cube Data')));
                        print(error);
                      });
                    },
                  ),
                  ElevatedButton(
                    child: const Text('Login'), // Added login button
                    onPressed: () {
                      {
                        loginForm(context);
                      }
                      ;
                    },
                  ), /*
                  Text(

                    '\n\n\n\n\n\n\n'
                    'Gyroscope Data:\n$gyroscopeData',
                    textAlign: TextAlign.center,
                  ),*/
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
