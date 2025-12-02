import * as SecureStore from "expo-secure-store";

const sanitizeKey = (key: string) => key.replace(/[^A-Za-z0-9._-]/g, "_");

const SecureStorage = {
    setItem: async (key: string, value: string) => {
        await SecureStore.setItemAsync(sanitizeKey(key), value);
    },
    getItem: async (key: string) => {
        return await SecureStore.getItemAsync(sanitizeKey(key));
    },
    removeItem: async (key: string) => {
        await SecureStore.deleteItemAsync(sanitizeKey(key));
    },
};

export default SecureStorage;