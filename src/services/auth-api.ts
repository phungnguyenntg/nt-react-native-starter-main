import { api } from "./api-service";
import { LoginPayload, LoginResponse, LogoutResponse } from "../types/auth";

export const loginAPI = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/login", payload);
  return res.data;
};

export const logoutAPI = async (): Promise<LogoutResponse> => {
  const res = await api.post<LogoutResponse>("/logout");
  return res.data;
}