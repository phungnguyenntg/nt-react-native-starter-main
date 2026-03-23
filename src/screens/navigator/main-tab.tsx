import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home-stack';
import ProfileStack from './profile-stack';
import OrderStack from './order-stack';
import { MainTabParamList } from './root-navigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

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