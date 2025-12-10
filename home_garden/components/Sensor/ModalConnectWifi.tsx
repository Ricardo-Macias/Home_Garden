import React, { useEffect, useState } from "react"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

type Props = {
    ssid: string;
    setSsid: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    isVisible: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

export default function ModalConnectWifi({ssid, setSsid, password, setPassword,isVisible, children, onClose}: Props){
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        NetInfo.fetch().then(state => {
            const currentSsid = (state.details as any)?.ssid;
            setSsid(currentSsid || "");
        });
    }, []);

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text>
                        Conectar a WIFI
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22}/>
                    </TouchableOpacity>
                </View>
                {children}
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Nombre de la red</Text>
                    <View style={styles.InputContainer}>
                        <FontAwesome name="wifi" size={20} color="#6A109A" style={styles.icon}/>
                        <TextInput
                            value={ssid}
                            onChangeText={setSsid}
                            editable={false}
                            style={styles.TextInput}
                            placeholder="Nombre de la red"></TextInput>
                    </View>

                    <Text style={styles.text}>Contraseña</Text>
                    <View style={styles.InputContainer}>
                        <FontAwesome name="lock" size={20} color="#6A109A" style={styles.icon}/>
                        <TextInput 
                            style={styles.TextInput}
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
                    <TouchableOpacity style={styles.Button} onPress={onClose}>
                        <Text style={styles.textButton}>Conectar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        height: "75%",
        width: "100%",
        backgroundColor: "#1B3F31",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "7%",
        backgroundColor: "#367D62",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 16,
    },
    formContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        alignItems: "center",
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
        backgroundColor: "#f9f9f9",
    },
    TextInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: "#333",
    },
    Button: {
        backgroundColor: "#6A1B9A",
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
    },
    icon: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
})