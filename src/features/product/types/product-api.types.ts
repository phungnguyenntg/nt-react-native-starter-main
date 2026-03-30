import { Product } from "@/types/product";

export type PriceUnit = "dollar" | "euro" | "inr";

export type ProductQuery = {
    name?: string;
    priceUnit?: PriceUnit;
};

export type ProductResponse = {
    status: boolean;
    data: Product[];
};

export type ProductDetailResponse = {
    status: boolean;
    data: Product;
};