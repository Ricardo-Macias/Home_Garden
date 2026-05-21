import { ScrollView, StyleSheet } from "react-native";
import ComponentsSettings from "../../components/Perfile/ComponentsSettings";

export const options = {
    headerShown: false,
};

export default function SettingsScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ComponentsSettings />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 60,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: "stretch",
        position: "relative",
    },
});
