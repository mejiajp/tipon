import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Page Not Found",
  description: "The page you're looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <h1 className="font-title text-6xl text-primary text-center">
        Page not found
      </h1>

      <p className="mt-6 max-w-md  text-base text-white text-center">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
        been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-primary/50 px-6 py-3 text-sm  text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
