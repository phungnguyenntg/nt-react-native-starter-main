import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from './main-tab';
import SignInScreen from '../signin-screen';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  MainTab: {screen?: keyof MainTabParamList };
  SignIn: { redirectTo?: keyof MainTabParamList };
};

export type MainTabParamList = {
  HomeTab: undefined;
  OrderTab: undefined;
  ProfileTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTab" component={MainTab} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default RootNavigator;