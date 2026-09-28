"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Categoria, TipoJuego } from "@/lib/types";

type Props = {
  tipos: TipoJuego[];
  categorias: Categoria[];
};

const JUGADORES_OPTIONS = [
  { value: "1", label: "1 jugador" },
  { value: "2", label: "2 jugadores" },
  { value: "3-4", label: "3-4 jugadores" },
  { value: "5+", label: "5+ jugadores" },
];

const DURACION_OPTIONS = [
  { value: "menos-30", label: "Menos de 30 min" },
  { value: "30-60", label: "30-60 min" },
  { value: "1-2h", label: "1-2 horas" },
  { value: "mas-2h", label: "Más de 2 horas" },
];

export default function GameFilters({ tipos, categorias }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTipo = searchParams.get("tipo") ?? "";
  const currentJugadores = searchParams.get("jugadores") ?? "";
  const currentDuracion = searchParams.get("duracion") ?? "";
  const currentCategoria = searchParams.get("categoria") ?? "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/juegos?${params.toString()}`);
  };

  const clearAll = () => {
    router.push("/juegos");
  };

  const hasFilters = currentTipo || currentJugadores || currentDuracion || currentCategoria;

  return (
    <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Filtros</h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-indigo-400 hover:text-indigo-300"
          >
            Limpiar todo
          </button>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">Tipo</label>
        <select
          value={currentTipo}
          onChange={(e) => updateFilter("tipo", e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
        >
          <option value="">Todos los tipos</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">Jugadores</label>
        <select
          value={currentJugadores}
          onChange={(e) => updateFilter("jugadores", e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
        >
          <option value="">Cualquier cantidad</option>
          {JUGADORES_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">Duración</label>
        <select
          value={currentDuracion}
          onChange={(e) => updateFilter("duracion", e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
        >
          <option value="">Cualquier duración</option>
          {DURACION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-400">Categoría</label>
        <select
          value={currentCategoria}
          onChange={(e) => updateFilter("categoria", e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
