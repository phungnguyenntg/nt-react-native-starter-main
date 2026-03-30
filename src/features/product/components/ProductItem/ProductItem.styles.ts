import { COLORS } from "@/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

export const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        backgroundColor: "#fefefe",
        borderRadius: 16,
        padding: 12,
        position: "relative",
    },
    image: {
        width: "100%",
        height: cardWidth,
        borderRadius: 12,
        marginBottom: 8
    },
    heartIcon: {
        position: "absolute",
        top: 30,
        right: 30,
        zIndex: 2,
        backgroundColor:
            COLORS.background,
        borderRadius: 12,
        padding: 4
    },
    name: {
        fontWeight: "600",
        fontSize: 14,
        marginBottom: 2
    },
    category: {
        fontSize: 12,
        color: "#666",
        marginBottom: 8
    },
    priceRow: {
        flexDirection:
            "row",
        justifyContent:
            "space-between",
        alignItems: "center"
    },
    price: {
        fontWeight: "700",
        fontSize: 16
    },
    addButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center"
    },
    addButtonText: {
        color: "#000",
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 20
    }
});