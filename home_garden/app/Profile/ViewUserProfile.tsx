import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { getUserProfileApi } from "../../services/profileApi";
import { useAuth } from "../../hooks/useAuth";
import ComponentsProfile from "../../components/Perfile/ComponentsProfile";
import ComponentsHistory from "../../components/Perfile/ComponentsHistory";

export default function Viewprofile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        const loadProfile = async () => {
            try {
                const data = await getUserProfileApi(user.id);
                setProfile(data);
            } catch (error) {
                console.error(error);
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
            <ComponentsProfile
                nombre={profile.nombre ?? ""} 
                apellidos={profile.apellidos ?? ""}
                correo={profile.correo ?? ""}
            />

            <ComponentsHistory historial={profile.historial ?? []} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
});
