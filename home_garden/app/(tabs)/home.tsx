import { Text, View, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import ModalSensor from "@/components/Sensor/ModalSensor";
import ModalConnectWifi from "@/components/Sensor/ModalConnectWifi";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import BluetoothLeManager from "@/components/Bluetooth/BluetoothLeManager";
import * as SecureStore from "expo-secure-store";
import HomeGardenGrid from "@/components/Home/HomeGardenGrid";
import homeStyle from "../../styles/homeStyles";
import { useAppSelector } from "../../Redux/store";
import { ImageBackground } from "expo-image";
import { getWeatherCategory, getRandomWeatherImage } from "../../components/utils/weatherImages";
import { getWeatherIcon } from "../../components/utils/weatherIcons";
import axios from "axios";
import { useClockPolling } from "@/hooks/useClockPolling";

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

    // fecha y hora
    const currentTime = useClockPolling("America/Mexico_City", 1000);

    const mesesAbrev = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const dia = currentTime ? currentTime.getDate() : "";
    const mes = currentTime ? mesesAbrev[currentTime.getMonth()] : "";
    const año = currentTime ? currentTime.getFullYear() : "";

    const shortDate = currentTime ? `${dia} ${mes} ${año}` : "";
    const shortTime = currentTime
        ? currentTime.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })
        : "";

    // Estados de clima
    const [humidity, setHumidity] = useState<number | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [weather, setWeather] = useState<string>("");
    const [weatherCode, setWeatherCode] = useState<number | null>(null);

    // Categoria e imagen basadas en código
    const category = weatherCode ? getWeatherCategory(weatherCode) : "default";
    const weatherImage = weatherCode ? getRandomWeatherImage(weatherCode) : null;

    const weatherIconName = getWeatherIcon(weather);

    const user = useAppSelector((state) => state.auth.user);

    const {
        requestPermissions,
        scanForPeripherals,
        connectToDevice,
        allDevices,
        sendCredentials,
    } = BluetoothLeManager();

    const sendCredentialsRef = useRef(sendCredentials);

    useEffect(() => {
        sendCredentialsRef.current = sendCredentials;
    }, [sendCredentials]);

    // Imagen del clima
    const [weatherImageFixed, setWeatherImageFixed] = useState(
        weatherCode ? getRandomWeatherImage(weatherCode) : null
    );

    useEffect(() => {
        if (weatherCode) {
            setWeatherImageFixed(getRandomWeatherImage(weatherCode));
        }
    }, [weatherCode]);

    // Cargar usuario
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

    // Cargar huertos
    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/allHomeVegetableGarden/${userId}`);
                setHuertos(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error al cargar huertos:", error);
                setHuertos([]);
            }
        };

        fetchData();
    }, [userId]);

    // Clima
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=20.7167&lon=-103.4&units=metric&appid=${config.WEATHER_API_KEY}&lang=es`
                );

                const data = response.data;

                // Guardamos temperatura y humedad
                setTemperature(data.main?.temp ?? null);
                setHumidity(data.main?.humidity ?? null);

                setWeather(data.weather?.[0]?.description ?? "");

                setWeatherCode(data.weather?.[0]?.id ?? null);

                // Debug para verificar
                console.log("Weather code:", data.weather?.[0]?.id);
                console.log("Category:", getWeatherCategory(data.weather?.[0]?.id));
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
                    params: { sensor: data.idSensor, bandEdit: 0 },
                });
            };

            addSensor();
        }
    }, [modalWifiVisible, password, ssid, userId]);


    return (
        <View style={{ flex: 1 }}>
            {/* Widget de clima */}
            <View style={homeStyle.weatherWidget}>
                <ImageBackground
                    source={weatherImageFixed}
                    style={homeStyle.weatherImage}
                    imageStyle={{ borderRadius: 16 }}
                >
                    <View style={homeStyle.weatherContent}>
                        <View style={homeStyle.weatherLeft}>
                            <View style={homeStyle.weatherRow}>
                                <MaterialIcons
                                    name={weatherIconName}
                                    size={28}
                                    color="#fff"
                                    style={homeStyle.weatherIcon}
                                />
                                <Text style={homeStyle.weatherDesc}>{weather || "Clima desconocido"}</Text>
                            </View>

                            <Text style={homeStyle.weatherTemp}>
                                {temperature !== null ? `${temperature}°C` : "--"}
                            </Text>
                            <Text style={homeStyle.weatherHumidity}>
                                Humedad: {humidity !== null ? `${humidity}%` : "--"}
                            </Text>
                        </View>

                        <View style={homeStyle.weatherRight}>
                            <Text style={homeStyle.weatherTime}>{shortTime}</Text>
                            <Text style={homeStyle.weatherDate}>{shortDate}</Text>
                        </View>

                    </View>
                </ImageBackground>
            </View>

            {/* huertos */}
            <View style={homeStyle.container}>
                <Text style={homeStyle.subtitle}>Mis huertos</Text>
                {huertos.length === 0 ? (
                    <Text style={homeStyle.placeholder}>No tienes huertos registrados</Text>
                ) : (
                    <HomeGardenGrid huertos={huertos} />
                )}
            </View>

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

            {/* Boton flotante */}
            <TouchableOpacity style={homeStyle.fab} onPress={onModalOpen}>
                <MaterialIcons name="add" size={28} color="#fff" />
            </TouchableOpacity>

            {/* pie de pagina */}
            {/*<Image
                source={require("../../assets/images/garden_footer.png")}
                style={homeStyles.footerImage}
                resizeMode="cover"
            /> */}
        </View>
    );
}