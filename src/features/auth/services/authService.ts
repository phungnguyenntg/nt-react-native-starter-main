import { api } from "@/services";
import { LoginRequest, LoginResponse, LogoutResponse } from "../types/auth-api.types";

export const loginAPI = async (payload: LoginRequest) : Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/login", payload);
  return res.data;
};

export const logoutAPI = async (): Promise<LogoutResponse> => {
  const res = await api.post<LogoutResponse>("/logout");
  return res.data;
}