import Link from "next/link";
import React from "react";

export default function Navigation() {
  return (
    <div className="absolute bottom-0">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/calendar">Calendar</Link>
      <Link href="/transactions">Transactions</Link>
      <Link href="/profile">Profile</Link>
    </div>
  );
}
