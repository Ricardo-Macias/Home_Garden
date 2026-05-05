import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import FormStyle from "../styles/FormStyle";
import MessageBox from "./MessageBox";

interface LoginFormProps {
    onSubmit: (email: string, pass: string) => void; 
    loading?: boolean;
    onSignupPress: () => void;
    message?: string | null;
    messageType?: "error" | "success" | "info";
    onCloseMessage?: () => void;
}

export default function LoginForm({
    onSubmit,
    loading = false,
    onSignupPress,
    message,
    messageType = "info",
    onCloseMessage,
}: LoginFormProps) {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);

    // Estado local para manejar errores de validación
    const [localError, setLocalError] = useState<string | null>(null);

    const handleLogin = () => {
        if (!email || !pass) {
            setLocalError("Todos los campos son obligatorios");
            return;
        }
        // limpiar error local si pasa la validación
        setLocalError(null);
        onSubmit(email, pass);
    };

    return (
        <SafeAreaView style={FormStyle.container}>

            <Image
                source={require("../assets/images/Mora.png")}
                style={FormStyle.image}
                resizeMode="contain"
            />
            <Text style={FormStyle.title}>Home Garden</Text>
            <Text style={FormStyle.subtitle}>Account Login</Text>

            <View style={FormStyle.inputContainer}>
                <MaterialIcons name="email" size={20} color="#6A1B9A" style={FormStyle.icon}/>
                <TextInput
                    style={FormStyle.input}
                    placeholder="correo@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={FormStyle.inputContainer}>
                <FontAwesome name="lock" size={20} color="#6A1B9A" style={FormStyle.icon}/>
                <TextInput
                    style={FormStyle.input}
                    placeholder="••••••••"
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

            {/* Mensaje de validación local */}
            {localError && (
                <MessageBox
                    type="error"
                    message={localError}
                    onClose={() => setLocalError(null)}
                />
            )}

            {/* Mensaje global (error, éxito o info) */}
            {message && (
                <MessageBox
                    type={messageType}
                    message={message}
                    onClose={onCloseMessage}
                />
            )}

            <TouchableOpacity
                style={FormStyle.loginButton}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={FormStyle.loginText}>Login</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={FormStyle.googleButton}>
                <FontAwesome name="google" size={20} color="#fff" style={FormStyle.icon}/>
                <Text style={FormStyle.googleText}>Sign in with Google</Text>
            </TouchableOpacity>

            <View style={FormStyle.footer}>
                <Text style={FormStyle.footerText}>
                    ¿No tienes una cuenta?{" "}
                    <Text style={FormStyle.signup} onPress={onSignupPress}>
                        Regístrate
                    </Text>
                </Text>
            </View>

        </SafeAreaView>
    );
}
