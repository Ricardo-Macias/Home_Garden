import React, { useEffect, useLayoutEffect, useState} from "react";
import { useRouter, useNavigation } from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import DropDownPicker from "react-native-dropdown-picker";
import ImageViewer from "@/components/Image/ImageViewer";
import Button from "@/components/Image/ImageButton";
import ModalCamara from "@/components/Sensor/ModalCamara";
import Constants from "expo-constants";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

const PlaceholderImage = require("../../assets/images/Predeterminada.png");

export default function FormSensor(){
    const [name, setName] = useState("");
    const [image, setImage] = useState<string | null>(null); 
    const router = useRouter();
    const navigation = useNavigation();
    
    // Cambia el encabezado
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Agregar sensor"
        });
    }, [navigation]);
    // ----------------------

    const [modalCameraVisible, setModalCameraVisible] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

    const openCamera = async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
        if (hasCameraPermission){
            setModalCameraVisible(true);
        }
    }

    interface Crop {
        id: number;
        nombre: string;
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<{ label: string; value: string}[]>([]);

    useEffect(() => {
        fetch(`${config.API_URL}/crop`)
            .then((res) => res.json())
            .then((data: Crop[]) => {
                const options = data.map((item) => ({
                    label: item.nombre,
                    value: item.nombre,
                }));
                setItems(options);
            });
    }, []);

    const handleSumit = async () => {

        if(!name || !value){
            Alert.alert("Error", "Falta agregar un cultivo o un nombre");
            return;
        }

        try {
            const response = await fetch(`${config.API_URL}/addHomeVegetableGarden`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idSensorWifi: 1,
                    idCultivo: 1,
                    nombre: name,
                    fechaInicio: "2025-12-19",
                    fechaEstimada: "2025-12-19",
                    estado: 0,
                    imagen: image,
                }),
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Error al registrar");
            }

            Alert.alert("Exito", "Usuario registrado correctamente");

        } catch(err: any){
            Alert.alert("Error", err.message);
        }

        router.push("/(tabs)/home");
    };

    return (
        <View style={styles.container}>

            <View style={styles.ImageContainer}>
                { !image ?
                <ImageViewer 
                    theme="predetermined"
                    imgSource={PlaceholderImage}  
                    sizeWidth={300}
                    sizeHeight={200}
                />
                :
                <ImageViewer 
                    theme="photo"
                    imgSource={image}  
                    sizeWidth={300}
                    sizeHeight={200}
                />
                }
                <Button color="" label="" icon="camera" theme="primary" onPress={openCamera} />
            </View>

            <Text style={styles.text}>Nombre</Text>
            <View style={styles.InputContainer}>
                <TextInput 
                    value={name}
                    onChangeText={setName} 
                    style={styles.TextInput} 
                    placeholder="Nombre del sensor">
                </TextInput>
            </View>

            <Text style={styles.text}>Cultivo</Text>
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

            <TouchableOpacity onPress={handleSumit} style={styles.Button}>
                <Text style={styles.textButton}>Registrar sensor</Text>
            </TouchableOpacity>

            { modalCameraVisible && (<ModalCamara
                setImage={setImage}
                isVisible={modalCameraVisible}
                onClose={() => setModalCameraVisible(false)}>
            </ModalCamara>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        alignItems: "center",
    },
    ImageContainer: {
        flexDirection: "column",
        alignItems: "center",
   
        marginBottom: 16,
        width: "100%",
        backgroundColor: "#FFF",
    },
    DropDownPickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 16,
        width: "100%",
        backgroundColor: "#F9F9F9",
    },
    InputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
        width: "100%",
        backgroundColor: "#F9F9F9",
    },
    TextInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: "#333",
    },
    Button: {
        backgroundColor: "#641B9A",
        borderRadius: 10,
        paddingVertical: 14,
        width: "100%",
        alignItems: "center",
        bottom: 30, 
        marginTop: 50,
    },
    textButton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        color: "#333",
        marginBottom: 15,
    }
});