import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './home-stack';
import ProfileStack from './profile-stack';
import OrderStack from './order-stack';
import SavedProductStack from './saved-product-stack';

import HomeIcon from '../../assets/icons/home.svg';
import HomeActiveIcon from '../../assets/icons/home-active.svg';
import OrderIcon from '../../assets/icons/order.svg';
import OrderActiveIcon from '../../assets/icons/order-active.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import ProfileActiveIcon from '../../assets/icons/profile-active.svg';
import TabIcon from '../components/TabIcon';
import HeartIcon from '../../assets/icons/heart.svg';
import HeartActiveIcon from '../../assets/icons/heart-active.svg';

const Tab = createBottomTabNavigator<MainTabParamList>();
export type MainTabParamList = {
  HomeTab: undefined;
  SavedProductTab: undefined;
  OrderTab: undefined;
  ProfileTab: undefined;
};

const MainTab = () => {
    return (
        <Tab.Navigator initialRouteName='HomeTab' screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0DF2F2', tabBarInactiveTintColor: '#94A3B8', tabBarStyle: { height: 60, paddingBottom: 5 } }}>
            <Tab.Screen name='HomeTab' component={HomeStack} options={{tabBarLabel: 'Home', tabBarIcon: ({focused}) => <TabIcon focused={focused} ActiveIcon={HomeActiveIcon} InactiveIcon={HomeIcon} />}} />
            <Tab.Screen name='SavedProductTab' component={SavedProductStack} options={{tabBarLabel: 'Saved', tabBarIcon: ({focused}) => <TabIcon focused={focused} ActiveIcon={HeartActiveIcon} InactiveIcon={HeartIcon} />}} />
            <Tab.Screen name='OrderTab' component={OrderStack} options={{tabBarLabel: 'Orders', tabBarIcon: ({focused}) => <TabIcon focused={focused} ActiveIcon={OrderActiveIcon} InactiveIcon={OrderIcon} />}} />
            <Tab.Screen name='ProfileTab' component={ProfileStack} options={{tabBarLabel: 'Profile', tabBarIcon: ({focused}) => <TabIcon focused={focused} ActiveIcon={ProfileActiveIcon} InactiveIcon={ProfileIcon} />}} />
        </Tab.Navigator>
    )
}

export default MainTab;