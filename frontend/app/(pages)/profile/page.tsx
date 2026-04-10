import Logout from "./component/Logout";
import ThemeToggle from "./component/ThemeToggle";

export default async function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <ThemeToggle />
      <Logout />
    </div>
  );
}
