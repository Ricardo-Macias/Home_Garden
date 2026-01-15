import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { formatDate } from "@/components/utils/formatDate";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 32;

interface Huerto {
    usuario: number;
    sensor: number;
    huerto: string;
    cultivo: string;
    imagen: string;
    inicio: string;
    termina: string;
}

interface Props {
    huertos: Huerto[];
}

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function HomeGardenGrid({ huertos }: Props) {
    const router = useRouter();

    const renderItem = ({ item }: { item: Huerto }) => {
        const imageUrl = item.imagen
            ? `${API_URL}/uploads/${item.imagen}`
            : "https://via.placeholder.com/300x200.png?text=Huerto";

        return (
            <Pressable
                onPress={() =>
                    router.push({
                        pathname: "/home/GardenDetail",
                        params: {
                            sensor: item.sensor,
                            huerto: item.huerto,
                            cultivo: item.cultivo,
                            imagen: imageUrl,
                            inicio: item.inicio,
                            termina: item.termina,
                        },
                    })
                }
                style={({ pressed }) => [
                    styles.card,
                    {
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                        elevation: pressed ? 6 : 3,
                    },
                ]}
            >
                {/* Imagen */}
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                />

                {/* Información */}
                <View style={styles.info}>
                    <Text style={styles.huerto}>{item.huerto}</Text>
                    <Text style={styles.cultivo}>{item.cultivo}</Text>
                    <Text style={styles.fecha}>
                        Inicio: {formatDate(item.inicio)}
                    </Text>
                    <Text style={styles.fecha}>
                        Estimada: {formatDate(item.termina)}
                    </Text>
                </View>
            </Pressable>
        );
    };

    return (
        <FlatList
            data={huertos}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 12,
        paddingBottom: 80,
    },
    row: {
        justifyContent: "space-between",
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 110,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    info: {
        padding: 10,
    },
    huerto: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    cultivo: {
        fontSize: 14,
        color: "#4CAF50",
        marginBottom: 4,
    },
    fecha: {
        fontSize: 12,
        color: "#666",
    },
});
