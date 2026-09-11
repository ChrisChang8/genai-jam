import { SearchX } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description: string;
}
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
}) => (
  <div className="rounded-xl border border-dashed bg-surface px-5 py-16 text-center">
    <SearchX
      className="mx-auto mb-4 text-muted-foreground"
      size={28}
      aria-hidden="true"
    />
    <h2 className="font-semibold">{title}</h2>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
  </div>
);
