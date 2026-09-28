import type { JuegoCompleto } from "@/lib/types";
import GameCard from "./GameCard";

export default function GameGrid({ juegos }: { juegos: JuegoCompleto[] }) {
  if (juegos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl">🔍</span>
        <h3 className="mt-4 text-lg font-semibold text-white">No se encontraron juegos</h3>
        <p className="mt-1 text-sm text-zinc-400">Intenta ajustar los filtros o la búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {juegos.map((juego) => (
        <GameCard key={juego.id} juego={juego} />
      ))}
    </div>
  );
}
