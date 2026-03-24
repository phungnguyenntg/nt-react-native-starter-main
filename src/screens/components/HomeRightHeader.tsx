import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import CartLogo from "../../assets/icons/shopping-cart.svg"
import BellLogo from "../../assets/icons/bell.svg"
import React from "react";

const HomeRightHeader: React.FC<{}> = ({}) => {
    return (
        <View style={styles.containter}>
            <IconButton label="" onPress={() => console.log('Clicked!')} icon={<BellLogo />} />
            <IconButton label="" onPress={() => console.log('Clicked!')} icon={<CartLogo />} />
        </View>
    )
};

const styles = StyleSheet.create({
    containter: {
        flexDirection: 'row',
        gap: 8
    }
})

export default HomeRightHeader;