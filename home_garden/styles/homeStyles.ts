import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../styles/colors";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 16,
    },

    // Encabezado
    headerContainer: {
        paddingHorizontal: 24,
        paddingTop: 50,
    },
    greeting: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.primary,
        position: "relative",
    },
    subtitle: {
        fontSize: 19,
        fontWeight: "bold",
        color: colors.primary,
        padding: 12,
    },
    date: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 20,
    },

    // Tarjetas de clima
    cardsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: "rgb(253, 253, 253)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.4)",
        marginHorizontal: 5,
        padding: 12,
        borderRadius: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 6,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text, // gris oscuro
        marginTop: 4,
    },

    // Sección de huertos
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 10,
    },
    placeholder: {
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 20,
    },
    gardenCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    gardenTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
        color: colors.primary,
    },
    gardenNote: {
        fontSize: 14,
        color: colors.accent,
        marginBottom: 12,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },

    // Boton flotante
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: colors.accent,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    footerImage: {
        width: width,
        height: 120,
        position: "absolute",
        bottom: 0,
    },
    headerImage: {
        width: "100%",
        height: 220,
        marginTop: 0,
        marginBottom: -20,
        zIndex: 10,
    },
});