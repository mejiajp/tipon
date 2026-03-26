import Link from "next/link";
import TransactionsIcon from "./icons/Transactions";
import DashboardIcon from "./icons/Dashboard";
import CalendarIcon from "./icons/Calendar";
import NewIcon from "./icons/New";
import ProfileIcon from "./icons/Profile";

export default function Navigation() {
  return (
    <nav className="absolute bottom-0 flex items-center  h-15 w-full bg-white text-center  text-primary">
      <Link href="/dashboard" className="h-12 flex-1">
        <DashboardIcon className="h-[60%] w-full" />
        <h3 className="text-smaller">Dashboard</h3>
      </Link>
      <Link href="/calendar" className="h-12 flex-1">
        <CalendarIcon className="h-[60%] w-full" />
        <h3 className="text-smaller">Calendar</h3>
      </Link>
      <Link href="/new" className="h-12 flex flex-1">
        <NewIcon className="h-[60%] w-full  my-auto " />
      </Link>
      <Link href="/transactions" className="h-12 flex-1">
        <TransactionsIcon className="h-[60%] w-full" />
        <h3 className="text-smaller">Transactions</h3>
      </Link>
      <Link href="/profile" className="h-12 flex-1 ">
        <ProfileIcon className="h-[60%] w-full" />
        <h3 className="text-smaller">Profile</h3>
      </Link>
    </nav>
  );
}
