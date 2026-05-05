import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default StyleSheet.create({
    list: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: "hidden",
        padding: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    huerto: {
        fontSize: 16,
        fontWeight: "700",
        color: "#7bb68a",
        marginBottom: 4,
    },
    cultivo: {
        fontSize: 14,
        color: "#2C3E50",
        marginBottom: 4,
    },
    fecha: {
        fontSize: 12,
        color: "#7F8C8D",
    },
})