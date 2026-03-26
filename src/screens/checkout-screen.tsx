import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { Text, TouchableHighlight, View, Button, StyleSheet } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "./navigator/main-tab";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { clearCart } from '../slices/cart-slide';
import { AppDispatch } from '../stores/store';

type MainTabNavigation = BottomTabNavigationProp<MainTabParamList>;

const CheckoutScreen = () => {
    const navigation = useNavigation<MainTabNavigation>();
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.cart.items);
    return (
        <View style={styles.container}>
            <View>
                {items.map(item => (
                    <Text key={item.id}>{item.name} x {item.quantity}</Text>
                ))}
            </View>
            {items.length > 0 ? (
                <>
                    <TouchableHighlight style={styles.purchaseButton} onPress={() => {
                        navigation.dispatch(CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'OrderTab' }],
                        }))
                    }}>
                        <Text style={styles.purchaseText}>Confirm Purchase</Text>
                    </TouchableHighlight>
                    <Button
                        title="Clear All"
                        color="red"
                        onPress={() => dispatch(clearCart())}
                    />
                </>
            ) : (
                <Text>Empty Cart</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16
    },
    purchaseButton: {
        backgroundColor: '#EC5B13',
        borderRadius: 16,
    },
    purchaseText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 700,
        padding: 16,
        textAlign: 'center'
    }
})

export default CheckoutScreen;