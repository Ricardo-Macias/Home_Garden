import { StyleSheet } from "react-native";

const FormStyle = StyleSheet.create({
    // Comtenedor del formulario
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 60,
        alignItems: "center",
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
    inputContainer: {
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

  // Especificos de CreateUserForm
    signupButton: {
        backgroundColor: "#6A1B9A",
        borderRadius: 10,
        paddingVertical: 14,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    signupText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        padding: 10,
        zIndex: 10,
    },

    // Especificos de LoginForm
    image: {
        width: 140,
        height: 140,
        marginBottom: 20,
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
    footerText: {
        fontSize: 14,
        color: "#333",
    },
    signup: {
        fontSize: 14,
        color: "#6A1B9A",
        fontWeight: "bold",
    },
});

export default FormStyle;