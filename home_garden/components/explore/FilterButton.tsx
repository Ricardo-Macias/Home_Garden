import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    onPress: () => void;
    style?: ViewStyle;
}

export default function FilterButton({ onPress, style }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Ionicons name="options-outline" size={20} color="#166534" />
            <Text style={styles.text}>Filtros</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e6f4ea", 
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        alignSelf: "flex-start",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, 
    },
    text: {
        marginLeft: 6,
        fontWeight: "600",
        color: "#166534", 
        fontSize: 15,
    },
});