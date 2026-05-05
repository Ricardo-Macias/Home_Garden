import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

export default function CultivoDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [cultivo, setCultivo] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCultivo = async () => {
            try {
                const response = await fetch(`${config.API_URL}/crop/id/${id}`);
                const data = await response.json();
                setCultivo(data);
            } catch (error) {
                console.error("Error al obtener cultivo:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCultivo();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    }

    if (!cultivo) {
        return (
            <View style={styles.center}>
                <Text>No se encontró el cultivo</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                {/* header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {cultivo.nombre}
                    </Text>
                </View>


                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image
                        source={{ uri: `${config.API_URL}/images/${cultivo.imagen}` }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    <View style={styles.content}>
                        <View style={styles.infoRow}>
                            <View style={styles.badge}>
                                <Ionicons name="leaf-outline" size={16} color="#16a34a" />
                                <Text style={styles.badgeText}>{cultivo.tipo}</Text>
                            </View>

                            <View style={styles.badge}>
                                <Ionicons name="flash-outline" size={16} color="#f59e0b" />
                                <Text style={styles.badgeText}>{cultivo.dificultad}</Text>
                            </View>

                            <View style={styles.badge}>
                                <Ionicons name="time-outline" size={16} color="#2563eb" />
                                <Text style={styles.badgeText}>{cultivo.duracion} días</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>Descripción</Text>
                            <Text style={styles.paragraph}>{cultivo.descripcion}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>Consejos</Text>
                            <Text style={styles.paragraph}>{cultivo.consejos}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>Germinación</Text>

                            <View style={styles.conditionRow}>
                                <Ionicons name="leaf-outline" size={18} color="#16a34a" />
                                <Text style={styles.conditionText}>
                                    Germina en {cultivo.dias_germinacion} días
                                </Text>
                            </View>

                            <View style={styles.conditionRow}>
                                <Ionicons name="calendar-outline" size={18} color="#84cc16" />
                                <Text style={styles.conditionText}>
                                    Cosecha en {cultivo.dias_cosechar} días
                                </Text>
                            </View>

                            <View style={styles.conditionRow}>
                                <MaterialCommunityIcons name="ruler" size={18} color="#6b7280" />
                                <Text style={styles.conditionText}>
                                    Profundidad: {cultivo.profundidad}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>Condiciones ideales</Text>

                            <View style={styles.conditionRow}>
                                <Ionicons name="water-outline" size={18} color="#0ea5e9" />
                                <Text style={styles.conditionText}>
                                    Humedad Ambiental: {cultivo.humedadAmbiental_min}% - {cultivo.humedadAmbiental_max}%
                                </Text>
                            </View>

                            <View style={styles.conditionRow}>
                                <Ionicons name="water-outline" size={18} color="#0284c7" />
                                <Text style={styles.conditionText}>
                                    Humedad Suelo: {cultivo.humedadSuelo_min}% - {cultivo.humedadSuelo_max}%
                                </Text>
                            </View>

                            <View style={styles.conditionRow}>
                                <Ionicons name="thermometer-outline" size={18} color="#ef4444" />
                                <Text style={styles.conditionText}>
                                    Temperatura: {cultivo.temperatura_min}°C - {cultivo.temperatura_max}°C
                                </Text>
                            </View>

                            <View style={styles.conditionRow}>
                                <Ionicons name="sunny-outline" size={18} color="#facc15" />
                                <Text style={styles.conditionText}>
                                    Luz: {cultivo.luz_min} lx - {cultivo.luz_max} lx
                                </Text>
                            </View>
                        </View>

                        <View style={{ height: 40 }} />
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f4f6",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#166534",
        paddingTop: 50,
        paddingBottom: 16,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    backButton: {
        position: "absolute",
        left: 16,
        bottom: 16,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        width: "70%",
    },
    heroImage: {
        width: "100%",
        height: 250,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    content: {
        padding: 16,
        marginTop: -20,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        elevation: 2,
    },
    badgeText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: "500",
        color: "#374151",
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
        elevation: 3,
        alignItems: "stretch",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
        color: "#166534",
        textAlign: "center",
    },
    paragraph: {
        fontSize: 14,
        color: "#4b5563",
        lineHeight: 22,
        textAlign: "justify",
    },
    conditionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    conditionText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#374151",
    },
});
