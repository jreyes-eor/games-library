export function GameCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 animate-pulse">
      <div className="aspect-[16/10] bg-zinc-800" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-5 w-3/4 rounded bg-zinc-800" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-zinc-800" />
          <div className="h-5 w-20 rounded-full bg-zinc-800" />
        </div>
        <div className="mt-auto flex justify-between pt-2">
          <div className="h-4 w-24 rounded bg-zinc-800" />
          <div className="h-4 w-16 rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export function GameGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GameTypeCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 animate-pulse">
      <div className="aspect-[16/9] bg-zinc-800" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-6 w-1/2 rounded bg-zinc-800" />
        <div className="h-4 w-full rounded bg-zinc-800" />
        <div className="mt-auto flex justify-between">
          <div className="h-4 w-16 rounded bg-zinc-800" />
          <div className="h-8 w-20 rounded-lg bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
