import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
}) => (
  <header className="flex flex-col gap-5 border-b pb-8 md:flex-row md:items-end md:justify-between">
    <div>
      <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
    {children && <div className="shrink-0">{children}</div>}
  </header>
);
