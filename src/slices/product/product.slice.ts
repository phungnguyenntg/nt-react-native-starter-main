import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "./product.types";
import { getProducts, getProductDetail } from "./product.thunk";

const initialState: ProductState = {
  products: [],
  productDetail: null,
  loading: false,
  refreshing: false,
  loadingDetail: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // ===== LIST =====
      .addCase(getProducts.pending, (state, action) => {
        const isRefresh = action.meta.arg?.refresh ?? false;
        state.loading = !isRefresh;
        state.refreshing = isRefresh;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.payload as string;
      })

      // ===== DETAIL =====
      .addCase(getProductDetail.pending, (state) => {
        state.loadingDetail = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.productDetail = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;