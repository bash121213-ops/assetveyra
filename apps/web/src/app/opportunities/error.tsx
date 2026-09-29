'use client';

import RouteError from '@/components/RouteError';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RouteError reset={reset} label="Unable to load the marketplace. Please try again shortly." />;
}
