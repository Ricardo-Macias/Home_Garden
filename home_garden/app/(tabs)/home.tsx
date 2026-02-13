import { Text, View, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import ModalSensor from "@/components/Sensor/ModalSensor";
import ModalConnectWifi from "@/components/Sensor/ModalConnectWifi";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BluetoothLeManager from "@/components/Bluetooth/BluetoothLeManager";
import * as SecureStore from "expo-secure-store";

import HomeGardenGrid from "@/components/Home/HomeGardenGrid";
import homeStyle from "../../styles/homeStyles";
import { useAppSelector } from "../../Redux/store";
import { ImageBackground } from "expo-image";

interface AppConfig {
    API_URL: string;
    WEATHER_API_KEY: string;
}
const config = Constants.expoConfig?.extra as AppConfig;

export default function Home() {
    const router = useRouter();

    const [modalBluetoothVisible, setModalBluetoothVisible] = useState(false);
    const [modalWifiVisible, setModalWifiVisible] = useState(false);

    const [deviceName, setDeviceName] = useState<string | null>("");
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState<string>("");

    const [huertos, setHuertos] = useState<any[]>([]);
    const [userId, setUserId] = useState<number | null>(null);

    // Datos de clima
    const [humidity, setHumidity] = useState<number | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [weather, setWeather] = useState<string>("");


    // Usuario desde Redux
    const user = useAppSelector((state) => state.auth.user);

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

    // Obtener clima
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=20.7167&lon=-103.4&units=metric&appid=${config.WEATHER_API_KEY}&lang=es`
                );
                const data = await response.json();

                setTemperature(data.main?.temp ?? null);
                setHumidity(data.main?.humidity ?? null);
                setWeather(data.weather?.[0]?.description ?? "");
            } catch (error) {
                console.error("Error al cargar clima:", error);
            }
        };

        fetchWeather();
    }, []);


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
                        name: deviceName,
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

    // Fecha actual
    const date = new Date();
    const formattedDate = date.toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <View style={{ flex: 1 }}>
            
            <ImageBackground
                source={require("../../assets/images/encabezado.png")}
                style={{ top: 0, left: 0, right: 0, height: 250 }}
            >

                <View style={homeStyle.headerContainer}>
                    <Text style={homeStyle.greeting}>
                        Hola, {user?.nombre ? user.nombre : "Usuario"}
                    </Text>
                    <Text style={homeStyle.date}>{formattedDate}</Text>

                    {/* Tarjetas de clima */}
                    <View style={homeStyle.cardsContainer}>
                        <View style={homeStyle.card}>
                            <MaterialCommunityIcons name="water-percent" size={28} color="#4A90E2" />
                            <Text style={homeStyle.cardTitle}>Humedad</Text>
                            <Text style={homeStyle.cardValue}>
                                {humidity !== null ? `${humidity}%` : "--"}
                            </Text>
                        </View>
                        <View style={homeStyle.card}>
                            <MaterialIcons name="thermostat" size={28} color="#E67E22" />
                            <Text style={homeStyle.cardTitle}>Temp</Text>
                            <Text style={homeStyle.cardValue}>
                                {temperature !== null ? `${temperature}°C` : "--"}
                            </Text>
                        </View>
                        <View style={homeStyle.card}>
                            <MaterialIcons name="wb-sunny" size={28} color="#F1C40F" />
                            <Text style={homeStyle.cardTitle}>Clima</Text>
                            <Text style={homeStyle.cardValue}>{weather || "--"}</Text>
                        </View>
                    </View>

                </View>

            </ImageBackground>

            <View style={homeStyle.container}>
                {/* Huertos */}
                <View>
                    <Text style={homeStyle.subtitle}>Mis huertos</Text>
                </View>
                {huertos.length === 0 ? (
                    <Text style={homeStyle.placeholder}>No tienes huertos registrados</Text>
                ) : (
                    <HomeGardenGrid huertos={huertos} />
                )}

                {/* Modales */}
                {modalBluetoothVisible && (
                    <ModalSensor
                        setDeviceName={setDeviceName}
                        items={allDevices}
                        isVisible={modalBluetoothVisible}
                        connectedToPeripheral={connectToDevice}
                        goToConnectedWifi={goToConnectedWifi}
                        onClose={onModalClose}
                    >
                        <></>
                    </ModalSensor>
                )}

                {modalWifiVisible && (
                    <ModalConnectWifi
                        ssid={ssid}
                        setSsid={setSsid}
                        password={password}
                        setPassword={setPassword}
                        isVisible={modalWifiVisible}
                        onClose={onModalWifiClose}
                    >
                        <></>
                    </ModalConnectWifi>
                )}

                {/* Botón flotante */}
                <TouchableOpacity style={homeStyle.fab} onPress={onModalOpen}>
                    <MaterialIcons name="add" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}