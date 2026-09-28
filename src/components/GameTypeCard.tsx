import Link from "next/link";
import Image from "next/image";
import type { TipoJuegoConConteo } from "@/lib/types";

export default function GameTypeCard({ tipo }: { tipo: TipoJuegoConConteo }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-800">
        {tipo.imagen_url ? (
          <Image
            src={tipo.imagen_url}
            alt={tipo.nombre}
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-zinc-600">🎮</div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold text-white">{tipo.nombre}</h3>
          {tipo.descripcion && (
            <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{tipo.descripcion}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            {tipo.juegos_count} {tipo.juegos_count === 1 ? "juego" : "juegos"}
          </span>
          <Link
            href={`/tipo/${tipo.slug}`}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Explorar →
          </Link>
        </div>
      </div>
    </div>
  );
}
