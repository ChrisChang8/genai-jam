'use client';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return <div role="alert" className="section-space"><h1 className="text-2xl font-semibold">Unable to load this page</h1><p className="text-sm text-muted-foreground">Check the local database configuration and migrations, then try again.</p><Button onClick={reset}>Try again</Button></div>;
}
