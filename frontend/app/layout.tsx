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
    <html
      lang="en"
      className={`${cn("font-sans", geist.variable)} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              const stored = localStorage.getItem('theme-store');
              const parsed = stored ? JSON.parse(stored) : null;
              const mode = parsed?.state?.mode;
              const theme = parsed?.state?.theme;
          
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          
              const resolved =
                !mode || mode === 'system'
                  ? systemDark
                  : theme === 'dark';
          
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
