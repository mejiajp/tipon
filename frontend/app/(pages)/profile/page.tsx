import PageTitle from "@/components/PageTitle";
import Logout from "./component/Logout";
import ThemeToggle from "./component/ThemeToggle";
import UserDetails from "./component/UserDetails";

export default async function page() {
  return (
    <>
      <PageTitle title="Profile" />
      <div className="flex flex-col gap-base">
        <UserDetails />
        <ThemeToggle />
        <Logout />
      </div>
    </>
  );
}
