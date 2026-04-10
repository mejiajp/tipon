import React from "react";
import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
        <ToastProvider />
      </ThemeProvider>
    </AuthProvider>
  );
}
