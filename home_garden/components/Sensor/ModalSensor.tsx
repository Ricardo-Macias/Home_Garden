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
                        <Button 
                            title={`Conectar a ${item.name}`}
                            onPress={() => connectAndClosedModal(item)}
                        />
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