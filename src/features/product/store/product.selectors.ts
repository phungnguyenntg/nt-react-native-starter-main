import { RootState } from '@/store/store';

export const selectProducts = (state: RootState) => state.product.products;

export const selectProductRefreshing = (state: RootState) => state.product.refreshing;

export const selectProductLoading = (state: RootState) => state.product.loading;

export const selectProductError = (state: RootState) => state.product.error;

export const selectProductDetail = (state: RootState) => state.product.productDetail;

export const selectProductLoadingDetail = (state: RootState) => state.product.loadingDetail;