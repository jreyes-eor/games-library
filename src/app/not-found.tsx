import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl">🔍</span>
      <h2 className="mt-4 text-2xl font-bold text-white">No encontrado</h2>
      <p className="mt-2 text-zinc-400">
        El juego o tipo que buscas no existe o ha sido movido.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
