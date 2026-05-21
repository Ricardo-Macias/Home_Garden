import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    value: string;
    onChange: (text: string) => void;
    onFilterPress?: () => void;
}

export default function SearchBar({ value, onChange }: Props) {

    return (
        <View style={styles.container}>

            <View style={styles.searchBox}>

                <Ionicons name="search" size={20} color="#166534" />

                <TextInput
                    placeholder="Buscar cultivo..."
                    placeholderTextColor="#6b7280"
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },

    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e6f4ea",
        paddingHorizontal: 12,
        borderRadius: 14,
        height: 44,
    },

    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: "#111827",
    },

    filterButtonWrapper: {
        width: 44,
        height: 44,
        backgroundColor: "#e6f4ea",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
});