import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-20">
      <p className="text-sm text-neutral-500">Phase 1 · Application scaffold</p>
      <h1 className="text-4xl font-semibold tracking-tight">FinCopilot</h1>
      <p className="text-neutral-600">The application foundation is ready. Dashboard design and financial features will be added in later phases.</p>
      <nav aria-label="Planned pages" className="flex flex-wrap gap-3">
        {["Transactions", "Insights", "Goals"].map((page) => (
          <Button key={page} variant="outline" asChild>
            <Link href={`/${page.toLowerCase()}`}>{page}<ArrowRight size={16} aria-hidden="true" /></Link>
          </Button>
        ))}
      </nav>
    </main>
  );
}
