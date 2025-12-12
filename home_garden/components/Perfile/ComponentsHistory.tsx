import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type GardenItem = {
    id: number;
    name: string;
    date: string;
    image: any;
};

type Props = {
    data: GardenItem[];
};

export default function ComponentsHistory({ data }: Props) {
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Historial de Huertos</Text>
            <Text style={styles.subtitle}>Huertos: 4</Text>
            {data.map((item) => (
                <View key={item.id} style={styles.card}>
                    <Image source={item.image} style={styles.image} />
                    <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                </View>
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#6A1B9A",
        marginBottom: 12,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#6A1B9A",
        marginBottom: 10,
        textAlign: "center",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#f3e5f5",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        alignItems: "center",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4A148C",
    },
    date: {
        fontSize: 14,
        color: "#6A1B9A",
    },
});