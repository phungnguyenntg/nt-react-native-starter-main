import { Product } from "../../types/product.types";

export type ProductItemProps = {
    product: Product;
    onAddPress: () => void;
    onPress?: () => void;
}