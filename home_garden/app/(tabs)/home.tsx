import { Text, View, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

interface AppConfig {
    API_URL: string;
}
const config = Constants.expoConfig?.extra as AppConfig;

export default function Home() {
    const [users, setUser] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch(`${config.API_URL}/sensor/1`);
        const data = await response.json();
        setUser(data);
    }

    const handleLogout = () => {
        router.replace("/"); // 🔁 vuelve al login (index.tsx)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text>{JSON.stringify(users)}</Text>
            <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
    },
});