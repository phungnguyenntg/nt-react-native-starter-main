import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "./navigator/profile-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/auth-context";
import { useNavigation } from "@react-navigation/native";
import PencilIcon from '../assets/icons/pencil.svg';
import BagIcon from '../assets/icons/bag.svg';
import ChevronIcon from '../assets/icons/chevron-forward.svg';
import LogoutIcon from '../assets/icons/logout-red.svg';
import { COLORS } from "./theme/color";

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

const ProfileScreen = () => {
    const { user, logout } = useAuth();
    const profileNavigation = useNavigation<Props['navigation']>();

    return (
        <View
            style={styles.container}
        >
            {/* Avatar + Edit button */}
            <View style={styles.avatarCard}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.editAvatarBtn}>
                        <PencilIcon />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{user!.firstName} {user!.lastName}</Text>
                <Text style={styles.username}>@{user!.username}</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>PREMIUM MEMBER</Text>
                </View>
            </View>

            {/* Account Details Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Account Details</Text>
                    <TouchableOpacity>
                        <Text style={styles.editDetailsText}>Edit Details</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>EMAIL ADDRESS</Text>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputBoxValue}>{user!.email}</Text>
                    </View>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>FIRST NAME</Text>
                    <Text style={styles.detailValue}>{user!.firstName}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>LAST NAME</Text>
                    <Text style={styles.detailValue}>{user!.lastName}</Text>
                </View>

                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>AGE</Text>
                    <Text style={styles.detailValue}>{user!.age}</Text>
                </View>
            </View>

            {/* List items */}
            <TouchableOpacity style={styles.listItem} onPress={() => profileNavigation}>
                <View style={styles.listIcon}>
                    <BagIcon />
                </View>
                <Text style={styles.listText}>Order History</Text>
                <ChevronIcon />
            </TouchableOpacity>

            <TouchableOpacity style={styles.listItem} onPress={logout}>
                <View style={[styles.listIcon, styles.logoutButton]}>
                    <LogoutIcon />
                </View>
                <Text style={[styles.listText, styles.logoutButtonText]}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default ProfileScreen;