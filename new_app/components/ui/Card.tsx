import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => (
  <section
    className={cn("min-w-0 rounded-xl border bg-surface p-5 md:p-6", className)}
    {...props}
  >
    {children}
  </section>
);
