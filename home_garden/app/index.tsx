import React, { useState } from "react";
import { View, Alert } from "react-native";
import Constants from "expo-constants";
import LoginForm from "../components/LoginForm";

const config = Constants.expoConfig?.extra || { API_URL: "" };

export default function Index() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        Alert.alert("Login exitoso", `Bienvenido ${data.name || "usuario"}`);
      } else {
        const text = await response.text();
        console.error("Respuesta inesperada:", text);
        Alert.alert("Error", "Respuesta inesperada del servidor.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert("Error", "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LoginForm
        email={email}
        pass={pass}
        onEmailChange={setEmail}
        onPassChange={setPass}
        onSubmit={handleLogin}
        loading={loading}
      />
    </View>
  );
}