import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDate } from "@/components/utils/formatDate";
import Constants from "expo-constants";

interface AppConfig{
    API_URL: string;
}
const config = Constants.expoConfig?.extra as AppConfig;

type valueSensor = {
    temperature: number;
    humedity: number;
    soilMoisture: number;
    light: number;
}

export default function GardenDetail() {
    const params = useLocalSearchParams();
    const [sensorData, setSensorData] = useState<valueSensor | null>(null);

    const sensor = Number(params.sensor ?? "");
    const huerto = String(params.huerto ?? "");
    const cultivo = String(params.cultivo ?? "");
    const imageUrl = String(params.imagen ?? "https://via.placeholder.com/400");
    const inicio = String(params.inicio ?? "");
    const termina = String(params.termina ?? "");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.API_URL}/getSensorData/${sensor}`);
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.log("Error al cargar los datos de los sensores: ", error);
            }
        };

        fetchData();
    });

    return (
        <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Imagen */}
                <Image source={{ uri: imageUrl }} style={styles.image} />

                {/* Título */}
                <Text style={styles.huerto}>{huerto}</Text>
                <Text style={styles.cultivo}>{cultivo}</Text>

                {/* Fechas */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons
                            name="calendar-start"
                            size={20}
                            color="#4CAF50"
                        />
                        <Text style={styles.fecha}>
                            Inicio: {formatDate(inicio)}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <MaterialCommunityIcons
                            name="calendar-check"
                            size={20}
                            color="#2196F3"
                        />
                        <Text style={styles.fecha}>
                            Fin estimado: {formatDate(termina)}
                        </Text>
                    </View>
                </View>

                {/* Grid sensores */}
                <View style={styles.grid}>
                    <SensorCard icon="thermometer" label="Temp" value={ sensorData?.temperature + " °C"} color="#F44336" />
                    <SensorCard icon="weather-sunny" label="Luz" value={sensorData?.light} color="#FFC107" />
                    <SensorCard icon="water-percent" label="Hum. Amb" value={sensorData?.humedity + " %"} color="#03A9F4" />
                    <SensorCard icon="sprout" label="Hum. Suelo" value={sensorData?.soilMoisture + " %"} color="#4CAF50" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function SensorCard({ icon, label, value, color }: any) {
    return (
        <View style={styles.card}>
            <MaterialCommunityIcons name={icon} size={28} color={color} />
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={styles.cardValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 14,
        alignSelf: "center",
        marginBottom: 16,
    },
    huerto: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    cultivo: {
        fontSize: 18,
        color: "#4CAF50",
        textAlign: "center",
        marginBottom: 12,
    },
    section: {
        marginVertical: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 12,
        marginVertical: 6,
        elevation: 3,
    },
    fecha: {
        fontSize: 14,
        color: "#555",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 16,
    },
    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        marginBottom: 14,
        elevation: 3,
    },
    cardLabel: {
        fontSize: 14,
        marginTop: 6,
        color: "#555",
    },
    cardValue: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 4,
    },
});
