import { notFound } from "next/navigation";
import { getTipoBySlug, getJuegosPorTipo, getAllTiposSlugs } from "@/lib/queries";
import GameGrid from "@/components/GameGrid";
import Image from "next/image";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const tipos = await getAllTiposSlugs();
  return tipos.map((tipo) => ({
    slug: tipo.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tipo = await getTipoBySlug(slug);
  if (!tipo) return { title: "Tipo no encontrado — Game Library" };
  return {
    title: `${tipo.nombre} — Game Library`,
    description: tipo.descripcion ?? `Juegos de tipo ${tipo.nombre}`,
  };
}

export default async function TipoPage({ params }: Props) {
  const { slug } = await params;
  const tipo = await getTipoBySlug(slug);

  if (!tipo) notFound();

  const juegos = await getJuegosPorTipo(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        {tipo.imagen_url && (
          <Image
            src={tipo.imagen_url}
            alt={tipo.nombre}
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-white">{tipo.nombre}</h1>
          {tipo.descripcion && (
            <p className="mt-1 text-zinc-400">{tipo.descripcion}</p>
          )}
          <p className="mt-1 text-sm text-zinc-500">
            {tipo.juegos_count} {tipo.juegos_count === 1 ? "juego" : "juegos"}
          </p>
        </div>
      </div>

      <GameGrid juegos={juegos} />
    </div>
  );
}
