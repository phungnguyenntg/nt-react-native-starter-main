import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl, TextInput, TouchableOpacity } from 'react-native';
import { HomeStackParamList } from './navigator/home-stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { useEffect } from 'react';
import { getProducts } from '../slices/product/product.thunk';
import ProductCard from './components/ProductCard';
import { COLORS } from './theme/color';
import SearchLogo from '../assets/icons/search.svg'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;
const categories = ["All Items", "Galaxy", "iPhone", "Electricty", "Air Conditioner"];

const HomeScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error, refreshing } = useSelector((state: RootState) => state.product);
    const selectedCategory = "All Items";

    useEffect(() => {
        dispatch(getProducts({ query: {} }));
    }, [dispatch])

    const handleRefresh = () => {
        dispatch(getProducts({ query: {}, refresh: true }))
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
            <View style={styles.separator} />
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
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: '#fff' },
    row: { justifyContent: "space-between", marginBottom: 16, elevation: 0.5 },
    searchBox: {
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 8,
        color: COLORS.textSecondary,
    },
    filterRow: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 8,
    },
    filterBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        marginRight: 10,
    },
    filterBtnActive: {
        backgroundColor: COLORS.primary,
    },
    filterText: {
        color: COLORS.textSecondary,
    },
    filterTextActive: {
        color: COLORS.textPrimary,
        fontWeight: "bold",
    },
    separator: {
        height: 2,
        backgroundColor: COLORS.background
    }
});

export default HomeScreen;