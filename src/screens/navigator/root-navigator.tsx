import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from './main-tab';
import SignInScreen from '../signin-screen';
import { useAuth } from '../../contexts/auth-context';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  SignIn: undefined;
  MainTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                ) : (
                    <Stack.Screen name="MainTab" component={MainTab} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;