import Link from "next/link";
import DashboardIcon from "./icons/navigation/home";
import CalendarIcon from "./icons/navigation/Calendar";
import NewIcon from "./icons/navigation/New";
import ProfileIcon from "./icons/navigation/Profile";

export default function Navigation() {
  return (
    <nav className=" flex justify-between w-full">
      <div className="flex justify-center items-center py-[14px] px-[28px] gap-[40px] rounded-full bg-bg text-text-muted font-bold">
        <Link
          href="/home"
          className=" flex flex-col justify-center items-center"
        >
          <DashboardIcon className="w-6.5 6.5 " />
          <p className="text-smaller">Home</p>
        </Link>
        <Link
          href="/calendar"
          className="flex flex-col justify-center items-center"
        >
          <CalendarIcon className="w-6.5 h-6.5 " />
          <p className="text-smaller">Calendar</p>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col justify-center items-center"
        >
          <ProfileIcon className="w-6.5  " />
          <p className="text-smaller">Profile</p>
        </Link>
      </div>
      <Link
        href="/new"
        className="h-full aspect-square  flex items-center justify-center rounded-full bg-primary text-bg-light"
      >
        <NewIcon className="w-6.5 h-6.5 text-bg-dark" />
      </Link>
    </nav>
  );
}
