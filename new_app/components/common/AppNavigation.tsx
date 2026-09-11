"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
  { href: "/insights", label: "Insights" },
  { href: "/goals", label: "Goals" },
];

export const AppNavigation: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Main navigation"
      className="flex w-full justify-between gap-1 rounded-full bg-muted p-1 md:w-auto"
    >
      {pages.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={`flex min-h-10 items-center rounded-full px-3 text-xs transition-colors md:px-4 md:text-sm ${pathname === href ? "bg-surface font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
