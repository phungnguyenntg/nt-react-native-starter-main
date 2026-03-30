import { HomeStackParamList } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductListScreen } from "@/features/product/screens/ProductListScreen";
import { ProductDetailScreen } from "@/features/product/screens/ProductDetailScreen";
import { CartScreen } from "@/features/cart/screens/CartScreen";
import { HomeRightHeader } from "../components/HomeRightHeader";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='ProductList'>
            <Stack.Screen name='ProductList' component={ProductListScreen} options={{ title: 'Discover', headerRight: () => <HomeRightHeader /> }} />
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen} options={{ title: 'Product Details'}} />
            <Stack.Screen name='Cart' component={CartScreen} options={{ title: 'Your Cart'}} />
        </Stack.Navigator>
    );
};