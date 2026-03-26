import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import CartLogo from "../../assets/icons/shopping-cart.svg";
import BellLogo from "../../assets/icons/bell.svg";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../stores/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigator/home-stack";

const HomeRightHeader: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCount = cartItems.length;
    const cartLabel = cartCount > 0 ? cartCount.toString() : "";

    const navigateToCheckout = () => {
        navigation.navigate("Checkout");
    };

    return (
        <View style={styles.containter}>
            <IconButton
                label=""
                onPress={() => console.log("Clicked Bell!")}
                icon={<BellLogo />}
            />
            <IconButton
                label={cartLabel}
                onPress={navigateToCheckout}
                icon={<CartLogo />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containter: {
        flexDirection: "row",
        gap: 8,
    },
});

export default HomeRightHeader;