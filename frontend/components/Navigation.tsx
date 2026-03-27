import Link from "next/link";
import DashboardIcon from "./icons/navigation/Dashboard";
import CalendarIcon from "./icons/navigation/Calendar";
import NewIcon from "./icons/navigation/New";
import TransactionIcon from "./icons/navigation/Transaction";
import ProfileIcon from "./icons/navigation/Profile";

export default function Navigation() {
  return (
    <nav className=" h-[65px] bg-bg absolute bottom-5 left-1/2 -translate-x-1/2 flex rounded-[10px] p-[2px] gap-[2px]">
      <Link href="/dashboard" className="nav-icon-container">
        <DashboardIcon className="w-6.5 h-6.5 text-text-muted" />
      </Link>
      <Link href="/calendar" className="nav-icon-container">
        <CalendarIcon className="w-6.5 h-6.5 text-text-muted" />
      </Link>
      <Link href="/new" className="nav-icon-container bg-primary text-bg-light">
        <NewIcon className="w-6.5 h-6.5 text-bg-dark" />
      </Link>
      <Link href="/transaction" className="nav-icon-container">
        <TransactionIcon className="w-6.5 h-6.5 text-text-muted" />
      </Link>
      <Link href="/profile" className="nav-icon-container">
        <ProfileIcon className="w-6.5 h-6.5 text-text-muted" />
      </Link>
    </nav>
  );
}
