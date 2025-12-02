import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";
import { clearUserId } from "../../store/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const config = Constants.expoConfig?.extra || { API_URL: "" };

export default function Perfil() {
    const userId = useSelector((state: any) => state.user.id);
    const dispatch = useDispatch();
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;
            setLoading(true);
            try {
                const response = await fetch(`${config.API_URL}/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    setUserData(null);
                }
            } catch (err) {
                console.error("Error en fetch:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);


    const handleLogout = async () => {
        dispatch(clearUserId());
        await SecureStore.deleteItemAsync("userId");
        router.replace("/"); 
    };


    if (loading) {
        return <ActivityIndicator size="large" color="#6A1B9A" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            {userData ? (
                <>
                <Text>Nombre: {userData.nombre}</Text>
                <Text>Apellidos: {userData.apellidos}</Text>
                <Text>Correo: {userData.correo}</Text>
                <Text>ID: {userId}</Text>
                </>
            ) : (
            <Text>No se encontraron datos del usuario</Text>
            )}
            <Button title="Cerrar sesión" onPress={handleLogout} color="#6A1B9A" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
