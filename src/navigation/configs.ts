import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { TextStyle, ViewStyle } from "react-native";

const tabBarStyle: ViewStyle = {
    height: 60,
    paddingBottom: 5,
};

export const tabBarLabelStyle: TextStyle = {
    fontSize: 10,
    fontWeight: '500',
};

export const bottomTabOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#0DF2F2',
    tabBarInactiveTintColor: '#94A3B8',
    tabBarStyle: tabBarStyle,
    tabBarLabelStyle: tabBarLabelStyle,
}