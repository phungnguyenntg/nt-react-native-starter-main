import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ProductItem.styles";
import HeartIcon from "@/assets/icons/heart-grey.svg";
import { ProductItemProps } from "./ProductItem.types";

export const ProductItem = ({ product, onAddPress, onPress }: ProductItemProps) => {
    const category = product.name.split(' ')[0];
    return (
        <>
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <TouchableOpacity style={styles.heartIcon}>
                    <HeartIcon width={16} height={16} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.name}>{product.name}</Text>
                <Text style={styles.category}>{category}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>
    );
};