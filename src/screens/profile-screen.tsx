import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "./navigator/profile-stack";
import { Button, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/auth-context";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

const ProfileScreen = () => {
    const { user, logout } = useAuth();
    const profileNavigation = useNavigation<Props['navigation']>();

    return (
        <View>
            <Text>Welcome, {user!.firstName}!</Text>
            <TouchableHighlight onPress={() => profileNavigation.navigate('Setting')}>
                <Text>Go to Settings</Text>
            </TouchableHighlight>
            <Button title="Logout" onPress={logout} />
        </View>
    )
}

export default ProfileScreen;