import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../order-screen";
import OrderDetailScreen from "../order-detail-screen";

export type OrderStackParamList = {
    Order: { hideBackButton: boolean };
    OrderDetail: { orderId: string };
}

const Stack = createNativeStackNavigator<OrderStackParamList>();

const OrderStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Order' component={OrderScreen} />
            <Stack.Screen name='OrderDetail' component={OrderDetailScreen} />
        </Stack.Navigator>
    )
}

export default OrderStack;