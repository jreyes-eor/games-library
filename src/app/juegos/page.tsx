import { Suspense } from "react";
import { getJuegos, getTiposJuego, getCategorias } from "@/lib/queries";
import type { FiltrosJuego } from "@/lib/types";
import GameGrid from "@/components/GameGrid";
import GameFilters from "@/components/GameFilters";
import SearchBar from "@/components/SearchBar";
import { GameGridSkeleton } from "@/components/LoadingSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de juegos — Game Library",
  description: "Explora, busca y filtra juegos de todo tipo: videojuegos, juegos de mesa, cartas y rol.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function JuegosPage({ searchParams }: Props) {
  const params = await searchParams;
  const filtros: FiltrosJuego = {
    busqueda: typeof params.busqueda === "string" ? params.busqueda : undefined,
    tipo: typeof params.tipo === "string" ? params.tipo : undefined,
    jugadores: typeof params.jugadores === "string" ? params.jugadores : undefined,
    duracion: typeof params.duracion === "string" ? params.duracion : undefined,
    categoria: typeof params.categoria === "string" ? params.categoria : undefined,
  };

  const [tipos, categorias, juegos] = await Promise.all([
    getTiposJuego(),
    getCategorias(),
    getJuegos(filtros),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tiposSinConteo = tipos.map(({ juegos_count, ...rest }) => rest);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Catálogo de juegos</h1>
        <p className="mt-1 text-zinc-400">
          {juegos.length} {juegos.length === 1 ? "juego encontrado" : "juegos encontrados"}
        </p>
      </div>

      <div className="mb-6">
        <SearchBar />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <GameFilters tipos={tiposSinConteo} categorias={categorias} />
        </aside>

        <div className="flex-1">
          <Suspense fallback={<GameGridSkeleton />}>
            <GameGrid juegos={juegos} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
