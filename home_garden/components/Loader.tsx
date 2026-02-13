import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 

export default function PlantLoader() {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.container}>
            {/* Ícono central de planta */}
            <FontAwesome name="pagelines" size={60} color="#4CAF50" />

            {/* Anillo giratorio */}
            <Animated.View style={[styles.ring, { transform: [{ rotate: spin }] }]}>
                <View style={styles.halfRing} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
    },
    ring: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 6,
        borderColor: "#A5D6A7", // verde claro
        borderTopColor: "#388E3C", // verde más oscuro para efecto de carga
    },
    halfRing: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});