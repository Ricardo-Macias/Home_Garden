import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import Constants from "expo-constants";
import LoginForm from "../components/LoginForm";
import CreateUserForm from "../components/CreateUserForm";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setUserId } from "../store/slices/userSlice";
import MessageBox from "../components/MessageBox";


const config = Constants.expoConfig?.extra || { API_URL: ""};

export default function Index(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const [message, setMessage] = useState<string | null>(null); 
    const [messageType, setMessageType] = useState<"error" | "success" | "info">("info");

    // Restaurar sesion si existe
    useEffect(() => {
        const checkStoredSession = async () => {
            try {
                const token = await SecureStore.getItemAsync("userToken");
                const userId = await SecureStore.getItemAsync("userId");
                if (token && userId) {
                    console.log("Sesión encontrada:", { token, userId });
                    dispatch(setUserId(userId));
                    router.replace("/(tabs)/home");
                }
            } catch (err) {
                console.error("Error al leer sesión:", err);
            }
        };
        checkStoredSession();
    }, []);

    // Validación rápida de campos
    const validateLoginFields = (email: string, pass: string) => {
        if (!email || !pass) {
            setMessage("Campos requeridos, ingresa correo y contraseña.");
            setMessageType("error");
            return false;
        }
        return true;
    };

    // Manejo uniforme de errores
    const showError = (message: string) => {
        setMessage(message);
        setMessageType("error")
    };

    // Login
    const handleLogin = async () => {
        if (!email || !pass) {
            setMessage("Campos requeridos, ingresa correo y contraseña.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${config.API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, pass }),
            });

            const data = await response.json();

            if (response.ok) {
                // El backend devuelve {message, user}
                const token = data.token || "token_de_prueba";
                const userId = String(data.user.id);

                // Guardar token e id en SecureStore
                await SecureStore.setItemAsync("userToken", token);
                await SecureStore.setItemAsync("userId", userId);

                // Guarda id en Redux
                dispatch(setUserId(userId));
                setMessage(`Bienvenido ${data.user.nombre || "usuario"}`);
                setMessageType("success");
                router.replace("/(tabs)/home");
            } else {
                setMessage(data.error || "Credenciales inválidas");
                setMessageType("error");
            }
        } catch (err) {
            setMessage("No se pudo conectar con el servidor.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={{ flex: 1}}>
            {showSignup ? (
                <CreateUserForm />
            ) : (
                <LoginForm
                    email={email}
                    pass={pass}
                    onEmailChange={setEmail}
                    onPassChange={setPass}
                    onSubmit={handleLogin}
                    loading={loading}
                    onSignupPress={() => setShowSignup(true)}
                    message={message}
                    messageType={messageType}     
                    onCloseMessage={() => setMessage(null)} 
                />
            )}
        </View>
    );
}