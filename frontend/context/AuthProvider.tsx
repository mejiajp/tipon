"use client";

import { getCurrentUser, logoutUser } from "@/lib/api/users";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  id: number;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // central check function
  const checkAuth = async () => {
    setLoading(true); // make sure loading is true while fetching
    try {
      const currentUser = await getCurrentUser();
      console.log("checked");
      setUser(currentUser ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // logout clears both backend and frontend state
  const logout = async () => {
    setLoading(true); // optional: show spinner while logging out
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAuth = async () => {
    await checkAuth();
  };

  // block rendering until loading finishes
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
