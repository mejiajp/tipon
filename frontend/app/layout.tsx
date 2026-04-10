import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/providers/Providers";

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
    <html lang="en" className={`${cn("font-sans", geist.variable)} dark`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function () {
        const theme = localStorage.getItem('theme') || 'system';

        const systemDark =
          window.matchMedia('(prefers-color-scheme: dark)').matches;

        const resolved =
          theme === 'dark' || (theme === 'system' && systemDark);

        document.documentElement.classList.toggle('dark', resolved);
      })();
    `,
          }}
        />
      </head>
      <body className={`antialiased `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
