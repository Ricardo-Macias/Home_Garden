import { ScrollView, StyleSheet, Text } from "react-native";
import ComponentsSettings from "../../components/Perfile/ComponentsSettings";
export const options = {
    headerShown: false,
};
export default function SettingsScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Configuraciones</Text>
            <ComponentsSettings />
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#6A1B9A",
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 60,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: "stretch",
        position: "relative",   
    },
})