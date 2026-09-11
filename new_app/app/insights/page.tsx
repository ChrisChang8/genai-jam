import Link from "next/link";

export default function InsightsPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-20">
      <h1 className="text-3xl font-semibold">Insights</h1>
      <p className="text-neutral-600">This page is reserved for a later phase.</p>
      <Link href="/" className="underline underline-offset-4">Back to overview</Link>
    </main>
  );
}

