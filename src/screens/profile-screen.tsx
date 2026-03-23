import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "./navigator/profile-stack";
import { Button, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/auth-context";
import { RootStackParamList } from "./navigator/root-navigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;
type RootNav = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
    const { user, login, logout } = useAuth();
    const rootNavigation = useNavigation<RootNav>();
    const profileNavigation = useNavigation<Props['navigation']>();

    return (
        <View>
            {user ? (
                <View>
                    <Text>Welcome, {user.name}!</Text>
                    <TouchableHighlight onPress={() => profileNavigation.navigate('Setting')}>
                        <Text>Go to Settings</Text>
                    </TouchableHighlight>
                    <Button title="Logout" onPress={logout} />
                </View>
            ) : (
                <View>
                    <Text>Please login to view profile</Text>
                    <TouchableOpacity onPress={() => rootNavigation.navigate('SignIn', { redirectTo: 'ProfileTab' })}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default ProfileScreen;