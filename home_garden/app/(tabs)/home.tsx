import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

interface AppConfig {
    API_URL: string;
}
const config = Constants.expoConfig?.extra as AppConfig;

export default function Home() {

    const [users, setUser] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    
    async function fetchData() {
        const response = await fetch(`${config.API_URL}/sensor/1`);
        const data = await response.json();

        setUser(data);
    }

    return (
        <View style={styles.container}>
            <Text> Bienvenido </Text>
            <Text>{ JSON.stringify(users) }</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

});