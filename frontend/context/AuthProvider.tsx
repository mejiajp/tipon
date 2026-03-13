"use client";

import { guestLogin } from "@/lib/api/users";
import { clearAuth, getDeviceId, getToken, setToken } from "@/lib/auth/key";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  token: string | null;
  loading: boolean;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        let existingToken = getToken();

        if (!existingToken) {
          const deviceId = getDeviceId();

          const data = await guestLogin(deviceId);

          existingToken = data.token;

          if (existingToken) {
            setToken(existingToken);
          }
        }

        setTokenState(existingToken);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  function logout() {
    clearAuth();
    setTokenState(null);
  }
  return (
    <AuthContext.Provider value={{ token, loading, logout }}>
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
