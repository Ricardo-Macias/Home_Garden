import Constants from "expo-constants";

const config = Constants.expoConfig?.extra || { API_URL: "" };

export const loginApi = async (email: string, pass: string) => {
    const response = await fetch(`${config.API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en login");
    }

    return await response.json();
};

export const refreshApi = async (refreshToken: string) => {
    const response = await fetch(`${config.API_URL}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al refrescar token");
    }

    return await response.json();
};