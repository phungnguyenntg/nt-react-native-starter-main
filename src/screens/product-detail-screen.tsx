import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { HomeStackParamList } from "./navigator/home-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import { getProductDetail } from "../slices/product/product.thunk";
import { COLORS } from "./theme/color";
import RatingStars from "./components/products/RatingStarts";
import HeartIcon from "../assets/icons/heart-grey.svg"
import OutlineButton from "./components/products/OutlineButton";
import FilledButton from "./components/products/FilledButton";
import { addToCart } from "../slices/cart-slide";

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;
const ProductDetailScreen = ({ route, navigation }: Props) => {
    const { productId } = route.params;

    const dispatch = useDispatch<AppDispatch>();
    const { productDetail, loadingDetail } = useSelector(
        (state: RootState) => state.product
    );

    const handleAddToCart = () => {
        dispatch(addToCart(productDetail!));
    }

    const handleBuyNow = () => {
        dispatch(addToCart(productDetail!));
        navigation.navigate('Checkout');
    }

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
            <View style={styles.mainContent}>
                <View>
                    <Text style={styles.newArrivalText}>NEW ARRIVAL</Text>
                    <Text style={styles.productName}>{productDetail.name}</Text>
                    <View style={styles.ratingSection}>
                        <RatingStars rating={4} />
                        <Text style={styles.reviewNumber}>{"(128 Reviews)"}</Text>
                    </View>
                    <Text style={styles.price}>${productDetail.price}</Text>
                </View>
                <TouchableOpacity>
                    <HeartIcon width={20} height={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomButtons}>
                <OutlineButton title="Add to Cart" textColor={COLORS.primary} borderColor={COLORS.primary} onPress={handleAddToCart} />
                <FilledButton title="Buy Now" textColor={COLORS.textSecondary} backgroundColor={COLORS.primary} onPress={handleBuyNow} />
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
        gap: 16
    },
    mainContent: {
        marginTop: -16,
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        elevation: 0.2
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
    ratingSection: {
        flexDirection: 'row',
        gap: 4
    },
    reviewNumber: {
        color: COLORS.textTertiary,
        marginTop: -2
    },
    price: {
        color: COLORS.textSecondary,
        fontWeight: 700,
        fontSize: 30
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: 16
    }
})

export default ProductDetailScreen;