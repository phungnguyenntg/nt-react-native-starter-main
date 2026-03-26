import React, { createContext, useState, useEffect, useContext } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import { User } from "../types/auth";
import { loginAPI, logoutAPI } from "../services/auth-api";
import { initDB, getUser, saveUser, deleteUser, logCurrentUser } from "../db";

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_KEY = "AUTH_TOKEN";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initDB();
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await loginAPI({ username, password });

      if (!res.status) {
        throw new Error("Login failed");
      }

      setUser(res.data.user);
      setToken(res.data.token);
      await EncryptedStorage.setItem(TOKEN_KEY, res.data.token);
      const token = await EncryptedStorage.getItem("AUTH_TOKEN");
      console.log("Token saved in Encrypted Storage:", token);
      // Save user to local DB
      saveUser(res.data.user);
      // Log current user
      logCurrentUser();

    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutAPI();
    }
    catch{};
    setUser(null);
    deleteUser();
    setToken(null);
    await EncryptedStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export { AuthProvider, useAuth };