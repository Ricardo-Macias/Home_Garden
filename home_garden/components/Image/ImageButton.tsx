import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, Pressable, Text } from "react-native";

type Props = {
    label: string;
    theme?: "primary";
};

export default function Button({ label, theme}: Props){
    if (theme === "primary") {
        return (
            <View
                style={[
                    styles.buttonContainer,{borderWidth: 1, borderColor: "#6a1b9a", borderRadius: 5 }
                ]}
            >
                <Pressable
                    style= {[styles.button, {backgroundColor: "#fff"}]}
                    onPress={() => alert("You pressed a button.")}
                >
                    <FontAwesome
                    name="camera"
                    size={18}
                    color="#25292e"
                    />
                    <Text style={styles.buttonLabel}>{label}</Text>
                </Pressable>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        bottom: 5,
        right: 0,
        width: "15%",
        height: "15%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonLabel: {
        color: "#000",
        fontSize: 16,
    },
})