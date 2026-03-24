import { api } from "./api-service";
import { ProductQuery, ProductResponse } from "../types/product";
import { Product } from "../types/product";

export const getProductsAPI = async (
    query?: ProductQuery
): Promise<ProductResponse> => {
    const res = await api.get<ProductResponse>("/product", {
        params: query,
    });

    return res.data;
};

export const getProductDetailAPI = async (productId: number): Promise<{ status: boolean; data: Product }> => {
  const res = await api.get(`/product/${productId}`);
  return res.data;
};