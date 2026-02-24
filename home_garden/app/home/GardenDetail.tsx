import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { formatDate } from "@/components/utils/formatDate";
import Constants from "expo-constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getStatusImage } from "../../components/utils/statusImage";
import GardenDetailStyle from "../../styles/GardenDetailStyle";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;
const { width } = Dimensions.get("window");

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

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function GardenDetail() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const sensor = Number(params.sensor ?? "");
    const huerto = String(params.huerto ?? "");
    const cultivo = String(params.cultivo ?? "");
    const imageUrl = String(params.imagen ?? "https://via.placeholder.com/400");
    const inicio = String(params.inicio ?? "");
    const termina = String(params.termina ?? "");

    const uploads =
        params.uploads && typeof params.uploads === "string"
            ? JSON.parse(params.uploads)
            : [];

    const images: string[] = [imageUrl, ...uploads];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sensorResponse = await fetch(
                    `${config.API_URL}/getSensorData/${sensor}`
                );
                const sensorRaw = await sensorResponse.json();

                const rangesResponse = await fetch(
                    `${config.API_URL}/checkSensorRanges`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            nombreCultivo: cultivo,
                            sensorData: {
                                temp: sensorRaw.temperature,
                                humedadSuelo: sensorRaw.soilMoisture,
                                humedadAmbiente: sensorRaw.humedity,
                                luz: sensorRaw.light,
                            },
                        }),
                    }
                );

                const rangesData = await rangesResponse.json();
                setSensorData(rangesData);
            } catch (error) {
                console.log("Error al cargar datos: ", error);
            }
        };

        fetchData();
    }, [sensor, cultivo]);

    return (
        <>
            <Stack.Screen
                options={{
                    title: huerto,
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "#F2F6F4",
                    },
                    headerTitleStyle: {
                        fontSize: 22,
                        fontWeight: "700",
                        color: "#27ae60",
                    },
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={26}
                            color= "#27ae60"
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
                    {/* HERO */}
                    <View style={GardenDetailStyle.heroContainer}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                        >
                            {images.map((img, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: img }}
                                    style={GardenDetailStyle.heroImage}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* Nombre cultivo */}
                    <Text style={GardenDetailStyle.cultivo}>{cultivo}</Text>

                    {/* Fechas */}
                    <View style={GardenDetailStyle.section}>
                        <View style={GardenDetailStyle.row}>
                            <View style={GardenDetailStyle.dateIconContainer}>
                                <Image
                                    source={require("../../assets/images/icons/start.png")}
                                    style={GardenDetailStyle.dateIcon}
                                />
                            </View>
                            <Text style={GardenDetailStyle.fecha}>
                                Inicio: {formatDate(inicio)}
                            </Text>
                        </View>

                        <View style={GardenDetailStyle.row}>
                            <View style={GardenDetailStyle.dateIconContainer}>
                                <Image
                                    source={require("../../assets/images/icons/end.png")}
                                    style={GardenDetailStyle.dateIcon}
                                />
                            </View>
                            <Text style={GardenDetailStyle.fecha}>
                                Fin estimado: {formatDate(termina)}
                            </Text>
                        </View>
                    </View>

                    {/* Tarjetas sensores */}
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

                    {/* Imagen dinámica humedad suelo */}
                    {sensorData?.humedadSuelo && (
                        <Image
                            source={getStatusImage(sensorData.humedadSuelo)}
                            style={GardenDetailStyle.statusImage}
                        />
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
    icon: IconName;
    data: SensorResult;
    unit: string;
}) {
    const isOk = data.estado === "ok";
    const valueColor = isOk ? "#2E7D32" : "#D32F2F";

    const getIconColor = () => {
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
        switch (icon) {
            case "thermometer":
                return "#FFEBEE"; 
            case "weather-sunny":
                return "#FFF8E1"; 
            case "water-percent":
                return "#E3F2FD"; 
            case "sprout":
                return "#E8F5E9"
            default:
                return "#F5F5F5";
        }
    };


    return (
        <View style={GardenDetailStyle.card}>

            {/* Titulo */}
            <Text style={GardenDetailStyle.cardTitle}>{title}</Text>

            {/* icono solo en su linea */}
            <View style={[GardenDetailStyle.iconContainer, { backgroundColor: getIconBgColor() }]}>
                <MaterialCommunityIcons
                    name={icon}
                    size={26}
                    color={getIconColor()}
                />
            </View>


            {/* Valor */}
            <Text style={[GardenDetailStyle.cardValue, { color: valueColor }]}>
                {data.valor} {unit}
            </Text>

            {/* Rango */}
            <Text style={GardenDetailStyle.cardRange}>
                Rango ideal: {data.min} - {data.max} {unit}
            </Text>
        </View>
    );
}
