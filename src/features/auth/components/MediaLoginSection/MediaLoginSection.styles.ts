import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#6B7280',
    },
    mediaButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16
    },
    label: {
        color: '#374151',
        fontWeight: 500
    }
});