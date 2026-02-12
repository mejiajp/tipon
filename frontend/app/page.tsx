import { fetchAPI } from "@/lib/fetchers";
import Image from "next/image";

export default async function Home() {
  const data = await fetchAPI();

  console.log(data);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="">
        <h1>Tipon</h1>
      </main>
    </div>
  );
}
