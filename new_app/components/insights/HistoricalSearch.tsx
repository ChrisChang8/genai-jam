import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export const HistoricalSearch: React.FC = () => (
  <section
    aria-labelledby="history-title"
    className="border-t py-8 text-center"
  >
    <h2 id="history-title" className="eyebrow">
      Historical analysis
    </h2>
    <div className="relative mx-auto mt-4 flex max-w-xl gap-2">
      <Search
        size={16}
        aria-hidden="true"
        className="absolute left-3 top-3.5 text-muted-foreground"
      />
      <Input
        disabled
        aria-label="Search your financial history"
        placeholder="Search your financial history…"
        className="pl-10"
      />
      <Button disabled>Search</Button>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">
      Historical analysis is unavailable in this preview.
    </p>
    <p className="mt-3 text-[11px] text-muted-foreground">
      Example questions: Dining vs Groceries · Subscription changes
    </p>
  </section>
);
