import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../Redux/store";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack screenOptions={{contentStyle: { backgroundColor: "#fff" },}}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </Provider>
    );
}