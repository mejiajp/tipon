import Logout from "./component/Logout";

export default async function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <Logout />
    </div>
  );
}
