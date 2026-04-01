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
  return <div>{children}</div>;
}
