import Logout from "./component/Logout";
import ThemeToggle from "./component/ThemeToggle";
import UserDetails from "./component/UserDetails";

export default async function page() {
  return (
    <div>
      <div className="page-title-container">
        <h1 className="page-title">Profile Page</h1>
      </div>
      <div className="flex flex-col gap-base">
        <UserDetails />
        <ThemeToggle />
        <Logout />
      </div>
    </div>
  );
}
