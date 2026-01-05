import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export async function getUserProfileApi(userId: number) {
    const token = await SecureStore.getItemAsync("accessToken");

    const res = await fetch(`${API_URL}/perfil/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Error al obtener perfil");
    }

    return res.json();
}
