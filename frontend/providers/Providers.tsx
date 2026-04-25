import React from "react";
import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
