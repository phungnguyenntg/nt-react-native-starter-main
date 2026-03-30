import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetailAPI, getProductsAPI } from "../services/productService";
import { GetProductsArgs } from "./product.types";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ query }: GetProductsArgs, { rejectWithValue }) => {
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

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (productId: number, { rejectWithValue }) => {
    try {
      const res = await getProductDetailAPI(productId);

      if (!res.status) {
        return rejectWithValue("Fetch detail failed");
      }

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);