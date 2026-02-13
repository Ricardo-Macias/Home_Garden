import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { formatDate } from "@/components/utils/formatDate";
import Constants from "expo-constants";
import gardenCardStyle from "@/styles/gardenCardStyle";

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
            : "https://via.placeholder.com/150.png?text=Huerto";

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
                    gardenCardStyle.card,
                    {
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                        elevation: pressed ? 6 : 3,
                    },
                ]}
            >
                {/* Layout en fila: imagen izquierda, info derecha */}
                <View style={gardenCardStyle.row}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={gardenCardStyle.image}
                        resizeMode="cover"
                    />
                    <View style={gardenCardStyle.info}>
                        <Text style={gardenCardStyle.huerto}>{item.huerto}</Text>
                        <Text style={gardenCardStyle.cultivo}>{item.cultivo}</Text>
                        <Text style={gardenCardStyle.fecha}>
                            Inicio: {formatDate(item.inicio)}
                        </Text>
                        <Text style={gardenCardStyle.fecha}>
                            Estimada: {formatDate(item.termina)}
                        </Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <FlatList
            data={huertos}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            numColumns={1} 
            key={"one-column"} 
            contentContainerStyle={gardenCardStyle.list}
            showsVerticalScrollIndicator={false}
        />
    );
}
