import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../styles/colors";

const { width } = Dimensions.get("window");

const GardenDetailStyle = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F2F6F4",
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    heroContainer: {
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 20,
    },
    heroImage: {
        width: width - 40,
        height: 220,
        borderRadius: 20,
    },
    cultivo: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.secundary,
        marginBottom: 15,
        textAlign: "center",
    },
    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    card: {
        width: (width - 50) / 2,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
        alignItems: "center",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        textAlign: "center",
    },
    cardTitle: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        textAlign: "center",
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
    },
    cardRange: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
        textAlign: "center",
    },
    section: {
        marginTop: 5,
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginBottom: 18,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    fecha: {
        marginLeft: 10,
        fontSize: 14,
        color: "#555",
        marginBottom: 0,
    },
    statusImage: {
        width: "100%",
        height: 180,
        resizeMode: "contain",
        marginTop: 20,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    dateIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E8F5E9",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    dateIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        marginRight: 10,
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#27ae60",
        marginBottom: 8,
        textAlign: "center",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
    },

});
export default GardenDetailStyle;