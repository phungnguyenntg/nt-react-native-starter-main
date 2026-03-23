import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home-stack';
import ProfileStack from './profile-stack';
import OrderStack from './order-stack';

const Tab = createBottomTabNavigator<MainTabParamList>();
export type MainTabParamList = {
  HomeTab: undefined;
  OrderTab: undefined;
  ProfileTab: undefined;
};

const MainTab = () => {
    return (
        <Tab.Navigator initialRouteName='HomeTab' screenOptions={{ headerShown: false }}>
            <Tab.Screen name='HomeTab' component={HomeStack} />
            <Tab.Screen name='OrderTab' component={OrderStack} />
            <Tab.Screen name='ProfileTab' component={ProfileStack} />
        </Tab.Navigator>
    )
}

export default MainTab;