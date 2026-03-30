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