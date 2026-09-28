import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <span className="text-xl font-bold tracking-tight text-white">
            Game <span className="text-indigo-400">Library</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/juegos"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Catálogo
          </Link>
          <Link
            href="/tipos"
            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Tipos de Juegos
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/juegos"
            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200"
          >
            Catálogo
          </Link>
          <Link
            href="/tipos"
            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200"
          >
            Tipos de Juegos
          </Link>
        </div>
      </div>
    </header>
  );
}
