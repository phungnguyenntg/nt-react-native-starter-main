import React, { useEffect } from "react";
import { ActivityIndicator, Image, Text, TouchableHighlight, View } from "react-native";
import { HomeStackParamList } from "./navigator/home-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import { getProductDetail } from "../slices/product/product.thunk";

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
        <View>
            <Image source={{ uri: productDetail.image }} style={{ height: 200 }} />
            <Text>{productDetail.name}</Text>
            <Text>{productDetail.description}</Text>
            <Text>${productDetail.price}</Text>
            <TouchableHighlight onPress={() => navigation.navigate('Checkout')}>
                <Text>Go to Checkout</Text>
            </TouchableHighlight>
        </View>
    )
}

export default ProductDetailScreen;