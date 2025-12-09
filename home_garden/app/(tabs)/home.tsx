import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import ModalSensor from "@/components/Sensor/ModalSensor";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import BluetoothLeManager from "@/components/Bluetooth/BluetoothLeManager";

interface AppConfig {
    API_URL: string;
}
const config = Constants.expoConfig?.extra as AppConfig;

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [users, setUser] = useState([]);


    const {
        requestPermissions,
        scanForPeripherals,
        connectToDevice,
        connectedDevice,
        allDevices,
    } = BluetoothLeManager();
    

    const scanForDevices = async () => {
        const isPermissionsEnable = await requestPermissions();
        if (isPermissionsEnable){
            scanForPeripherals();
        }
    }

    const onModalClose = () => {
        setModalVisible(false);
    };

    const onModalOpen = async () => {
        scanForDevices();
        setModalVisible(true);
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    async function fetchData() {
        const response = await fetch(`${config.API_URL}/sensor/1`);
        const data = await response.json();

        setUser(data);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Text> Bienvenido </Text>
                <Text>{ JSON.stringify(users) }</Text>
            </View>
            <View style={styles.buttonAdd}>
                <TouchableOpacity onPress={onModalOpen}>
                    <MaterialIcons name="add" size={28} color="#f9f9f9"/>
                </TouchableOpacity>
                <ModalSensor
                    items={allDevices}
                    isVisible={modalVisible}
                    connectedToPeripheral={connectToDevice}
                    onClose={onModalClose}>
                    <></>
                </ModalSensor>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    buttonAdd: {
        backgroundColor: "#6A1B9A",
        position: "absolute",
        bottom: 5,
        right: 15,
        borderRadius: 10,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    }

});