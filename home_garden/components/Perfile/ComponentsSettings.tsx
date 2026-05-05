import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


export default function ComponentsSettings(){
    const options = [
        { label: "Cuenta y perfil", icon: "person" },
        { label: "Gestión del perfil", icon: "manage-accounts" },
        { label: "Estadísticas", icon: "bar-chart" },
        { label: "Apariencia y accesibilidad", icon: "visibility" },
        { label: "Acerca de", icon: "info" },
    ];

    return (
        <View style={styles.optionsContainer}>
            {options.map((option, index) => (
                <TouchableOpacity key={index} style={styles.option}>
                    <MaterialIcons name={option.icon as any} size={24} color="#6A1B9A" />
                    <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    optionsContainer: {
        gap: 16,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D1C4E9",
    },
    optionText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#4A148C",
    },
});
