import { 
    Modal, 
    View, 
    Text, 
    Button,
    StyleSheet, 
    TouchableOpacity, 
    ListRenderItemInfo,
    FlatList,
 } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Device } from "react-native-ble-plx";

type Props = {
    items: Device[];
    isVisible: boolean;
    children: React.ReactNode;
    connectedToPeripheral: (device: Device) => void;
    goToConnectedWifi: () => void;
    onClose: () => void;
};

export default function ModalSensor({ items, isVisible, children, connectedToPeripheral, goToConnectedWifi, onClose }: Props){

    const connectAndClosedModal = async (device: Device) => {
        connectedToPeripheral(device);
        onClose();
        goToConnectedWifi();
    }

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
                    <FlatList 
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View style={styles.sensorsItem}>
                            <TouchableOpacity
                                style={{width: "100%",height: "100%" ,backgroundColor: "#6A1B9A", borderRadius: 5, justifyContent: "center", alignItems: "center"}}
                                onPress={() => connectAndClosedModal(item)}>
                                    <Text style={styles.sensorItemText}> { item.name } </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        height: "45%",
        width: "100%",
        backgroundColor: "#FFF",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "10%",
        backgroundColor: "#6A1B9A",
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
        padding: 10,
    },
    sensorsItem: {
    
        height: 50,
        width: "45%",
        },
    sensorItemText: {
        fontSize: 16,
        color: "#fff",
        
    }

})