import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedProductScreen from "../saved-product-screen";
import ProductDetailScreen from "../product-detail-screen";

export type SavedProductStackParamList = {
    SavedProduct: { hideBackButton: boolean };
    ProductDetail: { productId: number };
}

const Stack = createNativeStackNavigator<SavedProductStackParamList>();

const SavedProductStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SavedProduct' component={SavedProductScreen} />
            <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
        </Stack.Navigator>
    )
}

export default SavedProductStack;