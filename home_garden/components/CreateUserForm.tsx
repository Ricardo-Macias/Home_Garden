import React, { useState  } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

const config = Constants.expoConfig?.extra || { API_URL: "" };

export default function CreateUserForm(){
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async() =>{
        if(!nombre || !apellidos || !email || !pass){
            Alert.alert("Campos requeridos", "Completa todos los campos.");
            return;
        }
        setLoading(true);
        try{
            const response = await fetch(`${config.API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, apellidos, correo: email, pass }),
            });

            if (response.ok) {
                Alert.alert("Registro exitoso", "Tu cuenta ha sido creada.");
                router.replace("/"); 
            } else {
                const error = await response.json();
                Alert.alert("Error", error.error || "No se pudo registrar el usuario.");
            }
        } catch (err) {
            console.error("Error en registro:", err);
            Alert.alert("Error", "No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/")}>
                <MaterialIcons name="arrow-back-ios" size={24} color="#6A1B9A" />
            </TouchableOpacity>


            <Text style={styles.title}>Home Garden</Text>
            <Text style={styles.subtitle}>Account Signup</Text>

            <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={20} color="#6A1B9A" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="person-outline" size={20} color="#6A1B9A" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Apellidos"
                    value={apellidos}
                    onChangeText={setApellidos}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#6A1B9A" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color="#6A1B9A" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry
                    placeholderTextColor="#999"
                />
                <MaterialIcons name="visibility-off" size={20} color="#999" style={styles.iconRight} />
            </View>

            <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.signupText}>Signup</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 60,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#6A1B9A",
    },
    subtitle:{
        fontSize: 16,
        color: "#333",
        marginBottom: 30,
    },
    inputContainer:{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
        width: "100%",
        backgroundColor: "#f9f9f9",
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: "#333",
    },
    icon: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    signupButton: {
        backgroundColor: "#6A1B9A",
        borderRadius: 10,
        paddingVertical: 14,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    signupText:{
        color: "#fff",
        fontSize: 16, 
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        padding: 10,
        zIndex: 10,
    },
});
