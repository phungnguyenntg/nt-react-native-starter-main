import { Text, View } from "react-native"
import { selectCartItems } from "../store/cart.selectors"
import { TouchableHighlight, Button } from "react-native";
import { styles } from "./CartScreen.style";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "../store/cart.slice";
export const CartScreen = () => {
    const cartItems = useAppSelector(selectCartItems);
    const dispatch = useAppDispatch();
    return (
        <View style={styles.container}>
                    <View>
                        {cartItems.map(item => (
                            <Text key={item.id}>{item.name} x {item.quantity}</Text>
                        ))}
                    </View>
                    {cartItems.length > 0 ? (
                        <>
                            <TouchableHighlight style={styles.purchaseButton}>
                                <Text style={styles.purchaseText}>Go to Purchase</Text>
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