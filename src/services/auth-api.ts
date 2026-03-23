import { api } from "./api-service";
import { LoginPayload, LoginResponse } from "../types/auth";

export const loginAPI = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/login", payload);
  return res.data;
};