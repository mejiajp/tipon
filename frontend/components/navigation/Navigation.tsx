"use client";

import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

import DashboardIcon from "@/components/icons/navigation/Home";
import CalendarIcon from "@/components/icons/navigation/Calendar";
import ProfileIcon from "@/components/icons/navigation/Profile";
import NewIcon from "@/components/icons/navigation/New";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between h-[75px] fixed w-full px-4 mb-4 bottom-0 ">
      {/* Nav Pill */}
      <div className="flex gap-10 bg-bg  px-9 rounded-full">
        <NavItem
          href="/home"
          label="Home"
          Icon={DashboardIcon}
          isActive={pathname === "/home"}
        />
        <NavItem
          href="/calendar"
          label="Calendar"
          Icon={CalendarIcon}
          isActive={pathname === "/calendar"}
        />
        <NavItem
          href="/profile"
          label="Profile"
          Icon={ProfileIcon}
          isActive={pathname === "/profile"}
        />
      </div>

      {/* New Button */}
      <NavItem
        href="/new"
        Icon={NewIcon}
        className="bg-primary h-full aspect-square rounded-full "
        iconClassName="text-bg-light"
      />
    </nav>
  );
}
