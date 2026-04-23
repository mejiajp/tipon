import PageTitle from "@/components/PageTitle";
import ThemeToggle from "./component/ThemeToggle";
import UserDetails from "./component/UserDetails";
import LogoutButton from "./component/LogoutButton";
import Suggestions from "./component/Suggestions";

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
