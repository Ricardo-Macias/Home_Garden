import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useAuth } from "../../hooks/useAuth";
import ComponentsProfile from "../../components/Perfile/ComponentsProfile";
import ComponentsHistory from "../../components/Perfile/ComponentsHistory";
import ComponentsFavorites from "../../components/Perfile/ComponentsFavorites";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

export default function ViewUserProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [favoritos, setFavoritos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"historial" | "favoritos">("historial");

    useEffect(() => {
        if (!user?.id) return;

        const loadProfile = async () => {
            try {
                // Perfil completo con historial 
                const response = await fetch(`${config.API_URL}/perfil/${user.id}`);
                const data = await response.json();
                setProfile(data);

                // Favoritos del usuario
                const favResponse = await fetch(`${config.API_URL}/favoritos/${user.id}`);
                const favData = await favResponse.json();
                setFavoritos(favData);
            } catch (error) {
                console.error("Error al cargar perfil:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    }

    if (!profile) {
        return <Text>No se pudo cargar el perfil</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Datos del usuario */}
            <ComponentsProfile
                nombre={profile.nombre ?? ""}
                apellidos={profile.apellidos ?? ""}
                correo={profile.correo ?? ""}
            />

            {/* Selector de pestañas */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "historial" && styles.activeTab]}
                    onPress={() => setActiveTab("historial")}
                >
                    <Text style={activeTab === "historial" ? styles.activeText : styles.tabText}>
                        Historial
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "favoritos" && styles.activeTab]}
                    onPress={() => setActiveTab("favoritos")}
                >
                    <Text style={activeTab === "favoritos" ? styles.activeText : styles.tabText}>
                        Favoritos
                    </Text>
                </TouchableOpacity>
            </View>

            {activeTab === "historial" ? (
                <ComponentsHistory historial={profile.historial ?? []} />
            ) : (
                <ComponentsFavorites favoritos={favoritos ?? []} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    tabContainer: {
        flexDirection: "row",
        marginVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
    },
    tabText: {
        fontSize: 16,
        color: "#6b7280",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#16a34a",
    },
    activeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#16a34a",
    },
});
