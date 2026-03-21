import { redirect } from "next/navigation";

export default async function Home() {
  console.log("Went through home");
  redirect("/login");
}
