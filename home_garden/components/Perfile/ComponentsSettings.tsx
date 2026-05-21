import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ComponentsSettings() {
    return (
        <View style={styles.container}>
            <Ionicons name="leaf-outline" size={48} color="#2E7D32" />
            <Text style={styles.title}>Acerca de la aplicación</Text>
            <Text style={styles.version}>Versión 1.0.0</Text>
            <Text style={styles.subtitle}>Home_Garden</Text>
            <Text style={styles.description}>
                Una aplicación pensada para ayudarte a cuidar tu huerto de manera
                sostenible y sencilla.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdfdfd", 
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1B5E20",
        marginTop: 12,
        marginBottom: 4,
    },
    version: {
        fontSize: 16,
        color: "#388E3C",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2E7D32",
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: "#4CAF50",
        textAlign: "center",
        lineHeight: 20,
        marginTop: 8,
    },
});
