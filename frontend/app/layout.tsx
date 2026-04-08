import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import ToastContainer from "@/components/ToastContainer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Tipon",
  description: "Smart Expense Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
