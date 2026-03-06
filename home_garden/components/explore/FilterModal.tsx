import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface Filters {
    difficulty: string[];
    type: string[];
    duration: string[];
}

interface Props {
    visible: boolean;
    onClose: () => void;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const difficulties = ["facil", "media", "dificil"];
const types = ["tuberculo", "fruto", "hojas", "bulbo"];
const durations = ["20-40", "40-60", "60-80", "80-100", "100+"];

export default function FilterModal({
    visible,
    onClose,
    filters,
    setFilters,
}: Props) {

    const toggleValue = (category: keyof Filters, value: string) => {
        const current = filters[category];

        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];

        setFilters({ ...filters, [category]: updated });
    };

    const clearFilters = () => {
        setFilters({
            difficulty: [],
            type: [],
            duration: [],
        });
    };

    const renderOption = (category: keyof Filters, value: string) => {
        const selected = filters[category].includes(value);

        return (
            <TouchableOpacity
                key={value}
                onPress={() => toggleValue(category, value)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                }}
            >
                <Ionicons
                    name={selected ? "checkbox" : "square-outline"}
                    size={22}
                    color={selected ? "#16a34a" : "#6b7280"}
                />
                <Text style={{ marginLeft: 10 }}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    justifyContent: "flex-end",
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        padding: 20,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        maxHeight: "85%",
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 15,
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Agregar filtro
                        </Text>

                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={26} color="#374151" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView>

                        {/* Dificultad */}
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
                            Dificultad
                        </Text>
                        {difficulties.map((item) =>
                            renderOption("difficulty", item)
                        )}

                        {/* Tipo */}
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15 }}>
                            Tipo
                        </Text>
                        {types.map((item) =>
                            renderOption("type", item)
                        )}

                        {/* Duracion */}
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15 }}>
                            Duración (días)
                        </Text>
                        {durations.map((item) =>
                            renderOption("duration", item)
                        )}

                    </ScrollView>

                    {/* Botones */}
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <TouchableOpacity
                            onPress={clearFilters}
                            style={{
                                flex: 1,
                                padding: 12,
                                backgroundColor: "#e5e7eb",
                                borderRadius: 10,
                                marginRight: 5,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ fontWeight: "500" }}>Limpiar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onClose}
                            style={{
                                flex: 1,
                                padding: 12,
                                backgroundColor: "#16a34a",
                                borderRadius: 10,
                                marginLeft: 5,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "bold" }}>
                                Aplicar
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}
