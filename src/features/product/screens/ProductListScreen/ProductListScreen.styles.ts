import { COLORS } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#fff' },
    row: { justifyContent: "space-between", marginBottom: 16, elevation: 0.5 },
    searchBox: {
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 8,
        color: COLORS.textSecondary,
    },
    filterRow: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 8,
    },
    filterBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        marginRight: 10,
    },
    filterBtnActive: {
        backgroundColor: COLORS.primary,
    },
    filterText: {
        color: COLORS.textSecondary,
    },
    filterTextActive: {
        color: COLORS.textPrimary,
        fontWeight: "bold",
    },
});