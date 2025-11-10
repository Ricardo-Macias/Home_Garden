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
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
});