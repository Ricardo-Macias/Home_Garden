import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ScanDevicesBluetooth from "../Bluetooth/ScanDevices";

type Props = {
    isVisible: boolean;
    children: React.ReactNode;
    onClose: () => void;
};

export default function ModalSensor({ isVisible, children, onClose }: Props){
    const router = useRouter();
    const sensors = [{
            id: 1,
            name: "sensor 1"
        },{
            id: 2,
            name: "sensor 2"
        },{
            id: 3,
            name: "sensor 3"
        },{
            id: 4,
            name: "sensor 4"
        }
    ];

    const handleSensor = () => {
        router.push("/sensor/AddSensor");
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Sensores
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </TouchableOpacity>
                </View>
                {children}
                <View style={styles.sensorsContainer}>
                    <ScanDevicesBluetooth />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        height: "45%",
        width: "100%",
        backgroundColor: "#1B3F31",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "10%",
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
    sensorsContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    sensorsItem: {
        backgroundColor: "blue",
        padding: 5,
        margin: 5,
        height: "20%",
        width: "45%",
    },
    sensorItemText: {
        fontSize: 25,
        color: "#fff",
        textAlign: "center",
        textAlignVertical: "center",
    }

})