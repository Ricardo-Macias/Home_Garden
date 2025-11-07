import React, { useLayoutEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import ImageViewer from "@/components/Image/ImageViewer";
import Button from "@/components/Image/ImageButton";

const PlaceholderImage = require("../../assets/images/Predeterminada.png");

export default function FormSensor(){
    const [text, onChangeText] = React.useState('Useless Text');
    const router = useRouter();
    const navigation = useNavigation();

    const handleHome = () => {
        router.push("/(tabs)/home");
    }

    // Cambia el encabezado
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Agregar sensor"
        });
    }, [navigation]);
    
    return (
        <View style={styles.container}>

            <Text style={styles.Label}>Nombre</Text>
            <TextInput 
                onChangeText={onChangeText} 
                style={styles.TextInput} 
                placeholder="Nombre del sensor">
            </TextInput>

            <Text style={styles.Label}>Cultivo</Text>
            <TextInput 
                onChangeText={onChangeText} 
                style={styles.TextInput}
                placeholder="Seleccionar cultivo">
            </TextInput>

            <View style={styles.ImageContainer}>
                <ImageViewer 
                    imgSource={PlaceholderImage}  
                    sizeWidth={300}
                    sizeHeight={200}
                />
            </View>

            <View>
                <Button label="Tomar foto" theme="primary"/>
            </View>

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
    ImageContainer: {
        flex: 1 / 2,
        marginTop: 15,
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
        margin: 10,
        color: "#000",
    }
});