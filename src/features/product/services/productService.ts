import { api } from "@/services/api-service";
import { ProductDetailResponse, ProductQuery, ProductResponse } from "../types/product-api.types";

export const getProductsAPI = async (
    query?: ProductQuery
): Promise<ProductResponse> => {
    const res = await api.get<ProductResponse>("/product", {
        params: query,
    });

    return res.data;
};

export const getProductDetailAPI = async (productId: number): Promise<ProductDetailResponse> => {
  const res = await api.get(`/product/${productId}`);
  return res.data;
};