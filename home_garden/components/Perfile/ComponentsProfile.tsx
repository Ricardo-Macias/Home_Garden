import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../Redux/hooks"; 
import { logoutUser } from "../../Redux/authSlice";


interface Props {
    nombre: string;
    apellidos: string;
    correo: string;
}

export default function ComponentsProfile({ nombre, apellidos, correo }: Props) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap(); // limpia Redux + SecureStore
            router.replace("/");                   // redirige al login
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };



    return (
        <View style={styles.container}>
            {/* Información del usuario */}
            <View>
                <Text style={styles.name}>{nombre} {apellidos}</Text>
                <Text style={styles.email}>{correo}</Text>
            </View>

            {/* Iconos */}
            <View style={styles.icons}>
                <TouchableOpacity onPress={() => router.push("/Profile/Settings")}>
                    <Ionicons name="settings-outline" size={24} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#d11a2a" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
        color: "#666",
    },
    icons: {
        flexDirection: "row",
        gap: 16,
    },
});