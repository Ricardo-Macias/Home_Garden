import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { RootState, AppDispatch } from "../../Redux/store";
import { logoutUser } from "../../Redux/authSlice";

const config = Constants.expoConfig?.extra || { API_URL: "" };

export default function Perfil() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.id) return;
            setLoading(true);
            try {
                const response = await fetch(`${config.API_URL}/user/${user.id}`);
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
    }, [user]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
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
                    <Text>ID: {user?.id}</Text>
                </>
            ) : (
                <Text>No se encontraron datos del usuario</Text>
            )}
            <Button title="Cerrar sesión" onPress={handleLogout} color="#6A1B9A" />
        </View>
import React from "react";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import ComponentsProfile from "../../components/Perfile/ComponentsProfile";
import ComponentsHistory from "../../components/Perfile/ComponentsHistory";
import ComponentsSettings from "../../components/Perfile/ComponentsSettings";
import { getUserProfile } from "../Profile/UserProfile";
import { getGardenHistory } from "../Profile/GardenHistory";

export default function PerfilScreen() { 
    const userData = getUserProfile();
    const gardenData = getGardenHistory();

    const router = useRouter();

    const handleLogout = () => {};
    const handleViewHistory = () => {};
    const handleSettings = () => {
        router.push("/Profile/Settings");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ComponentsProfile
                user={userData}
                onLogout={handleLogout}
                onViewHistory={handleViewHistory}
                onSettings={handleSettings}
            />
            <ComponentsHistory data={gardenData} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
});
