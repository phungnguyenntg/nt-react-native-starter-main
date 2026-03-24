import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { Product } from "../../types/product"
import { COLORS } from "../theme/color";
import HeartIcon from "../../assets/icons/heart-grey.svg"

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

type Props = {
    product: Product;
    onAddPress: () => void;
    onPress?: () => void;
}

const ProductCard = ({ product, onAddPress, onPress }: Props) => {
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

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: "#fefefe",
    borderRadius: 16,
    padding: 12,
    position: "relative",
  },
  image: { width: "100%", height: cardWidth, borderRadius: 12, marginBottom: 8 },
  heartIcon: { position: "absolute", top: 30, right: 30, zIndex: 2, backgroundColor: COLORS.background, borderRadius: 12, padding: 4 },
  name: { fontWeight: "600", fontSize: 14, marginBottom: 2 },
  category: { fontSize: 12, color: "#666", marginBottom: 8 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontWeight: "700", fontSize: 16 },
  addButton: { backgroundColor: COLORS.primary, borderRadius: 12, width: 28, height: 28, justifyContent: "center", alignItems: "center" },
  addButtonText: { color: "#000", fontWeight: "400", fontSize: 20, lineHeight: 20 }
});

export default ProductCard;