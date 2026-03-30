import { selectCartCount } from "@/features/cart/store/cart.selectors";
import { HomeStackParamList } from "@/navigation/types";
import { useAppSelector } from "@/store/hooks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./HomeRightHeader.styles";
import { View } from "react-native";
import { IconButton } from "@/shared/components/IconButton/IconButton";
import CartLogo from "@/assets/icons/shopping-cart.svg";
import BellLogo from "@/assets/icons/bell.svg";


export const HomeRightHeader: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const cartCount = useAppSelector(selectCartCount);
    const cartLabel = cartCount > 0 ? cartCount.toString() : "";

    const navigateToCart = () => {
        navigation.navigate("Cart");
    };

    return (
        <View style={styles.container}>
            <IconButton
                label=""
                onPress={() => console.log("Clicked Bell!")}
                icon={<BellLogo />}
            />
            <IconButton
                label={cartLabel}
                onPress={navigateToCart}
                icon={<CartLogo />}
            />
        </View>
    );
};