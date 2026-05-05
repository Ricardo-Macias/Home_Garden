import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import Constants from "expo-constants";
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { formatDate, formatTime } from "@/components/utils/formatDate";
import GardenDetailStyle from "../../styles/GardenDetailStyle";
import axios from "axios";
import { usePolling } from "@/hooks/usePolling";
import MessageBox from "@/components/MessageBox";
import Button from "@/components/Image/ImageButton"
import { notifyMetrics } from "../../utils/notificationMetrics";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

type SensorResult = {
    valor: number;
    estado: "ok" | "fuera";
    min: number;
    max: number;
};

type SensorData = {
    temperatura: SensorResult;
    humedadSuelo: SensorResult;
    humedadAmbiente: SensorResult;
    luz: SensorResult;
};

export default function GardenDetail() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [ultimoRiego, setUltimoRiego] = useState<any | null>(null);

    const id = Number(params.id ?? "");

    const sensor = Number(params.sensor ?? "");
    const huerto = String(params.huerto ?? "");
    const cultivo = String(params.cultivo ?? "");
    const imageUrl = String(params.imagen ?? "https://via.placeholder.com/400");
    const inicio = String(params.inicio ?? "");
    const termina = String(params.termina ?? "");
    const currentDate = new Date();
    const estimatedDate = new Date(termina);

    const horasRiego = ["09:00 AM", "04:00 PM"];

    const uploads =
        params.uploads && typeof params.uploads === "string"
            ? JSON.parse(params.uploads)
            : [];

    const images: string[] = [imageUrl, ...uploads];

    const { data: sensorRaw } = usePolling<any>(
        `${config.API_URL}/getSensorData/${sensor}`,
        10000
    );

    useEffect(() => {
        const checkRanges = async () => {
            if (!sensorRaw) return;

            try {
                const { data: rangesData } = await axios.post(
                    `${config.API_URL}/checkSensorRanges`,
                    {
                        nombreCultivo: cultivo,
                        sensorData: {
                            temp: sensorRaw.temperature,
                            humedadSuelo: sensorRaw.soilMoisture,
                            humedadAmbiente: sensorRaw.humedity,
                            luz: sensorRaw.light,
                        },
                    }
                );

                setSensorData(rangesData);
                notifyMetrics(rangesData);
            } catch (err) {
                console.error("Error al validar rangos:", err);
            }
        };

        checkRanges();
    }, [sensorRaw, cultivo]);

    useEffect(() => {
        const fetchUltimoRiego = async () => {
            if (!id) return;

            try {
                const response = await axios.post(
                    `${config.API_URL}/getUltimoRiego`,
                    {
                        idSensor: sensor,
                        huerto: huerto,
                    }
                );

                setUltimoRiego(response.data);
            } catch (error) {
                console.log("Error al cargar ultimo riego:", error);
            }
        };

        fetchUltimoRiego();
    }, [id]);

    const edit = async () => {
        router.push({
            pathname: "/sensor/AddSensor",
            params: {sensor: sensor,bandEdit: 1},
        });
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: huerto,
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: "#F2F6F4" },
                    headerTitleStyle: {
                        fontSize: 22,
                        fontWeight: "700",
                        color: "#27ae60",
                    },
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={26}
                            color="#27ae60"
                            style={{ marginLeft: 12 }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />

            <SafeAreaView style={GardenDetailStyle.safe} edges={["left", "right"]}>
                <ScrollView
                    contentContainerStyle={GardenDetailStyle.container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={GardenDetailStyle.heroContainer}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                        >
                            {images.map((img, index) => (
                                <Image
                                    key={`${img}-${index}`}
                                    source={{ uri: img }}
                                    style={GardenDetailStyle.heroImage}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    
                    {/* Nombre cultivo */}
                    <Text style={GardenDetailStyle.cultivo}>{cultivo}</Text>
                    
                    {/* Mensaje de para cambiar de cultivo */}
                    <View>
                    { currentDate > estimatedDate ? (
                        <View>
                                <MessageBox
                                    type="info"
                                    message="La fecha estimada a sido superada, ¿Desea cambiar el cultivo?"
                                />
                                <Button
                                    color=""
                                    label=""
                                    icon="check"
                                    theme="second"
                                    onPress={edit}
                                />
                        </View>
                        
                            ):(
                                <Text></Text>
                            )}
                    </View>
                    {/* Fechas */}
                    <View style={GardenDetailStyle.section}>
                        <View style={GardenDetailStyle.row}>
                            <Image
                                source={require("../../assets/images/icons/start.png")}
                                style={GardenDetailStyle.dateIcon}
                            />
                            <Text style={GardenDetailStyle.fecha}>
                                Inicio: {formatDate(inicio)}
                            </Text>
                        </View>

                        <View style={GardenDetailStyle.row}>
                            <Image
                                source={require("../../assets/images/icons/end.png")}
                                style={GardenDetailStyle.dateIcon}
                            />
                            <Text style={GardenDetailStyle.fecha}>
                                Fin estimado: {formatDate(termina)}
                            </Text>
                        </View>
                    </View>

                    {/* Sensores */}
                    {sensorData && (
                        <View style={GardenDetailStyle.cardsContainer}>
                            <SensorCard
                                title="Temperatura"
                                icon="thermometer"
                                data={sensorData.temperatura}
                                unit="°C"
                            />
                            <SensorCard
                                title="Luz"
                                icon="weather-sunny"
                                data={sensorData.luz}
                                unit="lx"
                            />
                            <SensorCard
                                title="Humedad Ambiente"
                                icon="water-percent"
                                data={sensorData.humedadAmbiente}
                                unit="%"
                            />
                            <SensorCard
                                title="Humedad Suelo"
                                icon="sprout"
                                data={sensorData.humedadSuelo}
                                unit="%"
                            />
                        </View>
                    )}

                    <View style={GardenDetailStyle.section}>
                        <Text style={GardenDetailStyle.sectionTitle}>
                            Horarios de evaluación de riego
                        </Text>
                        {horasRiego.map((hora, index) => (
                            <View key={index} style={GardenDetailStyle.row}>
                                <Ionicons name="time-outline" size={20} color="#27ae60" />
                                <Text style={GardenDetailStyle.fecha}>{hora}</Text>
                            </View>
                        ))}
                    </View>

                    {ultimoRiego && (
                        <View style={GardenDetailStyle.section}>
                            <View style={GardenDetailStyle.rowBetween}>
                                <Text style={GardenDetailStyle.sectionTitle}>
                                    Historial de regado
                                </Text>

                                <Ionicons
                                    name="list-outline"
                                    size={24}
                                    color="#27ae60"
                                    onPress={() =>
                                        router.push({
                                            pathname: "/home/HistorialRiego",
                                            params: { id:  ultimoRiego.idHuerto},
                                        })
                                    }
                                />
                            </View>

                            <Text style={GardenDetailStyle.fecha}>
                                {formatDate(ultimoRiego.fecha)} {formatTime(ultimoRiego.hora)} — {ultimoRiego.duracion} seg
                            </Text>

                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}


function SensorCard({
    title,
    icon,
    data,
    unit,
}: {
    title: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    data: SensorResult;
    unit: string;
}) {
    const isOk = data.estado === "ok";
    const valueColor = isOk ? "#2E7D32" : "#D32F2F";

    const isNight = new Date().getHours() >= 19 || new Date().getHours() < 6;

    const getIconColor = () => {
        if (title === "Luz" && isNight) return "#1565C0";
        switch (icon) {
            case "thermometer":
                return "#E53935";
            case "weather-sunny":
                return "#F9A825";
            case "water-percent":
                return "#1E88E5";
            case "sprout":
                return "#43A047";
            default:
                return "#555";
        }
    };

    const getIconBgColor = () => {
        if (title === "Luz" && isNight) return "#BBDEFB";
        switch (icon) {
            case "thermometer":
                return "#FFEBEE";
            case "weather-sunny":
                return "#FFF8E1";
            case "water-percent":
                return "#E3F2FD";
            case "sprout":
                return "#E8F5E9";
            default:
                return "#F5F5F5";
        }
    };

    return (
        <View style={GardenDetailStyle.card}>
            <Text style={GardenDetailStyle.cardTitle}>{title}</Text>

            <View
                style={[
                    GardenDetailStyle.iconContainer,
                    { backgroundColor: getIconBgColor() },
                ]}
            >
                {title === "Luz" && isNight ? (
                    <Ionicons name="moon" size={26} color="#1565C0" />
                ) : (
                    <MaterialCommunityIcons name={icon} size={26} color={getIconColor()} />
                )}
            </View>

            {!(title === "Luz" && isNight) && (
                <Text style={[GardenDetailStyle.cardValue, { color: valueColor }]}>
                    {data.valor} {unit}
                </Text>
            )}

            {!(title === "Luz" && isNight) && (
                <Text style={GardenDetailStyle.cardRange}>
                    Rango ideal: {data.min} - {data.max} {unit}
                </Text>
            )}
        </View>
    );
}
