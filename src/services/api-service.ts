import { getToken } from '@/storage/secureStorage';
import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.0.2.2:3000",
    timeout: 10000,
});

api.interceptors.request.use(async config => {
    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});