import { StyleSheet, Dimensions } from "react-native";
import { colors } from "./colors";

const { width } = Dimensions.get("window");

const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },

    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: colors.secundary,
        textAlign: "center",
    },

    placeholder: {
        fontSize: 16,
        color: "#7f8c8d",
        textAlign: "center",
        marginTop: 20,
    },

    // Widget de clima
    weatherWidget: {
        marginTop: 20,
        alignSelf: "center",
        width: "90%",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
    },

    weatherImage: {
        width: "100%",
        height: 180,
        justifyContent: "center",
    },

    weatherOverlay: {
        padding: 16,
        borderRadius: 16,
    },

    weatherTemp: {
        fontSize: 32,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },

    weatherDesc: {
        fontSize: 18,
        color: "#fff",
        marginTop: 6,
        textAlign: "center",
    },

    weatherHumidity: {
        fontSize: 14,
        color: "#fff",
        marginTop: 4,
        textAlign: "center",
    },


    // Botón flotante
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#27ae60",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    weatherContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
    },

    weatherLeft: {
        flexDirection: "column",
        alignItems: "flex-start",
    },

    weatherRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    weatherIcon: {
        marginRight: 8,
    },


    weatherRight: {
        alignItems: "flex-end",
    },

    weatherTime: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
    },

    weatherDate: {
        fontSize: 14,
        color: "#fff",
        marginTop: 4,
    },
    footerImage: {
        width: width,
        height: 170,
        position: "absolute",
        top: 600,
    },
});

export default homeStyle;