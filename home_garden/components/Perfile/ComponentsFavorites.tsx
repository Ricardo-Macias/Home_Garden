import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

interface Favorito {
    id: number;
    nombre: string;
    tipo: string;
    dificultad: string;
    duracion: number;
    imagen?: string;
}

interface Props {
    favoritos: Favorito[];
}

export default function ComponentsFavorites({ favoritos }: Props) {
    const router = useRouter();

    if (!favoritos || favoritos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <FontAwesome name="heart-o" size={22} color="#6b7280" />
                <Text style={styles.emptyText}>No tienes favoritos aún</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={favoritos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                        router.push({
                            pathname: "../explore/cultivoDetail",
                            params: { id: item.id },
                        })
                    }
                >
                    {item.imagen && (
                        <Image
                            source={{ uri: `${config.API_URL}/images/${item.imagen}` }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    )}
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.nombre}</Text>
                        <Text style={styles.subtitle}>{item.tipo}</Text>
                        <Text style={styles.detail}>Dificultad: {item.dificultad}</Text>
                        <Text style={styles.detail}>Duración: {item.duracion} días</Text>
                    </View>
                    <FontAwesome name="heart" size={22} color="red" style={styles.icon} />
                </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        padding: 10,
        elevation: 2,
        alignItems: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111827",
    },
    subtitle: {
        fontSize: 14,
        color: "#374151",
        marginTop: 2,
    },
    detail: {
        fontSize: 12,
        color: "#6b7280",
    },
    icon: {
        marginLeft: 8,
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    emptyText: {
        marginTop: 8,
        fontSize: 14,
        color: "#6b7280",
    },
});