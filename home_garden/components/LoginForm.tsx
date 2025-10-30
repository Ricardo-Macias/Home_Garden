import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

interface LoginFormProps {
    email: string;
    pass: string;
    onEmailChange: (text: string) => void;
    onPassChange: (text: string) => void;
    onSubmit: () => void;
    loading?: boolean;
}

export default function LoginForm({
    email,
    pass,
    onEmailChange,
    onPassChange,
    onSubmit,
    loading = false,
}: LoginFormProps) {
    return (
    <View style={styles.container}>
        <Image
            source={require("../assets/images/Mora.png")}
            style={styles.image}
            resizeMode="contain"
        />
        <Text style={styles.title}>Home Garden</Text>
        <Text style={styles.subtitle}>Account Login</Text>

        <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#6A1B9A" style={styles.icon}/>
            <TextInput
                style={styles.input}
                placeholder="Ricardo@gmail.com"
                value={email}
                onChangeText={onEmailChange}
                keyboardType="email-address"
                placeholderTextColor="#999"
            />
        </View>

        <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#6A1B9A" style={styles.icon}/>
            <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={pass}
                onChangeText={onPassChange}
                secureTextEntry
                placeholderTextColor="#999"
            />
            <MaterialIcons name="visibility-off" size={20} color="#999" style={styles.iconRight}/>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onSubmit} disabled={loading}>
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.loginText}>Login</Text>
            )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
            <FontAwesome name="google" size={20} color="#fff" style={styles.icon}/>
            <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
            Don't have an account already? <Text style={styles.signup}>Signup</Text>
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 60,
        alignItems: "center",
    },
    image: {
        width: 140,
        height: 140,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#6A1B9A",
    },
    subtitle: {
        fontSize: 16,
        color: "#333",
        marginBottom: 30,
    },
    inputContainer:{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
        width: "100%",
        backgroundColor: "#f9f9f9",
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: "#333",
    },
    icon: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    loginButton: {
        backgroundColor: "#6A1B9A",
        borderRadius: 10,
        paddingVertical: 14,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    googleButton: {
        backgroundColor: "#00913f",
        borderRadius: 10,
        paddingVertical: 14,
        width: "100%",
        alignItems: "center",
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
    },
    googleText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    footer: {
        marginTop: 20,
        fontSize: 14,
        color: "#333",
    },
    signup: {
        color: "#6A1B9A",
        fontWeight: "bold",
    },
});