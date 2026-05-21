"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = async () => {
    try {
      setSubmitting(true);
      await logout();
      router.replace("/login");
    } finally {
      setSubmitting(false);
      setOpen(false);
    }
  };

  console.log(user);
  const logoutDialog = user?.provider
    ? "Leaving guest mode will delete all your data. Are you sure you want to leave guest mode?"
    : "Logging out with connected account will not delete your data. Do you want to log out?";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="full-button text-white font-bold bg-red-500"
      >
        {submitting ? "Logging out..." : "Logout"}
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave guest mode?</AlertDialogTitle>
            <AlertDialogDescription>{logoutDialog}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:flex-col-reverse">
            <AlertDialogCancel className="full-button" disabled={submitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="full-button"
              disabled={submitting}
              onClick={handleLogout}
            >
              {submitting ? "Logging out..." : "Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
