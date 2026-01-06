import { PermissionsAndroid, Platform } from "react-native";
import { useMemo, useState } from "react";
import { 
    BleManager, 
    Device,
} from "react-native-ble-plx";

import * as expoDevice from "expo-device";

const SERVICE_UUID = "e72640a5-7d6f-401a-b506-8355a871f404";
const SSID_CHAR_UUID = "92f0538e-66f2-48f4-bf43-94e3d3fdf475";
const PASS_CHAR_UUID = "53c48d51-2386-4584-8a8b-eb17ad324324";

interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    connectToDevice: (deviceId: Device) => Promise<void>;
    disconnectFromDevice: () => void;
    sendCredentials: (ssid: string, pass: string) => Promise<void>;
    connectedDevice: Device | null;
    allDevices: Device[];
}

function BluetoothLeManager(): BluetoothLowEnergyApi{
    const bleManager = useMemo(() => new BleManager(), []);
    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    const [heartRate, setHeartRate] = useState<number>(0);

    const requestAndroid31Permissions = async () => {
        const bluetoothScanPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Location Permission",
                message: "Bluetooth Low Energy requires Location",
                buttonPositive: "OK",
            }
        );

        const bluetoothConnectPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Location Permission",
                message: "Bluetooth Low Energy requires Location",
                buttonPositive: "OK",
            }
        );

        const fineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "Bluetooth Low Energy requires Location",
                buttonPositive: "OK",
            }
        );

        return (
            bluetoothScanPermission === "granted" &&
            bluetoothConnectPermission === "granted" &&
            fineLocationPermission === "granted"
        );
    };

    const requestPermissions = async () => {
        if (Platform.OS === "android"){
            if ((expoDevice.platformApiLevel ?? -1 ) < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "Bluetooth Low Energy requires Location",
                        buttonPositive: "OK",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const isAndroid31PermissionsGranted = await requestAndroid31Permissions();

                return isAndroid31PermissionsGranted;
            }
        } else {
            return true;
        }
    };

    const isDuplicteDevice = (devices: Device[], nextDevice: Device) => 
        devices.findIndex((device) => nextDevice.id === device.id) > -1;

    const scanForPeripherals = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error){
                console.log(error);
            }
            if (device && device.name?.includes("HomeGarden")){
                setAllDevices((prevState: Device[]) => {
                    if (!isDuplicteDevice(prevState, device)) {
                        return [...prevState, device];
                    }
                    return prevState;
                });
            }
        });
    }

    const connectToDevice = async (device: Device) => {
        try {
            const deviceConnection = await bleManager.connectToDevice(device.id);
            setConnectedDevice(deviceConnection);
            await deviceConnection.discoverAllServicesAndCharacteristics();
            bleManager.stopDeviceScan();
        } catch (err) {
            console.log("FAILED TO CONNECT", err);
        }
    };

    const disconnectFromDevice = () => {
        if (connectedDevice){
            bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
            setHeartRate(0);
        }
    };

    const sendCredentials = async (ssid: string, pass: string) => {
        try {
            await connectedDevice?.writeCharacteristicWithResponseForService(
                SERVICE_UUID,
                SSID_CHAR_UUID,
                Buffer.from(ssid).toString("base64")
            );

            await connectedDevice?.writeCharacteristicWithResponseForService(
                SERVICE_UUID,
                PASS_CHAR_UUID,
                Buffer.from(pass).toString("base64")
            );
        } catch (err) {
            console.log("Error enviando datos: ", err);
        }
    }

    return {
        requestPermissions,
        scanForPeripherals,
        connectToDevice,
        allDevices,
        connectedDevice,
        disconnectFromDevice,
        sendCredentials,
    }
}

export default BluetoothLeManager;