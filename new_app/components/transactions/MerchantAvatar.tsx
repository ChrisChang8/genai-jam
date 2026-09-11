import { cn } from "@/lib/utils";

export interface MerchantAvatarProps {
  initials: string;
  income?: boolean;
  selected?: boolean;
  large?: boolean;
}
export const MerchantAvatar: React.FC<MerchantAvatarProps> = ({
  initials,
  income = false,
  selected = false,
  large = false,
}) => (
  <span
    aria-hidden="true"
    className={cn(
      "flex shrink-0 items-center justify-center rounded-full font-medium",
      large ? "h-16 w-16 text-xl" : "h-9 w-9 text-xs",
      selected
        ? "bg-black text-white"
        : income
          ? "bg-positive-surface text-positive"
          : "bg-muted text-foreground",
    )}
  >
    {initials}
  </span>
);
