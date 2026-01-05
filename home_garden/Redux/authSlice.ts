import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { loginApi, refreshApi } from "../services/authApi";
import Constants from "expo-constants";

const config = Constants.expoConfig?.extra || { API_URL: "" };

interface AuthState {
    user: any | null;
    accessToken: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    errorMessage: string | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    status: "idle",
    errorMessage: null,
};

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, pass }: { email: string; pass: string }, { rejectWithValue }) => {
        try {
            const data = await loginApi(email, pass);

            // guardar tokens
            await SecureStore.setItemAsync("accessToken", data.accessToken);
            await SecureStore.setItemAsync("refreshToken", data.refreshToken);
            await SecureStore.setItemAsync("user", JSON.stringify(data.user));

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message || "Error en login");
        }
    }
);



// REGISTRAR 
export const registerUser = createAsyncThunk(
    "auth/register",
    async (
        { nombre, apellidos, email, pass }:
        { nombre: string; apellidos: string; email: string; pass: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(`${config.API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre,
                    apellidos,
                    correo: email,
                    pass
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || "Error al registrar");
            }

            // no guardar tokens
            return data;

        } catch (err: any) {
            return rejectWithValue(err.message || "Error en el registro");
        }
    }
);



// REFRESH TOKEN
export const refreshToken = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
        try {
            const refresh = await SecureStore.getItemAsync("refreshToken");
            const userStr = await SecureStore.getItemAsync("user");

            if (!refresh || !userStr) throw new Error("No hay sesión guardada");

            const user = JSON.parse(userStr);

            const data = await refreshApi(refresh);
            await SecureStore.setItemAsync("accessToken", data.accessToken);

            return { accessToken: data.accessToken, user };
        } catch (err: any) {
            return rejectWithValue(err.message || "Error al refrescar token");
        }
    }
);



// LOGOUT
export const logoutUser = createAsyncThunk("auth/logout", async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");
});


// SLICE
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {

        // LOGIN
        builder.addCase(loginUser.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.errorMessage = action.payload as string;
        });

        // REFRESH
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });

        builder.addCase(refreshToken.rejected, (state) => {
            state.accessToken = null;
            state.user = null;
        });

        // LOGOUT
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.accessToken = null;
            state.status = "idle";
        });

        // REGISTER
        builder.addCase(registerUser.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(registerUser.fulfilled, (state) => {
            state.status = "succeeded";
            state.errorMessage = null;
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = "failed";
            state.errorMessage = action.payload as string;
        });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
