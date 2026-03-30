import { COLORS } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        flex: 1
    },
    content: {
        flexDirection: 'column',
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: 'white',
        padding: 32,
        gap: 32
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#0DF2F21A'
    },
    headerContainer: {
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937'
    },
    enterDetailsText: {
        color: '#6B7280',
        fontSize: 16
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 4,
        fontWeight: '500',
    },
    tabButton: {
        fontSize: 14,
        fontWeight: '500',
        paddingHorizontal: 16
    },
    activeTabButton: {
        backgroundColor: 'white',
        borderRadius: 12,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        marginVertical: 8,
        marginHorizontal: 40,
        color: '#6B7280'
    },
    activeTabText: {
        color: '#1F2937'
    },
    termAndPolicyText: {
        alignContent: 'center',
        marginTop: 24,
        alignItems: 'center',
    },
    termAndPolicyLink: {
        color: COLORS.primary,
        fontWeight: '500'
    },
});