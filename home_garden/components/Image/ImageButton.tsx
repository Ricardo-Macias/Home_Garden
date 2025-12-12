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
                    styles.buttonContainer,{borderWidth: 4, borderColor: "#6a1b9a", borderRadius: 10 }
                ]}
            >
                <Pressable
                    style= {[styles.button, {backgroundColor: "#fff"}]}
                    onPress={() => alert("You pressed a button.")}
                >
                    <FontAwesome
                    name="picture-o"
                    size={18}
                    color="#25292e"
                    style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonLabel}>{label}</Text>
                </Pressable>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "#000",
        fontSize: 16,
    },
})