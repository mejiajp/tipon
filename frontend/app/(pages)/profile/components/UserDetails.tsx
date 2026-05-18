"use client";

import { useAuthStore } from "@/stores/useAuthStore";

export default function UserDetails() {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-base">
      <div className="flex flex-col items-center ">
        <div
          className={`w-24 aspect-square rounded-full  text-[48px] text-white   bg-primary flex justify-center items-center mb-base`}
        >
          {user.name.split("")[0].toUpperCase()}
        </div>
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <h3 className="text-text-muted">{user.email ? "" : "Guest User"}</h3>
      </div>
      <div className="flex justify-between gap-5">
        <div className="bg-bg rounded-base flex-1 p-base text-center">
          <p>Joined since:</p>
          <p>
            {new Date(user.createdAt).toLocaleDateString("en-PH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="bg-bg rounded-base flex-1 p-base text-center">
          <p>Total Expense:</p>
          <p>{user.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
