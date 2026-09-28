import Link from "next/link";

export default function JuegoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-zinc-800 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Inicio
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/juegos" className="text-zinc-400 hover:text-white transition-colors">
              Catálogo
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white font-medium">Detalle</span>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
