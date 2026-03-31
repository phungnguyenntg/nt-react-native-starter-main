import { HomeStackParamList } from "@/navigation/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { selectProductDetail, selectProductLoadingDetail } from "../../store/product.selectors";
import { getProductDetail } from "../../store/product.thunks";
import { addToCart } from "@/features/cart/store/cart.slice";
import { useEffect } from "react";
import { styles } from "./ProductDetailScreen.styles";
import { COLORS } from "@/theme/colors";
import HeartIcon from "@/assets/icons/heart-grey.svg";
import { RatingStar } from "../../components/RatingStar";
import { OutlineButton } from "@/shared/components/OutlineButton";
import { FilledButton } from "@/shared/components/FilltedButton";

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;
export const ProductDetailScreen = ({ route, navigation }: Props) => {
    const { productId } = route.params;

    const dispatch = useAppDispatch();
    const productDetail = useAppSelector(selectProductDetail);
    const loadingDetail = useAppSelector(selectProductLoadingDetail);

    const handleAddToCart = () => {
        dispatch(addToCart(productDetail!));
    }

    const handleBuyNow = () => {}

    useEffect(() => {
        dispatch(getProductDetail(productId));
    }, [productId]);

    if (loadingDetail) {
        return <ActivityIndicator size="large" testID="ActivityIndicator" />;
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
                        <RatingStar rating={4} />
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