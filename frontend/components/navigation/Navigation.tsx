"use client";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

import DashboardIcon from "@/components/icons/navigation/Home";
import CalendarIcon from "@/components/icons/navigation/Calendar";
import ProfileIcon from "@/components/icons/navigation/Profile";
import NewIcon from "@/components/icons/navigation/New";

export default function Navigation() {
  const pathname = usePathname(); // e.g., "/home"
  return (
    <nav className="flex justify-between">
      <div className="flex gap-10 bg-bg py-3.5 px-9 rounded-full">
        <NavItem
          href="/home"
          label="Home"
          Icon={DashboardIcon}
          className=""
          isActive={pathname === "/home"}
        />
        <NavItem
          href="/calendar"
          label="Calendar"
          Icon={CalendarIcon}
          className=""
          isActive={pathname === "/calendar"}
        />
        <NavItem
          href="/profile"
          label="Profile"
          Icon={ProfileIcon}
          className=""
          isActive={pathname === "/profile"}
        />
      </div>

      {/* New Expense */}
      <NavItem
        href="/new"
        Icon={NewIcon}
        className="h-full aspect-square  flex items-center justify-center rounded-full bg-primary"
        iconClassName="text-bg-light"
      />
    </nav>
  );
}
