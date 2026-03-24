import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableHighlight, View, RefreshControl } from 'react-native';
import { HomeStackParamList } from './navigator/home-stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { useEffect } from 'react';
import { getProducts } from '../slices/product/product.thunk';
import ProductCard from './components/ProductCard';
import { COLORS } from './theme/color';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error, refreshing } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(getProducts({query: {}}));
    }, [dispatch])

    const handleRefresh = () => {
        dispatch(getProducts({query: {}, refresh: true}))
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
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
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} onAddPress={() => console.log("Added Product", item.id)} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                ListEmptyComponent={!loading ? <Text>No product found</Text> : null}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: COLORS.background },
    row: { justifyContent: "space-between", marginBottom: 16, elevation: 0.5 },
});

export default HomeScreen;