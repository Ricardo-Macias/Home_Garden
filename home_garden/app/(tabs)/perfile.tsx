import React from "react";
import { View, StyleSheet } from "react-native";
import ViewProfile from "../Profile/ViewUserProfile";

export default function PerfilScreen () {
    return (
        <View style={styles.container}>
            <ViewProfile />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});