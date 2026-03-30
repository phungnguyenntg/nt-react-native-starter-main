import { ProductDetailScreen } from "@/features/product/screens/ProductDetailScreen/ProductDetailScreen";
import { WishListScreen } from "@/features/wishList/screens/WishListScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WishListStackParamList } from "../types";

const Stack = createNativeStackNavigator<WishListStackParamList>();

export const WishListStack = () => {
    return (
        <Stack.Navigator initialRouteName='WishList'>
            <Stack.Screen name='WishList' component={WishListScreen} options={{ title: 'Wish List'}} />
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen} options={{ title: 'Product Details' }} />
        </Stack.Navigator>
    );
};