import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Device, BleManager } from "react-native-ble-plx";
import MessageBox from "@/components/MessageBox";
import { useEffect, useMemo, useState } from "react";
import styles from "../../styles/modalSensorStyles";

const { width } = Dimensions.get("window");

type Props = {
    setDeviceName: React.Dispatch<React.SetStateAction<string | null>>;
    items: Device[];
    isVisible: boolean;
    children: React.ReactNode;
    connectedToPeripheral: (device: Device) => void;
    goToConnectedWifi: () => void;
    onClose: () => void;
};

export default function ModalSensor({
    setDeviceName,
    items,
    isVisible,
    children,
    connectedToPeripheral,
    goToConnectedWifi,
    onClose,
}: Props) {
    const manager = useMemo(() => new BleManager(), []);
    const [poweredOn, setPoweredOn] = useState<boolean>();

    const connectAndClosedModal = async (device: Device) => {
        connectedToPeripheral(device);
        setDeviceName(device.localName);
        onClose();
        goToConnectedWifi();
    };

    useEffect(() => {
        const subscription = manager.onStateChange((state) => {
            if (state === "PoweredOn") {
                setPoweredOn(true);
            } else if (state === "PoweredOff") {
                setPoweredOn(false);
            }
        }, true);

        return () => subscription.remove();
    }, [manager]);

    return (
        <Modal animationType="slide" transparent visible={isVisible}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                
                <TouchableWithoutFeedback>
                    <View style={styles.modalContentSensor}>

                        {/* Encabezado */}
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Sensores</Text>
                            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                                <MaterialIcons name="close" color="#fff" size={22} />
                            </TouchableOpacity>
                        </View>

                        {children}

                        {/* Lista de sensores */}
                        {poweredOn ? (
                            <View style={styles.sensorsContainer}>
                                <FlatList
                                    data={items}
                                    keyExtractor={(item) => item.id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <View style={styles.sensorsItem}>
                                            <TouchableOpacity
                                                style={styles.sensorButton}
                                                activeOpacity={0.8}
                                                onPress={() =>
                                                    connectAndClosedModal(item)
                                                }
                                            >
                                                <Text style={styles.sensorItemText}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        ) : (
                            <MessageBox
                                type="info"
                                message="El bluetooth está desactivado"
                            />
                        )}

                        {/* Pie de pagina */}
                        <Image
                            source={require("../../assets/images/garden_footer.png")}
                            style={styles.footerImage}
                            resizeMode="cover"
                        />
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </Modal>
    );
}
