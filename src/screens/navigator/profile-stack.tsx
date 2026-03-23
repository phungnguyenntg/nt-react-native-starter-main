import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../profile-screen';
import SettingScreen from '../setting-screen';

export type ProfileStackParamList = {
    Profile: undefined;
    Order: { hideBackButton?: boolean };
    Setting: undefined;
}

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
    return <Stack.Navigator>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Profile', headerShadowVisible: false }} />
        <Stack.Screen name='Setting' component={SettingScreen} options={{ title: 'Settings', headerShadowVisible: false }} />
    </Stack.Navigator>
}

export default ProfileStack;