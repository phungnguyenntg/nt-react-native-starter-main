import { removeToken, saveToken } from '@/storage/secureStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, logoutAPI } from '../services/authService';
import { LoginRequest } from '../types/auth-api.types';
import { saveUser } from '@/storage/sqliteStorage';

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (payload: LoginRequest, { rejectWithValue }) => {
        try {
            const res = await loginAPI(payload);
            if (!res.status) {
                return rejectWithValue('Login failed');
            }
            await saveToken(res.data.token);
            saveUser(res.data.user);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutAPI();
            await removeToken();
            return true;
        } catch (err: any) {
            await removeToken();
            return rejectWithValue(err.message);
        }
    }
);