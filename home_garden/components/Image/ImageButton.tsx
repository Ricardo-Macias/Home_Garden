import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Pressable, Text, TouchableOpacity } from "react-native";

type FontAwesomeIconName = 
    React.ComponentProps<typeof FontAwesome>["name"];

type Props = {
    color: string;
    label: string;
    icon: FontAwesomeIconName;
    theme?: "primary" | "camera" | "second";
    onPress: () => void;
};

export default function Button({ color, label, icon, theme, onPress}: Props){
    if (theme === "primary") {
        return (
            <View
                style={[
                    styles.buttonContainer,{borderWidth: 1, borderColor: "#6a1b9a", borderRadius: 10 }
                ]}
            >
                <Pressable
                    style= {[styles.button, {backgroundColor: "#fff"}]}
                    onPress={onPress}
                >
                    <FontAwesome
                    name={icon}
                    size={18}
                    color="#25292e"
                    />
                </Pressable>

            </View>
        );
    };

    if (theme === "second"){
        return (
            <View
                style = {[
                    styles.second, {borderWidth: 1, borderColor: "#6a1b9a", borderRadius: 5, backgroundColor: "#27ae60",}]}
            >
                <Pressable
                    style={styles.secondBotton}
                    onPress={onPress}
                >
                    <FontAwesome 
                    name={icon}
                    />
                </Pressable>

            </View>
        )
    }

    if (theme === "camera") {
        return (
            <TouchableOpacity onPress={onPress} style={styles.buttonCamera}>
                <FontAwesome 
                    name={icon}
                    size={28} 
                    color={color} />
                <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>
        )
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
    buttonCamera: {
        height: 40,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#f1f1f1",
        marginLeft: 10,
    },
    second: {
        position: "absolute",
        bottom: 10,
        right: 20,
        width: "15%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    secondBotton: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
})