import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    value: string;
    onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#e6f4ea",
                paddingHorizontal: 12,
                borderRadius: 14,
                marginBottom: 12,
            }}
        >
            <Ionicons name="search" size={20} color="#166534" />

            <TextInput
                placeholder="Buscar cultivo..."
                value={value}
                onChangeText={onChange}
                style={{
                    flex: 1,
                    paddingVertical: 10,
                    marginLeft: 8,
                }}
            />
        </View>
    );
}
