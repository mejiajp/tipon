"use client";

import Down from "@/components/icons/Down";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function RangeFilter({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const setFilter = (range: string) => {
    router.push(`/home?range=${range}`);
    setOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* The pill / button */}
      <div
        className="w-35 bg-primary text-white py-2 px-4 rounded-full flex items-center justify-between cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        {/* Centered label text */}
        <span className="flex-1 text-center">{children}</span>

        {/* Arrow on the far right */}
        <Down
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-10">
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setFilter("daily")}
          >
            Daily
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setFilter("weekly")}
          >
            Weekly
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setFilter("monthly")}
          >
            Monthly
          </div>
        </div>
      )}
    </div>
  );
}
