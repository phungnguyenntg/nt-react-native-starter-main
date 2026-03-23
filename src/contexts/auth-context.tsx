import React, { createContext, useState, useEffect, useContext } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import { User, LoginPayload } from "../types/auth";
import { loginAPI } from "../services/auth-api";

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

  // Auto login khi mở app
  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await EncryptedStorage.getItem(TOKEN_KEY);
        if (savedToken) {
          setToken(savedToken);
          // Optional: call /me để lấy user, hoặc decode token
        }
      } catch (err) {
        console.log("Failed to load token", err);
      }
    };
    loadToken();
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
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
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