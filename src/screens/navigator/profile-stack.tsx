import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../profile-screen';
import SettingScreen from '../setting-screen';
import { TouchableOpacity } from 'react-native';
import SettingIcon from '../../assets/icons/setting.svg';

export type ProfileStackParamList = {
    Profile: undefined;
    Order: { hideBackButton?: boolean };
    Setting: undefined;
}

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
    return <Stack.Navigator>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Profile Settings', headerShadowVisible: true, headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => console.log("setting icon pressed!")}>
            <SettingIcon width={24} height={24} />
        </TouchableOpacity>) }} />
        <Stack.Screen name='Setting' component={SettingScreen} options={{ title: 'Settings', headerShadowVisible: false }} />
    </Stack.Navigator>
}

export default ProfileStack;