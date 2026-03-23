import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import Constants from "expo-constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDate, formatTime } from "@/components/utils/formatDate";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

export default function HistorialRiego() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const idHuerto = String(params.id ?? "");

    const [historial, setHistorial] = useState<any[]>([]);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {

                const response = await axios.get(
                    `${config.API_URL}/getHistorialRiego/${idHuerto}`
                );

                setHistorial(response.data || []);
            } catch (error) {
                console.error("Error al cargar historial de riego:", error);
            }
        };

        if (idHuerto) {
            fetchHistorial();
        }
    }, [idHuerto]);

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Historial de riego",
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

            <SafeAreaView style={styles.safe} edges={["left", "right"]}>
                <FlatList
                    data={historial}
                    keyExtractor={(item) => item.idRiego.toString()}
                    contentContainerStyle={styles.container}
                    ItemSeparatorComponent={() => <View style={{ height: 6 }} />} 
                    renderItem={({ item }) => (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                {formatDate(item.fecha)} {formatTime(item.hora)}
                            </Text>
                            <Text style={styles.fecha}>
                                Duración: {item.duracion} seg
                            </Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F2F6F4",
    },
    container: {
        padding: 12,
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        marginBottom: 6, 
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    fecha: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
});