import React from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function FormSensor(){
    const [text, onChangeText] = React.useState('Useless Text');
    const router = useRouter();

    const handleHome = () => {
        router.push("/(tabs)/home");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Label}>Foto</Text>
            <TextInput onChangeText={onChangeText} style={styles.TextInput}></TextInput>

            <Text style={styles.Label}>Nombre</Text>
            <TextInput onChangeText={onChangeText} style={styles.TextInput}></TextInput>

            <Text style={styles.Label}>Cultivo</Text>
            <TextInput onChangeText={onChangeText} style={styles.TextInput}></TextInput>

            <TouchableOpacity onPress={handleHome} style={styles.Button}>
                <Text>Boton</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    TextInput: {
        width: "90%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
    },
    Button: {
        width: "90%",
        height: 40,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#6a1b9a",
    },
    Label: {
        fontSize: 16,
        color: "#000",
    }
});