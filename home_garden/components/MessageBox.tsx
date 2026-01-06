import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface MessageBoxProps {
    type?: "error" | "success" | "info"; // tipo de mensaje
    message: string;                     // texto del mensaje
    onClose?: () => void;                // callback para cerrar
    duration?: number;                   // tiempo en ms antes de auto-cerrar
}

export default function MessageBox({ 
    type = "info", 
    message, 
    onClose, 
    duration = 5000
}: MessageBoxProps) {

    const backgroundColor =
        type === "error" ? "#F8D7DA" : type === "success" ? "#D4EDDA" : "#D1ECF1";
    const textColor =
        type === "error" ? "#721C24" : type === "success" ? "#155724" : "#0C5460";
    const iconName =
        type === "error" ? "error-outline" : type === "success" ? "check-circle" : "info";

    // Auto-cierre 
    useEffect(() => {
        if (onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [onClose, duration]);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <MaterialIcons name={iconName} size={24} color={textColor} style={styles.icon} />
            <Text style={[styles.message, { color: textColor }]}>{message}</Text>
            {onClose && (
                <TouchableOpacity onPress={onClose}>
                    <MaterialIcons name="close" size={20} color={textColor} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2, // android
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 8,
    },
    message: {
        flex: 1,
        fontSize: 16,
    },
});