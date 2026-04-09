import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Tipon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col min-h-screen">{children}</main>;
}
