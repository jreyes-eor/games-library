import Link from "next/link";
import { getTiposJuego, getJuegosDestacados } from "@/lib/queries";
import GameCard from "@/components/GameCard";
import GameTypeCard from "@/components/GameTypeCard";

export const revalidate = 60;

export default async function HomePage() {
  const [tipos, destacados] = await Promise.all([
    getTiposJuego(),
    getJuegosDestacados(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="flex flex-col items-center py-16 text-center sm:py-24">
        <span className="text-6xl">🎮</span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Game <span className="text-indigo-400">Library</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-400">
          Explora juegos de todo tipo. Encuentra videojuegos, juegos de mesa, cartas y rol. Tu próximo juego favorito te espera.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {tipos.map((tipo) => (
            <Link
              key={tipo.id}
              href={`/tipo/${tipo.slug}`}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-indigo-500 hover:text-white"
            >
              {tipo.nombre}
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/juegos"
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      <section className="py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Tipos de juegos</h2>
          <Link href="/tipos" className="text-sm text-indigo-400 hover:text-indigo-300">
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tipos.map((tipo) => (
            <GameTypeCard key={tipo.id} tipo={tipo} />
          ))}
        </div>
      </section>

      <section className="py-10">
        <h2 className="mb-6 text-2xl font-bold text-white">⭐ Juegos destacados</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destacados.map((juego) => (
            <GameCard key={juego.id} juego={juego} />
          ))}
        </div>
      </section>
    </div>
  );
}
