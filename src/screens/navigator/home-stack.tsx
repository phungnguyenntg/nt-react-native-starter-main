import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../home-screen';
import ProductDetailScreen from '../product-detail-screen';
import CheckoutScreen from '../checkout-screen';
import OrderScreen from '../order-screen';

export type HomeStackParamList = {
    Home: undefined;
    ProductDetail: { productId: string };
    Checkout: undefined;
    Order: { hideBackButton?: boolean };
}

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Discover', headerShadowVisible: false }} />
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen} options={{ title: 'Product Details', headerTitleAlign: 'center', headerShadowVisible: false}} />
            <Stack.Screen name='Checkout' component={CheckoutScreen} options={{ title: 'Checkout', headerShadowVisible: false }} />
        </Stack.Navigator>
    );
};

export default HomeStack;