import { Text, View, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

interface AppConfig {
    API_URL: string;
}
const config = Constants.expoConfig?.extra as AppConfig;

export default function Home() {
    const userId = useSelector((state: any) => state.user.id); 
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();


    useEffect(() => {
        if(userId){
            fetchUserData();
        }
    }, [userId]);

    async function fetchUserData() {
        try {
            const response = await fetch(`${config.API_URL}/user/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                setUserData(null);
            }
        } catch (err) {
            console.error("Error al obtener usuario:", err);
        }
    }

    const handleLogout = () => {
        router.replace("/"); // vuelve al login
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Bienvenido {userData ? userData.nombre : "usuario"}
            </Text>
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