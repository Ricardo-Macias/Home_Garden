import React, {useEffect, useLayoutEffect, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BleManager } from "react-native-ble-plx";
import NetInfo from "@react-native-community/netinfo";


// UUIDs 
const SERVICE_UUID = "79f0dfb3-5f08-4502-8ff0-5a9b2396aab1";
const SSID_CHAR_UUID = "d24233d0-b34d-4bbe-8f2a-f661530c6217";
const PASS_CHAR_UUID = "ef1c20a3-26b6-4aab-88dc-e377f105e8f4";

export default function Connect(){
    const manager = new BleManager();
    const navigation = useNavigation();
    const router = useRouter();
    const { deviceId } = useLocalSearchParams();
    const [showPass, setShowPass] = useState(false);

    const [ssid, setSsid] = useState("");
    const [pass, setPass] = useState<string>("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Conectar a WIFI"
        });
    }, [navigation])

    useEffect(() => {
        NetInfo.fetch().then(state => {
            const currentSsid = (state.details as any)?.ssid;
            setSsid(currentSsid || "");
        });
    }, []);

    const handleSensor = () => {
        router.push("/sensor/AddSensor");
    };

    const sendCredentials = async () => {
        const id = Array.isArray(deviceId) ? deviceId[0] : deviceId;
        const connectDevice = await manager.connectToDevice(id, { timeout: 5000 });
        console.log("Funciono ", deviceId);
        
        try {
            console.log("Enviando SSID: ", ssid);
            await connectDevice.writeCharacteristicWithResponseForService(
                SERVICE_UUID,
                SSID_CHAR_UUID,
                Buffer.from(ssid).toString("base64")
            );

            console.log("Enviando password: ", pass);
            await connectDevice.writeCharacteristicWithResponseForService(
                SERVICE_UUID,
                PASS_CHAR_UUID,
                Buffer.from(pass).toString("base64")
            );

            console.log("Datos enviados correctamente");
            
        } catch (err) {
            console.log("Error enviando datos: ", err);
        }
    };

    return (
        <View style={styles.container}>
            <View>

            </View>
            <Text style={styles.Text}>Nombre de la red</Text>
            <View style={styles.InputContainer}>
                <FontAwesome name="wifi" size={20} color="#6A109A" style={styles.icon} />
                <TextInput
                    value={ssid}
                    editable={false}
                    style={styles.TextInput}
                    placeholder="Nombre de la red"
                ></TextInput>
            </View>

            <Text style={styles.Text}>Contraseña</Text>
            <View style={styles.InputContainer}>
                <FontAwesome name="lock" size={20} color="#6A109A" style={styles.icon}/>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Contraseña"
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry={!showPass}
                    placeholderTextColor="#999"
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                    <MaterialIcons 
                        name={showPass ? "visibility" : "visibility-off"}
                        size={20}
                        color="#999"
                        style={styles.iconRight}
                    />
                </TouchableOpacity>
            </View>
                <TouchableOpacity style={styles.Button} onPress={sendCredentials}>
                    {/*<ActivityIndicator color="#fff" /> */}
                    <Text style={styles.textButton}>Conectar</Text>
                </TouchableOpacity>
            <View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 60,
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
    Text: {
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