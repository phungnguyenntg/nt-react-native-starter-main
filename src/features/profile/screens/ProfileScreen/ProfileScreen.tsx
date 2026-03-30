import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ProfileScreen.styles";
import BagIcon from "@/assets/icons/bag.svg";
import ChevronIcon from "@/assets/icons/chevron-forward.svg";
import LogoutIcon from "@/assets/icons/logout-red.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/features/auth/store/auth.selectors";
import { logoutThunk } from "@/features/auth/store/auth.thunks";

export const ProfileScreen = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    return (
        <View
            style={styles.container}
        >
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
            <TouchableOpacity style={styles.listItem}>
                <View style={styles.listIcon}>
                    <BagIcon />
                </View>
                <Text style={styles.listText}>Order History</Text>
                <ChevronIcon />
            </TouchableOpacity>

            <TouchableOpacity style={styles.listItem} onPress={() => dispatch(logoutThunk())}>
                <View style={[styles.listIcon, styles.logoutButton]}>
                    <LogoutIcon />
                </View>
                <Text style={[styles.listText, styles.logoutButtonText]}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}