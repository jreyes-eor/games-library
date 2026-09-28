import { GameGridSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="h-9 w-64 rounded bg-zinc-800 animate-pulse" />
        <div className="mt-2 h-5 w-48 rounded bg-zinc-800 animate-pulse" />
      </div>
      <div className="mb-6 h-11 rounded-lg bg-zinc-800 animate-pulse" />
      <GameGridSkeleton />
    </div>
  );
}
