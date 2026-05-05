import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import DropDownPicker from "react-native-dropdown-picker";
import ImageViewer from "@/components/Image/ImageViewer";
import Button from "@/components/Image/ImageButton";
import ModalCamara from "@/components/Sensor/ModalCamara";
import Constants from "expo-constants";
import { colors } from "../../styles/colors";
import FormStyle from "../../styles/FormStyle";
import MessageBox from "@/components/MessageBox";

interface AppConfig {
    API_URL: string;
}

const config = Constants.expoConfig?.extra as AppConfig;

const PlaceholderImage = require("../../assets/images/Predeterminada.png");

export default function FormSensor(){
    const [name, setName] = useState("");
    const [image, setImage] = useState<string | null>("Predeterminada.png"); 
    const {sensor, bandEdit} = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();
    const [message, setMessage] = useState<{
        type: "info" | "error" | "success";
        text: string;
    } | null>(null);

    // Fecha de inicio
    const date = new Date();
    const startDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);
    // ----------------------

    const [modalCameraVisible, setModalCameraVisible] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

    const openCamera = async () => {
        await MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        const granted = cameraStatus.status === "granted";
        setHasCameraPermission(granted);

        if (granted) {
            setModalCameraVisible(true);
        }
    };

    interface Crop {
        id: number;
        nombre: string;
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);

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

    const searchIdCrop = async () => {
        const response = await fetch(`${config.API_URL}/searchIdCrop/${value}`);
        const data = await response.json();
        return data.id;
    };

    const estimatedDate = async () => {
        const today = new Date();
        const estimated = new Date(today);

        const response = await fetch(`${config.API_URL}/durationCrop/${value}`);
        const data = await response.json();

        estimated.setDate(estimated.getDate() + data.duration);

        return `${estimated.getFullYear()}-${estimated.getMonth() + 1}-${estimated.getDate()}`;
    };

    const handleSubmit = async () => {
        if (!name || !value) {
            setMessage({ type: "error", text: "Faltan campos" });
            return;
        }

        try {
            const cropId = await searchIdCrop();
            const cropDuration = await estimatedDate();

            const response = await fetch(`${config.API_URL}/addHomeVegetableGarden`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    idSensor: sensor,
                    idCultivo: cropId,
                    nombre: name,
                    fechaInicio: startDate,
                    fechaEstimada: cropDuration,
                    estado: 0,
                    imagen: image,
                    edit: bandEdit
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al registrar");
            }

            setMessage({ type: "success", text: "Sensor registrado correctamente" });
            router.push("/(tabs)/home");
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        }

        router.push("/(tabs)/home"); 
    };

    return (
        <SafeAreaView style={FormStyle.safeArea}>
            <View style={FormStyle.container}>
                {/* Encabezado */}
                <View style={FormStyle.customHeader}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={26} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={FormStyle.headerTitle}>Registrar un nuevo sensor</Text>
                </View>

                <View style={FormStyle.content}>
                    <View style={FormStyle.ImageContainer}>
                        {!image ? (
                            <ImageViewer
                                theme="predetermined"
                                imgSource={PlaceholderImage}
                                sizeWidth={300}
                                sizeHeight={200}
                            />
                        ) : (
                            <ImageViewer
                                theme="photo"
                                imgSource={image}
                                sizeWidth={300}
                                sizeHeight={200}
                            />
                        )}
                        <Button
                            color=""
                            label=""
                            icon="camera"
                            theme="primary"
                            onPress={openCamera}
                        />
                    </View>

                    <Text style={FormStyle.label}>Nombre del sensor</Text>
                    <View style={FormStyle.InputContainer}>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={FormStyle.TextInput}
                            placeholder="Nombre del huerto"
                            placeholderTextColor={colors.textSecondary}
                        />
                    </View>

                    <Text style={FormStyle.label}>Cultivo asociado</Text>
                    <View style={FormStyle.DropDownWrapper}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="Selecciona un cultivo"
                            style={FormStyle.dropdown}
                            dropDownContainerStyle={FormStyle.dropdownContainer}
                            textStyle={{ color: colors.text }}
                            placeholderStyle={{ color: colors.textSecondary }}
                            listMode="SCROLLVIEW"
                        />
                    </View>

                    <TouchableOpacity onPress={handleSubmit} style={FormStyle.Button}>
                        <Text style={FormStyle.textButton}>Registrar sensor</Text>
                    </TouchableOpacity>

                    {/* Aquí se muestra el MessageBox */}
                    {message && (
                        <MessageBox
                            type={message.type}
                            message={message.text} 
                            onClose={() => setMessage(null)}
                        />
                    )}
                </View>

                {modalCameraVisible && (
                    <ModalCamara
                        setImage={setImage}
                        isVisible={modalCameraVisible}
                        onClose={() => setModalCameraVisible(false)}
                    />
                )}
            </View>
            {/* Pie de pagina*/}
            <Image
                source={require("../../assets/images/garden_footer.png")}
                style={FormStyle.footerImage}
                resizeMode="cover"
            />
        </SafeAreaView>
    );
}