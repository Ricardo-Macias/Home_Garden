import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#228B22",
                tabBarStyle: {
                    borderRadius: 20,
                    margin: 10,
                    backgroundColor: "#25292c",
                },

            }}
        >
            <Tabs.Screen name="home" options={{
                tabBarLabel: "Inicio",
                tabBarIcon: ({ focused, color }) => <Ionicons
                    name={focused ? "home-sharp" : "home-outline"}
                    color={color}
                    size={24} />,
            } } />
            <Tabs.Screen name="explore" options={{
                tabBarLabel: "Explorar",
            } } />
            <Tabs.Screen name="perfile" options={{
                tabBarLabel: "Perfil",
            }} />
        </Tabs>
    );
}