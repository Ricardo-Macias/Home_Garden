import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import LoginForm from "../components/LoginForm";
import CreateUserForm from "../components/CreateUserForm";
import { useRouter, useRootNavigationState } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {
    loginUser,
    refreshToken,
    registerUser,
    clearError,
} from "../Redux/authSlice";
import { RootState, AppDispatch } from "../Redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
global.Buffer = global.Buffer || require('buffer').Buffer;

export default function Index() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const navigationState = useRootNavigationState();

    const { user, accessToken, status, errorMessage } = useSelector(
        (state: RootState) => state.auth
    );

    const [showSignup, setShowSignup] = useState(false);

    // Estado nuevo: evita mostrar login antes de saber si hay token
    const [checkingSession, setCheckingSession] = useState(true);

    const [loginMessage, setLoginMessage] = useState<string | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const refresh = await SecureStore.getItemAsync("refreshToken");

                if (refresh) {
                    await dispatch(refreshToken());
                }
            } catch (err) {
                console.log("Error leyendo token:", err);
            }

            // Termino de revision del token
            setCheckingSession(false);
        };

        checkToken();
    }, []);

    // Si ya hay usuario y token entra directamente a home
    useEffect(() => {
        if (!checkingSession && navigationState && accessToken && user) {
            router.replace("/(tabs)/home");
        }
    }, [checkingSession, navigationState, accessToken, user]);

    // Mientras se revisa sesión, monstrara loader
    if (checkingSession) {
        return (
            <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff", justifyContent:"center", alignItems:"center" }}>
                <ActivityIndicator size="large" />
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff" }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ flex: 1, backgroundColor: "#fff", padding: 5 }}>
                        {showSignup ? (
                            <CreateUserForm
                                onSubmit={(nombre, apellidos, email, pass) => {
                                    dispatch(registerUser({ nombre, apellidos, email, pass }))
                                        .unwrap()
                                        .then(() => {
                                            setShowSignup(false);
                                            setLoginMessage("Registro exitoso. Ahora ingresa tus credenciales.");
                                            dispatch(clearError());
                                        });
                                }}
                                loading={status === "loading"}
                                onCancel={() => setShowSignup(false)}
                                message={errorMessage}
                                messageType={errorMessage ? "error" : "info"}
                                onCloseMessage={() => dispatch(clearError())}
                            />
                        ) : (
                            <LoginForm
                                onSubmit={(email, pass) => {
                                    dispatch(loginUser({ email, pass }));
                                }}
                                loading={status === "loading"}
                                onSignupPress={() => {
                                    setShowSignup(true);
                                    setLoginMessage(null);
                                }}
                                message={loginMessage || errorMessage}
                                messageType={
                                    loginMessage ? "success" : errorMessage ? "error" : "info"
                                }
                                onCloseMessage={() => {
                                    setLoginMessage(null);
                                    dispatch(clearError());
                                }}
                            />
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}