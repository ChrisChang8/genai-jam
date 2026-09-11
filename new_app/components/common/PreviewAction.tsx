import { Button } from "@/components/ui/button";

export interface PreviewActionProps {
  label: string;
  note?: string;
  fullWidth?: boolean;
}
export const PreviewAction: React.FC<PreviewActionProps> = ({
  label,
  note = "Preview only · available in a later phase",
  fullWidth = false,
}) => (
  <div className="space-y-2">
    <Button disabled className={fullWidth ? "w-full" : undefined}>
      {label}
    </Button>
    <p className="text-[11px] leading-relaxed text-muted-foreground">{note}</p>
  </div>
);
