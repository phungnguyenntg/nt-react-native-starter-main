import { COLORS, SPACING } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: SPACING.large
    },
    inputLabel: {
        marginBottom: SPACING.small,
        color: '#374151',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingLeft: 12,
        color: '#6B7280',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
    },
    forgotPassword: {
        color: COLORS.primary,
        fontWeight: 500
    },
    biometricLabel: {
        color: '#4B5563',
        fontWeight: 400,
    },
    errorText: {
        color: 'red'
    },
    signInButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        elevation: 2
    },
    signInButtonText: {
        color: '#111827',
        fontWeight: 700,
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 12,
    },
    biometricSignInButton: {
        borderWidth: 2,
        borderColor: '#0DF2F24D',
        borderRadius: 12,
    },
    biometricButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    biometricSignInButtonText: {
        color: '#0DF2F2',
        fontWeight: 700,
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 12,
    },
});