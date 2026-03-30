import { Product } from "@/features/product/types/product.types";

type CartItem = Product & { quantity: number };

export type CartState = {
  items: CartItem[];
};