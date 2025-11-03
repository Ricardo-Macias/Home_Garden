import React, { useState } from "react";
import { Alert, View } from "react-native";
import Constants from "expo-constants";
import LoginForm from "../components/LoginForm";
import CreateUserForm from "../components/CreateUserForm";
import { useRouter } from "expo-router";

const config = Constants.expoConfig?.extra || { API_URL: "" };

export default function Index() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 
  const router = useRouter();

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