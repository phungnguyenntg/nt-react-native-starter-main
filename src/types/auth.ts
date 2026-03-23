export type User = {
  id: number;
  username: string;
  email: string;
  age: number;
  role: "user" | "admin";
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginData = {
  user: User;
  token: string;
};

export type LoginResponse = {
  status: boolean;
  data: LoginData;
};