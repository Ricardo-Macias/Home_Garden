import React, { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { BleManager } from "react-native-ble-plx";

export default function ScanDevicesBluetooth() {
    const manager = new BleManager();
    const [devices, setDevices] = useState<any[]>([]);

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

    const connectToDevice = (device: any) => {
        console.log("Conectando a: ", device.name);

        device.connect()
            .then((d: any) => {
                console.log("Conectado : ", d.id);
            })
            .catch((err: any) => {
                console.log("Error al conectar ", err);
            });
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