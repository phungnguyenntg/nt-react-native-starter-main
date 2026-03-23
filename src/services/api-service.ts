import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";

export const api = axios.create({
    baseURL: "http://10.0.2.2:3000",
    timeout: 10000,
});

api.interceptors.request.use(
    async config => {
        const token = await EncryptedStorage.getItem("AUTH_TOKEN");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);