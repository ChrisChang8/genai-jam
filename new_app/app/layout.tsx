import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinCopilot",
  description: "AI Personal Finance Copilot development scaffold",
};

interface RootLayoutProps { children: ReactNode }

export default function RootLayout({ children }: RootLayoutProps) {
  return <html lang="en"><body>{children}</body></html>;
}
