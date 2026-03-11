import { redirect } from "next/navigation";

export default async function Home() {
  const token = localStorage.get("token");

  if (token) {
    redirect("/dashboard");
  }

  redirect("/login");
}
