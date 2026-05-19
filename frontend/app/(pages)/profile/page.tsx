import PageTitle from "@/components/PageTitle";
import ThemeToggle from "./components/ThemeToggle";
import UserDetails from "./components/UserDetails";
import LogoutButton from "./components/LogoutButton";
import Suggestions from "./components/Suggestions";

export default async function page() {
  return (
    <>
      <PageTitle title="Profile" />
      <div className="flex flex-col gap-base">
        <UserDetails />
        <ThemeToggle />
        <LogoutButton />
        <Suggestions />
      </div>
    </>
  );
}
