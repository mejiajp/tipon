import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: string;
  label?: string;
  Icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  className?: string;
  iconClassName?: string;
}
export default function NavItem({
  href,
  label,
  Icon,
  isActive,
  className = "",
  iconClassName,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 ${
        isActive ? "text-primary" : "text-text-muted"
      } ${className} `}
    >
      <Icon
        className={`w-6.5 h-6.5 ${
          isActive ? "text-primary" : iconClassName || "text-text-muted"
        }`}
      />
      {label && <span className="text-xs font-bold">{label}</span>}
    </Link>
  );
}
