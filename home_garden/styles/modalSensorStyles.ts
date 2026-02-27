import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    // Modal Sensor
    modalContentSensor: {
        height: "40%", 
        width: "100%",
        backgroundColor: colors.background,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
        overflow: "hidden",
    },

    // Modal Connect Wifi
    modalContentWifi: {
        height: "65%",
        width: "100%",
        backgroundColor: colors.background,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
        overflow: "hidden",
    },

    // Encabezado 
    titleContainer: {
        height: 55,
        backgroundColor: colors.primary,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    // Lista de sensores
    sensorsContainer: {
        maxHeight: 170,
        flex: 1,
        padding: 16,
    },
    sensorsItem: {
        marginBottom: 12,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: colors.cardBackground,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sensorButton: {
        width: "100%",
        height: 50,
        backgroundColor: colors.accent,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    sensorItemText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },

    // Formulario WiFi
    formContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        alignItems: "center",
        paddingTop: 20,
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
    textInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: colors.accent,
        borderRadius: 10,
        paddingVertical: 14,
        width: "100%",
        alignItems: "center",
        marginTop: 30,
    },
    textButton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        color: "#333",
        marginBottom: 15,
        alignSelf: "flex-start",
    },
    icon: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    iconColor: {
        color: colors.accent,
    },

    // Imagen 
    footerImage: {
        width: width,
        height: 170,
    },
});