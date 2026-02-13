import { View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <Tabs
                screenOptions={{
                    headerShown: false,

                    tabBarActiveTintColor: "#228B22",
                    tabBarInactiveTintColor: "#ffffff",

                    tabBarStyle: {
                        position: "absolute",
                        marginHorizontal: 20,
                        bottom: insets.bottom > 0 ? insets.bottom : 10,
                        backgroundColor: "transparent",
                        borderRadius: 40,
                        height: 70,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 0.8,
                        justifyContent: "center",
                    },

                    tabBarItemStyle: {
                        justifyContent: "center",
                    },

                    sceneStyle: {
                        marginTop: insets.top,
                        paddingBottom: insets.bottom + 80,
                        backgroundColor: "#ffffff",
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        tabBarLabel: "Inicio",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "home-sharp" : "home-outline"}
                                color={color}
                                size={28}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="explore"
                    options={{
                        tabBarLabel: "Explorar",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={focused ? "search" : "search-outline"}
                                color={color}
                                size={28}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="perfile"
                    options={{
                        tabBarLabel: "Perfil",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name={
                                    focused
                                        ? "person-circle"
                                        : "person-circle-outline"
                                }
                                color={color}
                                size={28}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffcfc",
    },
});
