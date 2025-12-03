import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageBox from "../components/MessageBox";
import FormStyle from "../styles/FormStyle";


const config = Constants.expoConfig?.extra || { API_URL: "" };

export default function CreateUserForm(){
    const [nombre, setNombre] = useState<string>("");
    const [apellidos, setApellidos] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmPass, setConfirmPass] = useState<string>("");

    const [message, setMessage] = useState<string | null>(null); 
    const [messageType, setMessageType] = useState<"error" | "success" | "info">("info");

    const router = useRouter();

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const handleSignup = async () => {
        if (!nombre || !apellidos || !email || !pass || !confirmPass) {
            setMessage("Completa todos los campos.");
            setMessageType("error");
            return;
        }

        if (pass !== confirmPass) {
            setMessage("Las contraseñas no coinciden.");
            setMessageType("error");
            return;
        }


        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passRegex.test(pass)) {
            setMessage("La contraseña debe tener mínimo 8 caracteres, incluir letras y números.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${config.API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, apellidos, correo: email, pass }),
            });

            const data = await response.json();

        } catch (err) {
            console.error("Error en registro:", err);
            setMessage("No se pudo conectar con el servidor.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={FormStyle.container}>

            {message && (
                <MessageBox
                    type={messageType}
                    message={message}
                    onClose={()=> setMessage(null)}
                />
            )}

            <TouchableOpacity style={FormStyle.backButton} onPress={() => router.replace("/")}>
                <MaterialIcons name="arrow-back-ios" size={24} color="#6A1B9A" />
            </TouchableOpacity>


            <Text style={FormStyle.title}>Home Garden</Text>
            <Text style={FormStyle.subtitle}>Account Signup</Text>

            <View style={FormStyle.inputContainer}>
                <MaterialIcons name="person" size={20} color="#6A1B9A" style={FormStyle.icon} />
                <TextInput
                    style={FormStyle.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={FormStyle.inputContainer}>
                <MaterialIcons name="person-outline" size={20} color="#6A1B9A" style={FormStyle.icon} />
                <TextInput
                    style={FormStyle.input}
                    placeholder="Apellidos"
                    value={apellidos}
                    onChangeText={setApellidos}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={FormStyle.inputContainer}>
                <MaterialIcons name="email" size={20} color="#6A1B9A" style={FormStyle.icon} />
                <TextInput
                    style={FormStyle.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />
            </View>

            <View style={FormStyle.inputContainer}>
                <FontAwesome name="lock" size={20} color="#6A1B9A" style={FormStyle.icon} />
                <TextInput
                    style={FormStyle.input}
                    placeholder="Contraseña"
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry={!showPass}
                    placeholderTextColor="#999"
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                    <MaterialIcons
                        name={showPass ? "visibility" : "visibility-off"} 
                        size={20}
                        color="#999"
                        style={FormStyle.iconRight}
                    />
                </TouchableOpacity>
            </View>

            <View style={FormStyle.inputContainer}>
                <FontAwesome name="lock" size={20} color="#6A1B9A" style={FormStyle.icon} />
                    <TextInput
                        style={FormStyle.input}
                        placeholder="Confirmar contraseña"
                        value={confirmPass}
                        onChangeText={setConfirmPass}
                        secureTextEntry={!showConfirmPass}
                        placeholderTextColor="#999"
                    />
                <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                    <MaterialIcons
                        name={showConfirmPass ? "visibility" : "visibility-off"}
                        size={20}
                        color="#999"
                        style={FormStyle.iconRight}
                    />
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={FormStyle.signupButton} onPress={handleSignup} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={FormStyle.signupText}>Signup</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
}
