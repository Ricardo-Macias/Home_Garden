import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageBox from "./MessageBox";
import FormStyle from "../styles/FormStyle";

interface CreateUserFormProps {
    onSubmit: (nombre: string, apellidos: string, email: string, pass: string) => void;
    loading?: boolean;
    onCancel: () => void;
    message?: string | null;
    messageType?: "error" | "success" | "info";
    onCloseMessage?: () => void;
}

export default function CreateUserForm({
    onSubmit,
    loading = false,
    onCancel,
    message,
    messageType = "info",
    onCloseMessage,
}: CreateUserFormProps) {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // Estado local para mensajes de validación
    const [localMessage, setLocalMessage] = useState<string | null>(null);
    const [localMessageType, setLocalMessageType] = useState<"error" | "success" | "info">("info");

    const handleSignup = () => {
        if (!nombre || !apellidos || !email || !pass || !confirmPass) {
            setLocalMessage("Todos los campos son obligatorios");
            setLocalMessageType("error");
            return;
        }

        // Validación de correo con dominios permitidos
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        if (!emailRegex.test(email)) {
            setLocalMessage("El correo debe ser válido y terminar en @gmail.com, @hotmail.com o @outlook.com");
            setLocalMessageType("error");
            return;
        }

        if (pass !== confirmPass) {
            setLocalMessage("Las contraseñas no coinciden");
            setLocalMessageType("error");
            return;
        }

        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passRegex.test(pass)) {
            setLocalMessage("La contraseña debe tener mínimo 8 caracteres, incluir letras y números");
            setLocalMessageType("error");
            return;
        }

        // Si pasa las validaciones, limpiar mensaje y enviar al backend
        setLocalMessage(null);
        onSubmit(nombre, apellidos, email, pass);
    };


    return (
        <SafeAreaView style={FormStyle.container}>
            <TouchableOpacity style={FormStyle.backButton} onPress={onCancel}>
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

            {/* Mostrar mensajes de validación locales */}
            {localMessage && (
                <MessageBox
                    type={localMessageType}
                    message={localMessage}
                    onClose={() => setLocalMessage(null)}
                />
            )}

            {/* Mostrar mensajes que vengan del backend */}
            {message && (
                <MessageBox
                    type={messageType}
                    message={message}
                    onClose={onCloseMessage}
                />
            )}

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