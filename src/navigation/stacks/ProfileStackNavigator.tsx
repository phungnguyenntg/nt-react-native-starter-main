import { ProfileStackParamList } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingScreen } from "@/features/profile/screens/SettingScreen";
import { ProfileScreen } from "@/features/profile/screens/ProfileScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName='Profile'>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Profile'}} />
            <Stack.Screen name='Setting' component={SettingScreen} options={{ title: 'Setting'}} />
        </Stack.Navigator>
    );
};