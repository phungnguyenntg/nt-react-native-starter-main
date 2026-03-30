import { COLORS } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorWrapper: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
    },
});