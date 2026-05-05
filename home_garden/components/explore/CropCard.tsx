import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

interface AppConfig {
    SUPABASE_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

export interface Cultivo {
    id: number;
    nombre: string;
    tipo: string;
    dificultad: string;
    duracion: number;
    imagen: string;
}

interface Props {
    item: Cultivo;
    onPress: () => void;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export default function CropCard({ item, onPress, isFavorite, onToggleFavorite }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            {/* Imagen */}
            <Image
                source={{ uri: `${config.SUPABASE_URL}/uploads/images/${item.imagen}` }}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Informacion */}
            <View style={styles.info}>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.nombre}</Text>

                    {/* Corazón de favoritos */}
                    <TouchableOpacity onPress={onToggleFavorite}>
                        {isFavorite ? (
                            <FontAwesome name="heart" size={22} color="#dc2626" />
                        ) : (
                            <FontAwesome name="heart-o" size={22} color="#6b7280" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Tipo */}
                <View style={styles.row}>
                    <Ionicons name="leaf-outline" size={18} color="#16a34a" />
                    <Text style={styles.text}>{item.tipo}</Text>
                </View>

                {/* Dificultad - barbell - medal*/}
                <View style={styles.row}>
                    <Ionicons name="flash-outline" size={18} color="#2563eb" /> 
                    <Text style={styles.text}>{item.dificultad}</Text>
                </View>

                {/* Duracion */}
                <View style={styles.row}>
                    <Ionicons name="time-outline" size={18} color="#f59e0b" />
                    <Text style={styles.text}>{item.duracion} días</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        marginBottom: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, 
    },
    image: {
        width: 110,
        height: 110,
    },
    info: {
        flex: 1,
        padding: 12,
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    text: {
        marginLeft: 6,
        color: "#374151",
        fontSize: 14,
    },
});