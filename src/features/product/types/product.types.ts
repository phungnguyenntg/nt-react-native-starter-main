export type PriceUnit = "dollar" | "euro" | "inr";

export type Product = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    priceUnit: PriceUnit;
};