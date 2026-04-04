import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-col gap-small">{children}</main>;
}
