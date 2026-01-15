import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export async function getUserProfileApi(userId: number) {
    const token = await SecureStore.getItemAsync("accessToken");

    if (!token) {
        throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${API_URL}/perfil/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error backend perfil:", errorText);
        throw new Error(errorText || "Error al obtener perfil");
    }

    return res.json();
}
