import { Text, TouchableHighlight, View } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "./navigator/main-tab";
import { CommonActions, useNavigation } from "@react-navigation/native";

type MainTabNavigation = BottomTabNavigationProp<MainTabParamList>;

const CheckoutScreen = () => {
    const navigation = useNavigation<MainTabNavigation>();
    return (
        <View>
            <TouchableHighlight onPress={() => {
                navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'OrderTab' }],
                }))
            }}>
                <Text>Purchase</Text>
            </TouchableHighlight>
        </View>
    )
}

export default CheckoutScreen;