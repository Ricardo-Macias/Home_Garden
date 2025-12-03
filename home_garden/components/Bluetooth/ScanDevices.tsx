import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Button, FlatList } from "react-native";
import { BleManager } from "react-native-ble-plx";

export default function ScanDevicesBluetooth( {} ) {
    const manager = new BleManager();
    const router = useRouter();
    const [devices, setDevices] = useState<any[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<any>(null);

    const handleConnect = () => {
        router.push({
            pathname: "/sensor/ConnectWifi",
            params: {
                deviceId: connectedDevice.id ,
            },
        });
    }

    const scanForDevices = () => {
        console.log("Escaneando ...")
        setDevices([]);

        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log("Error en el escaneo: ", error);
                return;
            }

            if (device?.name === "HomeGarden") {
                console.log("Encontrado: ", device.name);

                setDevices((prev) => {
                    const exists = prev.find(d => d.id === device.id);
                    if (!exists) return [...prev, device];
                    return prev;
                });
            }
        });
        setTimeout(() => {
            manager.stopDeviceScan();
            console.log("Escaneo detenido");
        }, 5000);
    };

    const connectToDevice = async (device: any) => {
        try {
            const connected = await device.connect();
            await connected.discoverAllServicesAndCharacteristics();

            console.log("Conectado a: ", connected.name);
            setConnectedDevice(connected);

            manager.stopDeviceScan();
            handleConnect();
        } catch (err) {
            console.log("Error al conectar: ", err);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Button title="Escanear ESP32" onPress={scanForDevices}/>

            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Button 
                     title={`Conectar a ${item.name}`}
                     onPress={() => connectToDevice(item)}
                    />
                )}
            />
        </View>
    )
}