import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import ModalSensor from "@/components/Sensor/ModalSensor";
import ModalConnectWifi from "@/components/Sensor/ModalConnectWifi";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import BluetoothLeManager from "@/components/Bluetooth/BluetoothLeManager";
import * as SecureStore from "expo-secure-store";

import HomeGardenGrid from "@/components/Home/HomeGardenGrid";

interface AppConfig {
    API_URL: string;
}
const config = Constants.expoConfig?.extra as AppConfig;

export default function Home() {
    const router = useRouter();

    const [modalBluetoothVisible, setModalBluetoothVisible] = useState(false);
    const [modalWifiVisible, setModalWifiVisible] = useState(false);

    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState<string>("");

    const [huertos, setHuertos] = useState<any[]>([]);
    const [userId, setUserId] = useState<number | null>(null);

    const {
        requestPermissions,
        scanForPeripherals,
        connectToDevice,
        connectedDevice,
        allDevices,
        sendCredentials,
    } = BluetoothLeManager();

    const sendCredentialsRef = useRef(sendCredentials);

    useEffect(() => {
        sendCredentialsRef.current = sendCredentials;
    }, [sendCredentials]);

    // usuario
    useEffect(() => {
        const loadUser = async () => {
            const userStr = await SecureStore.getItemAsync("user");
            if (userStr) {
                const userObj = JSON.parse(userStr);
                setUserId(userObj.id);
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${config.API_URL}/allHomeVegetableGarden/${userId}`
                );
                const data = await response.json();
                setHuertos(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error al cargar huertos:", error);
                setHuertos([]);
            }
        };

        fetchData();
    }, [userId]);

    const scanForDevices = async () => {
        const isPermissionsEnable = await requestPermissions();
        if (isPermissionsEnable) {
            scanForPeripherals();
        }
    };

    const goToConnectedWifi = () => {
        setModalBluetoothVisible(false);
        setModalWifiVisible(true);
    };

    const onModalClose = () => {
        setModalBluetoothVisible(false);
    };

    const onModalWifiClose = () => {
        setModalWifiVisible(false);
    };

    const onModalOpen = async () => {
        scanForDevices();
        setModalBluetoothVisible(true);
    };

    useEffect(() => {
        if (!modalWifiVisible && password && ssid && userId) {
            sendCredentialsRef.current?.(ssid, password);

            const addSensor = async () => {
                const response = await fetch(`${config.API_URL}/addSensor`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        idUsuario: userId,
                        ip: "1.2.3.4",
                    }),
                });

                const data = await response.json();

                router.push({
                    pathname: "/sensor/AddSensor",
                    params: { sensor: data.idSensor },
                });
            };

            addSensor();
        }
    }, [modalWifiVisible, password, ssid, userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>

            {huertos.length === 0 ? (
                <Text style={styles.empty}>
                    No tienes huertos registrados 
                </Text>
            ) : (
                <HomeGardenGrid huertos={huertos} />
            )}

            <View style={styles.buttonAdd}>
                <TouchableOpacity onPress={onModalOpen}>
                    <MaterialIcons name="add" size={28} color="#f9f9f9" />
                </TouchableOpacity>
                { modalBluetoothVisible && (<ModalSensor
                    items={allDevices}
                    isVisible={modalBluetoothVisible}
                    connectedToPeripheral={connectToDevice}
                    goToConnectedWifi={goToConnectedWifi}
                    onClose={onModalClose}>
                    <></>
                </ModalSensor>)}

                { modalWifiVisible && (<ModalConnectWifi
                    ssid={ssid}
                    setSsid={setSsid}
                    password={password}
                    setPassword={setPassword}
                    isVisible={modalWifiVisible}
                    onClose={onModalWifiClose}>
                    <></>
                </ModalConnectWifi> )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        position: "relative",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#666",
    },
    buttonAdd: {
        backgroundColor: "#6A1B9A",
        position: "absolute",
        bottom: 5,
        right: 15,
        borderRadius: 10,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
});
