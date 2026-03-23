import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsAPI } from "../services/product-api";
import { Product } from "../types/product";

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async (query: any, { rejectWithValue }) => {
        try {
            const res = await getProductsAPI(query);

            if (!res.status) {
                return rejectWithValue("Fetch failed");
            }

            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

type ProductState = {
    products: Product[];
    loading: boolean;
    error: string | null;
};

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, state => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;