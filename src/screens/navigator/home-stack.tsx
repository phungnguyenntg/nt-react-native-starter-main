import { TextStyle } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../home-screen';
import ProductDetailScreen from '../product-detail-screen';
import CheckoutScreen from '../checkout-screen';
import HomeRightHeader from '../components/HomeRightHeader';
import { headerTitleStyle } from '../styles/headerTitleStyle';

export type HomeStackParamList = {
    Home: undefined;
    ProductDetail: { productId: number };
    Checkout: undefined;
    Order: { hideBackButton?: boolean };
}

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Discover', headerTitleStyle: headerTitleStyle, headerShadowVisible: false, headerRight: () => <HomeRightHeader />}} />
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen} options={{ title: 'Product Details', headerTitleStyle: headerTitleStyle, headerTitleAlign: 'center', headerShadowVisible: false}} />
            <Stack.Screen name='Checkout' component={CheckoutScreen} options={{ title: 'Checkout', headerTitleStyle: headerTitleStyle, headerShadowVisible: false }} />
        </Stack.Navigator>
    );
};

export default HomeStack;