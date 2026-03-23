import React, { createContext, useState } from "react";
import { User } from "../types/user";

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = async (username: string, password: string) => {
        // hardcode test
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (username === 'wrong') {
                    reject(new Error('Invalid username or password'));
                } else {
                    setUser({ name: username });
                    resolve();
                }
            }, 500); // mô phỏng delay API
        });
    };
    const logout = () => {
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };