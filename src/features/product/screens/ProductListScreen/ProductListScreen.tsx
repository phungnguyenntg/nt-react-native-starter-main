import { addToCart } from '@/features/cart/store/cart.slice';
import { HomeStackParamList } from '@/navigation/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { COLORS } from '@/theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ProductItem } from '../../components/ProductItem/ProductItem';
import { selectProductError, selectProductLoading, selectProductRefreshing, selectProducts } from '../../store/product.selectors';
import { getProducts } from '../../store/product.thunks';
import SearchLogo from '@/assets/icons/search.svg';
import { styles } from './ProductListScreen.styles';
import { Separator } from '@/shared/components/Separator';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;
const categories = ["All Items", "Galaxy", "iPhone", "Electricty", "Air Conditioner"];

export const ProductListScreen = ({ navigation }: Props) => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const loading = useAppSelector(selectProductLoading);
    const error = useAppSelector(selectProductError);
    const refreshing = useAppSelector(selectProductRefreshing);
    const selectedCategory = "All Items";

    useEffect(() => {
        dispatch(getProducts({ query: {} }));
    }, [dispatch])

    const handleRefresh = () => {
        dispatch(getProducts({ query: {}, refresh: true }))
    };

    const handleAddToCart = (id: number) => {
        let chosenProduct = products.find(p => p.id == id);
        dispatch(addToCart(chosenProduct!));
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator testID="loading-indicator" size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <SearchLogo />
                <TextInput
                    placeholder="Search products, brands..."
                    style={styles.input}
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.filterRow}>
                {categories.map((category) => {
                    const isActive = category === selectedCategory;
                    return (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.filterBtn,
                                isActive && styles.filterBtnActive,
                            ]}
                        >
                            <Text
                                style={[styles.filterText, isActive && styles.filterTextActive]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Separator />
            <FlatList
                testID="product-list"
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => <ProductItem product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} onAddPress={() => handleAddToCart(item.id)} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                ListEmptyComponent={!loading ? <Text>No product found</Text> : null}
            />
        </View>
    )
}