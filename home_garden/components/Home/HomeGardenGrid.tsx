import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { formatDate } from "@/components/utils/formatDate";
import Constants from "expo-constants";
import gardenCardStyle from "@/styles/gardenCardStyle";

interface Huerto {
    _id?: string;
    id?: string; 
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

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL;

export default function HomeGardenGrid({ huertos }: Props) {
    const router = useRouter();

    const renderItem = ({ item }: { item: Huerto }) => {

        const imageUrl = item.imagen
            ? `${SUPABASE_URL}/uploads/Sensores/Predeterminada.png`
            : "https://via.placeholder.com/150.png?text=Huerto";

        const id = item._id || item.id;

        return (
            <Pressable
                onPress={() => {

                    router.push({
                        pathname: "/home/GardenDetail",
                        params: {
                            id: id, 
                            sensor: item.sensor,
                            huerto: item.huerto,
                            cultivo: item.cultivo,
                            imagen: imageUrl,
                            inicio: item.inicio,
                            termina: item.termina,
                        },
                    });
                }}
                style={({ pressed }) => [
                    gardenCardStyle.card,
                    {
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                        elevation: pressed ? 6 : 3,
                    },
                ]}
            >
                <View style={gardenCardStyle.row}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={gardenCardStyle.image}
                        resizeMode="cover"
                    />

                    <View style={gardenCardStyle.info}>
                        <Text style={gardenCardStyle.huerto}>
                            {item.huerto}
                        </Text>

                        <Text style={gardenCardStyle.cultivo}>
                            {item.cultivo}
                        </Text>

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
            keyExtractor={(item, index) =>
                item._id || item.id || index.toString()
            }
            renderItem={renderItem}
            numColumns={1}
            contentContainerStyle={gardenCardStyle.list}
            showsVerticalScrollIndicator={false}
        />
    );
}
