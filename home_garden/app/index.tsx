import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import Constants from "expo-constants";
import LoginForm from "../components/LoginForm";
import CreateUserForm from "../components/CreateUserForm";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const config = Constants.expoConfig?.extra || { API_URL: "" };

export default function Index() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkStoredToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          console.log(" encontrado al iniciar:", token);
          router.replace("/(tabs)/home");
        }
      } catch (err) {
        console.error("Error al leer token:", err);
      }
    };

    checkStoredToken();
  }, []);

  const handleLogin = async () => {
    if (!email || !pass) {
      Alert.alert("Campos requeridos", "Ingresa correo y contraseña.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${config.API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass }),
      });

      if (response.ok) {
        const data = await response.json();

        // Guardar token en SecureStore
        await SecureStore.setItemAsync("userToken", data.token || "token_de_prueba");

        // Leer el token para confirmar que se guardó
        const storedToken = await SecureStore.getItemAsync("userToken");
        console.log("Token guardado en SecureStore:", storedToken);

        Alert.alert("Login exitoso", `Bienvenido ${data.nombre || "usuario"}`);
        router.replace("/(tabs)/home");
      } else {
        const error = await response.json();
        Alert.alert("Error", error.error || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("Error en login:", err);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    setShowSignup(true);
  };

  return (
    <View style={{ flex: 1 }}>
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
          onSignupPress={handleSignup}
        />
      )}
    </View>
  );
}