import Link from "next/link";
import DashboardIcon from "./icons/Dashboard";
import CalendarIcon from "./icons/Calendar";
import NewIcon from "./icons/New";
import TransactionIcon from "./icons/Transaction";
import ProfileIcon from "./icons/Profile";

export default function Navigation() {
  return (
    <nav className=" h-[65px] bg-bg absolute bottom-5 left-1/2 -translate-x-1/2 flex rounded-[10px] p-[2px] gap-[2px]">
      <Link
        href="/dashboard"
        className="w-15 aspect-square bg-bg-dark flex justify-center items-center rounded-[10px]"
      >
        <DashboardIcon className="w-6.5 h-6.5 text-text-muted" />
      </Link>
      <Link
        href="/calendar"
        className="w-15 aspect-square bg-bg-dark flex justify-center items-center rounded-[10px]"
      >
        <CalendarIcon className="w-6.5 h-6.5 text-text-muted" />
      </Link>
      <Link
        href="/new"
        className="w-15 aspect-square bg-primary flex justify-center items-center rounded-[10px]"
      >
        <NewIcon className="w-6.5 h-6.5 text-bg-dark" />
      </Link>
      <Link
        href="/transaction"
        className="w-15 aspect-square bg-bg-dark flex justify-center items-center rounded-[10px]"
      >
        <TransactionIcon className="w-6.5 h-6.5 text-text-muted" />
      </Link>
      <Link
        href="/profile"
        className="w-15 aspect-square bg-bg-dark flex justify-center items-center rounded-[10px]"
      >
        <ProfileIcon className="w-6.5 h-6.5 text-text-muted" />
      </Link>
    </nav>
  );
}
