import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter, useNavigation } from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ImageViewer from "@/components/Image/ImageViewer";
import Button from "@/components/Image/ImageButton";
import Constants from "expo-constants";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

const PlaceholderImage = require("../../assets/images/Predeterminada.png");

export default function FormSensor(){
    const [text, onChangeText] = React.useState('Useless Text');
    const router = useRouter();
    const navigation = useNavigation();

    type Crop = {
        id: number;
        nombre: string;
        tipo: string;
        dificultad: string;
        duracion: number;
        descripcion: string;
        consejo: string;
    }

    const [crop, setCrop] = useState<Crop[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(){
        const response = await fetch(`${config.API_URL}/crop`);
        const data = await response.json();

        setCrop(data);
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: "Apple", value: "apple"},
        {label: "Banana", value: "banana"}
    ]);

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

            <View style={styles.ImageContainer}>
                <ImageViewer 
                    imgSource={PlaceholderImage}  
                    sizeWidth={300}
                    sizeHeight={200}
                />
            </View>

            <Text style={styles.Label}>Nombre</Text>
            <TextInput 
                onChangeText={onChangeText} 
                style={styles.TextInput} 
                placeholder="Nombre del sensor">
            </TextInput>

            <Text style={styles.Label}>Cultivo</Text>
            <View style={styles.DropDownPickerContainer}>
                <DropDownPicker 
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Selecciona un cultivo"
                    />
            </View>

            <Text> { JSON.stringify(crop[0]?.nombre) } </Text>

            <View >

            </View>

            <View style={{margin: 10}}>
                <Button label="Tomar foto" theme="primary" />
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
        marginTop: 15,
    },
    DropDownPickerContainer: {
        width: "90%",
    },
    TextInput: {
        width: "90%",
        height: 48,
        backgroundColor: "#fff",
        fontSize: 16,
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