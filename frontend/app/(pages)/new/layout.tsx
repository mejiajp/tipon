import React from "react";

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex flex-col gap-small">{children}</main>;
}
