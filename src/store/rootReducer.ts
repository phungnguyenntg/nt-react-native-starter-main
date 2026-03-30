import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/store/auth.slice";
import productReducer from "@/features/product/store/product.slice";
import cartReducer from "@/features/cart/store/cart.slice";

export const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer
});