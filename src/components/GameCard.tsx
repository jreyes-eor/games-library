import Link from "next/link";
import Image from "next/image";
import type { JuegoCompleto } from "@/lib/types";
import CategoryBadge from "./CategoryBadge";
import Rating from "./Rating";

export default function GameCard({ juego }: { juego: JuegoCompleto }) {
  return (
    <Link
      href={`/juego/${juego.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
        {juego.imagen_url ? (
          <Image
            src={juego.imagen_url}
            alt={juego.nombre}
            width={400}
            height={250}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-zinc-600">🎮</div>
        )}
        <div className="absolute left-2 top-2">
          <span className="rounded-md bg-indigo-600/90 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
            {juego.tipos_juego?.nombre}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
          {juego.nombre}
        </h3>

        <div className="flex flex-wrap gap-1">
          {juego.categorias?.slice(0, 3).map((cat) => (
            <CategoryBadge key={cat.id} nombre={cat.nombre} />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            {juego.jugadores_min && (
              <span>
                👥 {juego.jugadores_min}
                {juego.jugadores_max ? `-${juego.jugadores_max}` : "+"}
              </span>
            )}
          </div>
          {juego.valoracion && <Rating value={juego.valoracion} />}
        </div>

        {juego.edad_minima && (
          <span className="text-xs text-zinc-500">Edad mínima: {juego.edad_minima}+</span>
        )}
      </div>
    </Link>
  );
}
