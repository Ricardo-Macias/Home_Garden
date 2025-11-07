import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    user: {
        username: string;
        avatar: any;
    };
    onLogout: () => void;
    onViewHistory: () => void;
    onSettings: () => void;
};

export default function ComponentsProfile({
    user,
    onLogout,
    onViewHistory,
    onSettings,
}: Props) {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.settingsButton} onPress={onSettings}>
                <MaterialIcons name="settings" size={24} color="6A1B9A"/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                <MaterialIcons name="logout" size={24} color="#6A1B9A"/>
            </TouchableOpacity>

            <Text style={styles.title}>Perfil</Text>
            <Image source={user.avatar} style={styles.avatar}/>
            <Text style={styles.username}>{user.username}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 60,
        alignItems: "center",
        position: "relative",   
    },
    settingsButton: {
        position: "absolute",
        top: 40,
        left: 20,
        padding: 10,
        zIndex: 10,
    },
    logoutButton: {
        position: "absolute",
        top: 40,
        right: 20,
        padding: 10,
        zIndex:10,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#6A1B9A",
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#6A1B9A",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#6A1B9A",
        marginBottom: 10,
    },
    historyButton: {
        backgroundColor: "#6A1B9A",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 30,
        marginTop: 15,
    },
    historyText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});