import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Formato de fecha
const formatDate = ( dateString: string) => {
    const date = new Date (dateString);
    return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

export default function ComponentsHistory({ historial }: { historial: any[] }) {
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const handleSelect = (item: any) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <Text style={styles.title}>Historial de Huertos</Text>
            <Text style={styles.subtitle}>Huertos terminados: {historial.length}</Text>

            {/*Lista de historial*/}
            <FlatList
                data={historial}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.card} onPress={() => handleSelect({ ...item, numero: index + 1 })}>
                        <Text style={styles.cardTitle}>{item.nombreHuerto}</Text>
                        <Text>Cultivo: {item.cultivo}</Text>
                        <Text>Inicio: {formatDate(item.fechaInicio)}</Text>
                        <Text>Fin: {formatDate(item.fechaFin)}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>No hay historial de huertos</Text>
                }
            />

            {/* Modal de detalles */}
            <Modal visible={!!selectedItem} transparent={true} animationType="slide" onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Header del modal */}
                        <View style={styles.modalTitle}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                Huerto: {selectedItem?.numero}
                            </Text>

                            <TouchableOpacity
                                onPress={closeModal}
                                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color="#6A1B9A" />
                            </TouchableOpacity>
                        </View>

                        {/* Cuerpo del modal */}
                        {selectedItem && (
                            <>
                                <Text>Cultivo: {selectedItem.cultivo}</Text>
                                <Text>Tipo: {selectedItem.tipo || "No especificado"}</Text>
                                <Text>Dificultad: {selectedItem.dificultad || "No especificada"}</Text>
                                <Text>Fecha de inicio: {formatDate(selectedItem.fechaInicio)}</Text>
                                <Text>Fecha de fin: {formatDate(selectedItem.fechaFin)}</Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: "#E6E6FA",
        padding: 12,
        borderRadius:8,
        marginBottom: 18,
        width: "95%",
        alignSelf: "center",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    empty: {
        textAlign: "center",
        marginTop: 20,
        color: "#777",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        position: "relative",
    },
    modalTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        textAlign: "center",
    },
    closeButton: {
        alignItems: "center",
        justifyContent: "center",
        marginBlock: 8,
    },
    closeText: {
        color: "#fff",
        fontWeight: "bold",
    },
});