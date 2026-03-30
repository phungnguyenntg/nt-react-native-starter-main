import HeartIcon from "@/assets/icons/heart-grey.svg";
import HeartActiveIcon from "@/assets/icons/heart.svg";
import HomeActiveIcon from "@/assets/icons/home-active.svg";
import HomeIcon from "@/assets/icons/home.svg";
import ProfileActiveIcon from "@/assets/icons/profile-active.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabIcon from "./components/BottomTabIcon/BottomTabIcon";
import { bottomTabOptions } from "./configs";
import { HomeStack } from "./stacks/HomeStackNavigator";
import { ProfileStack } from "./stacks/ProfileStackNavigator";
import { WishListStack } from "./stacks/WishListStackNavigator";
import { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTab = () => {
    return (
        <Tab.Navigator initialRouteName='HomeTab' screenOptions={bottomTabOptions}>
            <Tab.Screen name='HomeTab' component={HomeStack} options={{tabBarLabel: 'Home', tabBarIcon: ({focused}) => <BottomTabIcon focused={focused} ActiveIcon={HomeActiveIcon} InactiveIcon={HomeIcon} />}} />
            <Tab.Screen name='WishListTab' component={WishListStack} options={{tabBarLabel: 'Saved', tabBarIcon: ({focused}) => <BottomTabIcon focused={focused} ActiveIcon={HeartActiveIcon} InactiveIcon={HeartIcon} />}} />
            <Tab.Screen name='ProfileTab' component={ProfileStack} options={{tabBarLabel: 'Profile', tabBarIcon: ({focused}) => <BottomTabIcon focused={focused} ActiveIcon={ProfileActiveIcon} InactiveIcon={ProfileIcon} />}} />
        </Tab.Navigator>
    )
}