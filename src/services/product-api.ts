import { api } from "./api-service";
import { ProductQuery, ProductResponse } from "../types/product";

export const getProductsAPI = async (
    query?: ProductQuery
): Promise<ProductResponse> => {
    const res = await api.get<ProductResponse>("/products", {
        params: query,
    });

    return res.data;
};