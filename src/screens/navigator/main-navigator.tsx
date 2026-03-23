import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './home-stack';
import ProfileStack from './profile-stack';
import OrderStack from './order-stack';

const Tab = createBottomTabNavigator();
export type MainTabParamList = {
    HomeTab: undefined;
    OrderTab: undefined;
    ProfileTab: undefined;
}

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='HomeTab' screenOptions={{headerShown: false}}>
            <Tab.Screen name='HomeTab' component={HomeStack} listeners={({navigation}) => ({
                tabPress: e => {navigation.reset({index: 0, routes: [{name: 'HomeTab'}]})}
            })}/>
            <Tab.Screen name='OrderTab' component={OrderStack} />
            <Tab.Screen name='ProfileTab' component={ProfileStack} />
            </Tab.Navigator>
      </NavigationContainer>
    )
}

export default MainNavigator;