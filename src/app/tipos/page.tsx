import { getTiposJuego } from "@/lib/queries";
import GameTypeCard from "@/components/GameTypeCard";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tipos de juegos — Game Library",
  description: "Explora los diferentes tipos de juegos disponibles en Game Library.",
};

export default async function TiposPage() {
  const tipos = await getTiposJuego();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Tipos de juegos</h1>
        <p className="mt-2 text-zinc-400">
          Explora las diferentes categorías de juegos disponibles.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tipos.map((tipo) => (
          <GameTypeCard key={tipo.id} tipo={tipo} />
        ))}
      </div>
    </div>
  );
}
