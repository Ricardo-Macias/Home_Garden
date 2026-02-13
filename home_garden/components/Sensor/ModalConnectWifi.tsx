import React, { useEffect, useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Keyboard,
    Platform,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import styles from "../../styles/modalSensorStyles";  

type Props = {
    ssid: string;
    setSsid: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    isVisible: boolean;
    children: React.ReactNode;
    onClose: () => void;
};

export default function ModalConnectWifi({
    ssid,
    setSsid,
    password,
    setPassword,
    isVisible,
    children,
    onClose,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        NetInfo.fetch().then((state) => {
            const currentSsid = (state.details as any)?.ssid;
            setSsid(currentSsid || "");
        });
    }, []);

    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const onModalClose = () => {
        setPassword("");
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={{ flex: 1 }}>
                <View style={styles.modalContentWifi}>
                    {/* Encabezado */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Conectar a WIFI</Text>
                        <TouchableOpacity onPress={onModalClose}>
                            <MaterialIcons name="close" color="#fff" size={22} />
                        </TouchableOpacity>
                    </View>

                    {children}

                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: keyboardHeight, // 🔥 ajuste dinámico
                        }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.formContainer}>
                            <Text style={styles.text}>Nombre de la red</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome
                                    name="wifi"
                                    size={20}
                                    color={styles.iconColor.color}
                                    style={styles.icon}
                                />
                                <TextInput
                                    value={ssid}
                                    onChangeText={setSsid}
                                    editable={false}
                                    style={styles.textInput}
                                    placeholder="Nombre de la red"
                                />
                            </View>

                            <Text style={styles.text}>Contraseña</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome
                                    name="lock"
                                    size={20}
                                    color={styles.iconColor.color}
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <MaterialIcons
                                        name={showPassword ? "visibility" : "visibility-off"}
                                        size={20}
                                        color="#999"
                                        style={styles.iconRight}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.button} onPress={onClose}>
                                <Text style={styles.textButton}>Conectar</Text>
                            </TouchableOpacity>
                        </View>

                        <Image
                            source={require("../../assets/images/garden_footer.png")}
                            style={styles.footerImage}
                            resizeMode="cover"
                        />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}