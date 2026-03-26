import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableHighlight, View, Dimensions } from "react-native";
import { HomeStackParamList } from "./navigator/home-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import { getProductDetail } from "../slices/product/product.thunk";
import { COLORS } from "./theme/color";

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;
const ProductDetailScreen = ({ route, navigation }: Props) => {
    const { productId } = route.params;

    const dispatch = useDispatch<AppDispatch>();
    const { productDetail, loadingDetail } = useSelector(
        (state: RootState) => state.product
    );

    useEffect(() => {
        dispatch(getProductDetail(productId));
    }, [productId]);

    if (loadingDetail) {
        return <ActivityIndicator size="large" />;
    }

    if (!productDetail) {
        return <Text>No product found</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: productDetail.image }} style={styles.image} />
            <View style={styles.content}>
                <View>
                    <Text style={styles.newArrivalText}>NEW ARRIVAL</Text>
                    <Text style={styles.productName}>{productDetail.name}</Text>
                    <Text style={styles.price}>${productDetail.price}</Text>
                </View>
                <TouchableHighlight onPress={() => navigation.navigate('Checkout')}>
                    <Text>Go to Checkout</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    image: {
        width: screenWidth,
        height: screenWidth
    },
    container: {
        backgroundColor: '#fff'
    },
    content: {
        margin: 16
    },
    newArrivalText: {
        fontSize: 12,
        fontWeight: 700,
        color: COLORS.primary
    },
    productName: {
        color: COLORS.textSecondary,
        fontWeight: 700,
        fontSize: 24
    },
    price: {
        color: COLORS.textSecondary,
        fontWeight: 700,
        fontSize: 30
    }
})

export default ProductDetailScreen;