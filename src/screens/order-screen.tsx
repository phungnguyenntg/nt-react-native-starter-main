import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableHighlight, View } from "react-native";
import { OrderStackParamList } from "./navigator/order-stack";

type Props = NativeStackScreenProps<OrderStackParamList, 'Order'>;

const OrderScreen = ({ navigation }: Props) => {
    return (
        <View>
            <TouchableHighlight onPress={() => navigation.navigate('OrderDetail', { orderId: '123' })}>
                <Text>Go to Order Detail</Text>
            </TouchableHighlight>
        </View>
    )
}

export default OrderScreen;