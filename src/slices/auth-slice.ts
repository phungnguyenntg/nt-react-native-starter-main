import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../services/auth-api";
import { LoginPayload, User } from "../types/auth";

export const login = createAsyncThunk(
    "auth/login",
    async (payload: LoginPayload, { rejectWithValue }) => {
        try {
            const res = await loginAPI(payload);

            if (!res.status) {
                return rejectWithValue("Login failed");
            }

            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;