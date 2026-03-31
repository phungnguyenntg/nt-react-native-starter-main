import { HomeStackParamList } from "@/navigation/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import KeyFeature from "../../components/KeyFeature/KeyFeature";
import ClockIcon from "@/assets/icons/clock-active.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down-active.svg";
import ThunderIcon from "@/assets/icons/thunder-active.svg";
import ShieldIcon from "@/assets/icons/shield-active.svg";

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;
export const ProductDetailScreen = ({ route, navigation }: Props) => {
    const { productId } = route.params;

    const dispatch = useAppDispatch();
    const productDetail = useAppSelector(selectProductDetail);
    const loadingDetail = useAppSelector(selectProductLoadingDetail);

    const handleAddToCart = () => {
        dispatch(addToCart(productDetail!));
    }

    const handleBuyNow = () => { }

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
        <View style={{ flex: 1 }}>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }} // 👈 tránh bị che bởi buttons
                showsVerticalScrollIndicator={false}
            >
                <Image source={{ uri: productDetail.image }} style={styles.image} />

                <View style={styles.container}>
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
                            <HeartIcon width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mainSection}>
                        <Text style={styles.sectionTitle}>Key Features</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                            <KeyFeature icon={<ClockIcon />} title="Battery" value="48 Hours" />
                            <KeyFeature icon={<ThunderIcon />} title="Sync" value="Bluetooth 5.2" />
                            <KeyFeature icon={<ChevronDownIcon />} title="Water" value="5ATM Resist" />
                            <KeyFeature icon={<ShieldIcon />} title="Warranty" value="12 Months" />
                        </View>
                    </View>
                    <View style={styles.mainSection}>
                        <Text style={styles.sectionTitle}>Product Description</Text>
                        <Text style={styles.descriptionText}>
                            Experience the future on your wrist. The Quantum Pro
                            Smartwatch combines sleek industrial design with
                            cutting-edge health monitoring sensors. Featuring an
                            Always-On OLED display, it tracks your heart rate,
                            blood oxygen levels, and daily activity with medical-
                            grade precision. Perfect for both professional and
                            athletic lifestyles.</Text>
                        <TouchableOpacity><Text style={styles.readMoreButton}>Read more...</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.fixedBottom}>
                <OutlineButton
                    title="Add to Cart"
                    textColor={COLORS.primary}
                    borderColor={COLORS.primary}
                    onPress={handleAddToCart}
                />
                <FilledButton
                    title="Buy Now"
                    textColor={COLORS.textSecondary}
                    backgroundColor={COLORS.primary}
                    onPress={handleBuyNow}
                />
            </View>

        </View>
    );
}