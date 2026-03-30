import { COLORS } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        backgroundColor: '#F9FAFB',
    },
    avatarCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 0.5,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#E5E7EB',
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: -6,
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        padding: 6,
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        marginTop: 12,
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    username: {
        marginTop: 4,
        fontSize: 14,
        color: '#6B7280',
    },
    badge: {
        marginTop: 8,
        backgroundColor: '#0DF2F21A',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        fontWeight: '700',
        fontSize: 12,
        color: COLORS.primary,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 0.5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontWeight: '700',
        fontSize: 16,
        color: '#111827',
    },
    editDetailsText: {
        fontWeight: '600',
        fontSize: 14,
        color: COLORS.primary,
    },
    detailItem: {
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
        marginBottom: 4,
    },
    inputBoxValue: {
        color: '#6B7280'
    },
    detailValue: {
        fontSize: 14,
        color: '#0F172A',
        marginLeft: 8,
    },
    inputBox: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        elevation: 0.5,
    },
    listIcon: {
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        padding: 8,
        marginRight: 12,
    },
    listText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
    },
    logoutButton: {
        backgroundColor: '#FEE2E2'
    },
    logoutButtonText: {
        color: '#EF4444'
    },
});