import { LogInScreen } from "@/features/auth/screens/LogInScreen";
import { selectUser } from '@/features/auth/store/auth.selectors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";
import { MainTab } from "./MainTabNavigator";
import { RootStackParamList } from "./types";
//import MainTab from '@/screens/navigator/main-tab';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    const user = useSelector(selectUser);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    <Stack.Screen name="LogIn" component={LogInScreen} />
                ) : (
                    <Stack.Screen name="MainTab" component={MainTab} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};