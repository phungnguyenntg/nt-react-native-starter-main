import { Text, TouchableHighlight, View } from "react-native";
import { HomeStackParamList } from "./navigator/home-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;
const ProductDetailScreen = ({ navigation }: Props) => {
    return (
        <View>
            <TouchableHighlight onPress={() => navigation.navigate('Checkout')}>
                <Text>Go to Checkout</Text>
            </TouchableHighlight>
        </View>
    )
}

export default ProductDetailScreen;