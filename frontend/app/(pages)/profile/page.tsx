import Logout from "./component/Logout";
import ThemeToggle from "./component/ThemeToggle";

export default async function page() {
  return (
    <div>
      <div className="page-title-container">
        <h1 className="page-title">Profile Page</h1>
      </div>
      <ThemeToggle />
      <Logout />
    </div>
  );
}
