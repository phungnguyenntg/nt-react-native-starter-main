import { Product } from "../types/product.types";

export type GetProductsArgs = {
  query?: any;
  refresh?: boolean;
};

export type ProductState = {
  products: Product[];
  productDetail: Product | null;
  loading: boolean;
  refreshing: boolean;
  loadingDetail: boolean;
  error: string | null;
};