import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    Image,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { formatDate } from "@/components/utils/formatDate";

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL;

interface HistorialItem {
    idHuerto: number;
    huerto: string;
    cultivo: string;
    tipo?: string;
    dificultad?: string;
    fechaInicio: string;
    fechaFin: string;
    imagen?: string;
}

interface Props {
    historial: HistorialItem[];
}

export default function ComponentsHistory({ historial }: Props) {

    const [selectedItem, setSelectedItem] = useState<HistorialItem | null>(null);

    const handleSelect = (item: HistorialItem) => {
        setSelectedItem(item);
    };

    const closeModal = () => setSelectedItem(null);

    const renderItem = ({ item }: { item: HistorialItem }) => {
        console.log(item.imagen);
        const imageUrl = item.imagen
            ? `${SUPABASE_URL}/uploads/Sensores/${item.imagen}`
            : "https://via.placeholder.com/100x100.png?text=Huerto";

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => handleSelect(item)}
                activeOpacity={0.9}
            >
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
                <View style={styles.info}>
                    <Text style={styles.cardTitle}>{item.huerto}</Text>
                    <Text style={styles.text}>Cultivo: {item.cultivo}</Text>
                    <Text style={styles.text}>Inicio: {formatDate(item.fechaInicio)}</Text>
                    <Text style={styles.text}>Fin: {formatDate(item.fechaFin)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
    })

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>
                Huertos terminados: {historial?.length ?? 0}
            </Text>

            <FlatList
                data={historial}
                keyExtractor={(item) => item.idHuerto.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={styles.empty}>No hay huertos terminados.</Text>}
            />

            {/* Modal detalle */}
            <Modal
                visible={!!selectedItem}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Boton de cerrar */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={closeModal}>
                                <Ionicons name="close-circle" size={28} color="#673AB7" />
                            </TouchableOpacity>
                        </View>

                        {selectedItem && (
                            <ScrollView style={{ width: "100%" }}>
                                <View style={styles.modalBody}>
                                    {/* Imagen */}
                                    <Image
                                        source={{
                                            uri: selectedItem.imagen
                                                ? `${SUPABASE_URL}/uploads/Sensores/${selectedItem.imagen}`
                                                : "https://via.placeholder.com/200x150.png?text=Huerto",
                                        }}
                                        style={styles.modalImage}
                                        resizeMode="cover"
                                    />

                                    {/* Nombre del huerto */}
                                    <Text style={styles.modalTitle}>{selectedItem.huerto}</Text>

                                    {/* Informacion */}
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.modalText}>
                                            <Ionicons name="leaf-outline" size={18} color="#4CAF50" /> Cultivo:{" "}
                                            <Text style={styles.highlight}>{selectedItem.cultivo}</Text>
                                        </Text>
                                        <Text style={styles.modalText}>
                                            <Ionicons name="pricetag-outline" size={18} color="#2196F3" /> Tipo:{" "}
                                            <Text style={styles.highlight}>{selectedItem.tipo || "No especificado"}</Text>
                                        </Text>
                                        <Text style={styles.modalText}>
                                            <Ionicons name="flash-outline" size={18} color="#FF9800" /> Dificultad:{" "}
                                            <Text style={styles.highlight}>{selectedItem.dificultad || "No especificada"}</Text>
                                        </Text>
                                        <Text style={styles.modalText}>
                                            <Ionicons name="calendar-outline" size={18} color="#9C27B0" /> Inicio:{" "}
                                            <Text style={styles.highlight}>{formatDate(selectedItem.fechaInicio)}</Text>
                                        </Text>
                                        <Text style={styles.modalText}>
                                            <Ionicons name="checkmark-done-outline" size={18} color="#009688" /> Fin:{" "}
                                            <Text style={styles.highlight}>{formatDate(selectedItem.fechaFin)}</Text>
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "300",
        textAlign: "center",
        marginBottom: 16,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        marginBottom: 12,
        padding: 10,
        elevation: 2,
        width: "95%",
        alignSelf: "center",
        alignItems: "center",
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 6,
        backgroundColor: "#ddd",
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        color: "#333",
    },
    empty: {
        textAlign: "center",
        marginTop: 20,
        color: "#777",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        width: "85%",
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#673AB7",
        marginBottom: 12,
        textAlign: "center",
    },
    modalBody: {
        alignItems: "center",
        width: "100%",
    },
    modalImage: {
        width: 180,
        height: 180,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: "#eee",
    },
    infoBlock: {
        alignItems: "flex-start",
        width: "100%",
    },
    modalText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 6,
        textAlign: "left",
    },
    highlight: {
        fontWeight: "bold",
        color: "#673AB7",
    },
});