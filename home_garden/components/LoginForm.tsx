import React, { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context"; // Respetar el area del telefono
import FormStyle from "../styles/FormStyle";
import MessageBox from "./MessageBox";

interface LoginFormProps {
    email: string;
    pass: string;
    onEmailChange: (text: string) => void;
    onPassChange: (text: string) => void;
    onSubmit: () => void;
    loading?: boolean;
    onSignupPress: () => void;
    message?: string | null;
    messageType?: "error" | "success" | "info"; 
    onCloseMessage?: () => void; 
}

export default function LoginForm({
    email,
    pass,
    onEmailChange,
    onPassChange,
    onSubmit,
    loading = false,
    onSignupPress,
    message,
    messageType = "info",
    onCloseMessage,
}: LoginFormProps) {
    const [showPass, setShowPass] = useState(false);

    return (
    
    <SafeAreaView style={FormStyle.container}>
        <Image
            source={require("../assets/images/Mora.png")}
            style={FormStyle.image}
            resizeMode="contain"
        />
        <Text style={FormStyle.title}>Home Garden</Text>
        <Text style={FormStyle.subtitle}>Account Login</Text>

        <View style={FormStyle.inputContainer}>
            <MaterialIcons name="email" size={20} color="#6A1B9A" style={FormStyle.icon}/>
            <TextInput
                style={FormStyle.input}
                placeholder="Ricardo@gmail.com"
                value={email}
                onChangeText={onEmailChange}
                keyboardType="email-address"
                placeholderTextColor="#999"
            />
        </View>

        <View style={FormStyle.inputContainer}>
            <FontAwesome name="lock" size={20} color="#6A1B9A" style={FormStyle.icon}/>
            <TextInput
                style={FormStyle.input}
                placeholder="••••••••"
                value={pass}
                onChangeText={onPassChange}
                secureTextEntry={!showPass}
                placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <MaterialIcons
                    name={showPass ? "visibility" : "visibility-off"} 
                    size={20}
                    color="#999"
                    style={FormStyle.iconRight}
                />
            </TouchableOpacity>
        </View>

        {message && (
            <MessageBox
                type={messageType}
                message={message}
                onClose={onCloseMessage}
            />
        )}

        <TouchableOpacity style={FormStyle.loginButton} onPress={onSubmit} disabled={loading}>
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={FormStyle.loginText}>Login</Text>
            )}
        </TouchableOpacity>

        <TouchableOpacity style={FormStyle.googleButton}>
            <FontAwesome name="google" size={20} color="#fff" style={FormStyle.icon}/>
            <Text style={FormStyle.googleText}>Sign in with Google</Text>
        </TouchableOpacity>


        <View style={FormStyle.footer}>
            <Text style={FormStyle.footerText}>
                No tines una cuenta aun?{" "}
                <Text style={FormStyle.signup} onPress={onSignupPress}>Registrate</Text>
            </Text>
        </View>

    </SafeAreaView>
  );
}
