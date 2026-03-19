"use client";

import { guestLogin, logoutUser } from "@/lib/api/users";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  authenticated: boolean;
  loading: boolean;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        await guestLogin();
        setAuthenticated(true);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  async function logout() {
    try {
      await logoutUser();
      setAuthenticated(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ authenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
