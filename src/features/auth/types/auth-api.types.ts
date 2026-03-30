import { User } from "@/types/user";

export type LoginRequest = {
  username: string;
  password: string;
};

type LoginData = {
  user: User;
  token: string;
};

export type LoginResponse = {
  status: boolean;
  data: LoginData;
};

type LogoutData = {
  message: string;
}

export type LogoutResponse = {
  status: boolean;
  data: LogoutData;
}