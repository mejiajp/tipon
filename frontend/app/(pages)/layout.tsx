import type { Metadata } from "next";
import Navigation from "@/components/navigation/Navigation";

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
    <div className="flex flex-col justify-between min-h-screen relative">
      <div className="p-4 mb-[calc(18.75+4)]">{children}</div>
      <Navigation />
    </div>
  );
}
