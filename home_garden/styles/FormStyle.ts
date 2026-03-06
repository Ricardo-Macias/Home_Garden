import { StyleSheet } from "react-native";
import { colors } from "./colors";

const FormStyle = StyleSheet.create({
    // Comtenedor del formulario
    container: {
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 200, 
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

    // Estilos de agregar sensor
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    customHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.text,
        marginLeft: 12,
    },
    content: {
        flex: 1,
    },
    ImageContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 6,
    },
    InputContainer: {
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 14,
        paddingHorizontal: 14,
        marginBottom: 18,
        backgroundColor: colors.cardBackground,
        height: 52,
        justifyContent: "center",
        elevation: 2,
    },
    TextInput: {
        fontSize: 16,
        color: colors.text,
    },
    DropDownWrapper: {
        marginBottom: 20,
        zIndex: 1000,
    },
    dropdown: {
        borderColor: "#E8E8E8",
        borderRadius: 14,
        backgroundColor: colors.cardBackground,
        elevation: 2,
    },
    dropdownContainer: {
        borderColor: "#E8E8E8",
        borderRadius: 14,
    },
    Button: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 30,
        elevation: 6,
    },
    textButton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
    footerImage: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 180,
    },
});

export default FormStyle;