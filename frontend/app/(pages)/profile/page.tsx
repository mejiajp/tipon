import React from "react";
import { getCurrentUser } from "@/lib/fetchers/users";

export default async function page() {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
    </div>
  );
}
