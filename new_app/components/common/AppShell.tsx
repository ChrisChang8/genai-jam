import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { ReactNode } from "react";
import { AppNavigation } from "@/components/common/AppNavigation";

export interface AppShellProps {
  children: ReactNode;
}
export const AppShell: React.FC<AppShellProps> = ({ children }) => (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-surface focus:p-4"
    >
      Skip to content
    </a>
    <header className="border-b bg-surface">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-8 gap-y-4 px-4 py-4 md:px-8">
        <Link
          href="/"
          aria-label="FinCopilot home"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-sm text-white"
          >
            F
          </span>
          FinCopilot
        </Link>
        <div className="order-3 w-full md:order-none md:w-auto">
          <AppNavigation />
        </div>
        <div className="ml-auto flex items-center gap-5">
          <span className="hidden items-center gap-2 rounded-full border px-3 py-2 text-xs lg:flex">
            <CalendarDays size={14} aria-hidden="true" />
            September 2026
          </span>
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold"
              aria-hidden="true"
            >
              CM
            </span>
            <div className="text-xs">
              <p className="font-medium">Chris M.</p>
              <p className="mt-0.5 text-muted-foreground">Demo profile</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main id="main-content" className="page-container" tabIndex={-1}>
      {children}
    </main>
    <footer className="mx-auto max-w-[1476px] px-4 pb-8 text-xs leading-relaxed text-muted-foreground md:px-8 lg:px-12">
      Demo application using synthetic financial data · September 2026.
      Illustrative recommendations for educational purposes only.
    </footer>
  </>
);
