import Link from "next/link";

export default function TipoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-zinc-800 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Inicio
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/tipos" className="text-zinc-400 hover:text-white transition-colors">
              Tipos
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
