import { notFound } from "next/navigation";
import { getJuegoBySlug, getAllJuegosSlugs } from "@/lib/queries";
import CategoryBadge from "@/components/CategoryBadge";
import Rating from "@/components/Rating";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const juegos = await getAllJuegosSlugs();
  return juegos.map((juego) => ({
    slug: juego.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const juego = await getJuegoBySlug(slug);
  if (!juego) return { title: "Juego no encontrado — Game Library" };
  return {
    title: `${juego.nombre} — Game Library`,
    description: juego.descripcion ?? `Detalle del juego ${juego.nombre}`,
  };
}

export default async function JuegoDetallePage({ params }: Props) {
  const { slug } = await params;
  const juego = await getJuegoBySlug(slug);

  if (!juego) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/5">
            <div className="aspect-[4/3] bg-zinc-800 lg:aspect-auto lg:h-full">
              {juego.imagen_url ? (
                <Image
                  src={juego.imagen_url}
                  alt={juego.nombre}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[240px] items-center justify-center text-6xl text-zinc-600">
                  🎮
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/tipo/${juego.tipos_juego?.slug}`}
                className="rounded-md bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white hover:bg-indigo-500"
              >
                {juego.tipos_juego?.nombre}
              </Link>
              {juego.categorias?.map((cat) => (
                <CategoryBadge key={cat.id} nombre={cat.nombre} />
              ))}
            </div>

            <h1 className="text-3xl font-bold text-white">{juego.nombre}</h1>

            {juego.valoracion && <Rating value={juego.valoracion} />}

            {juego.descripcion && (
              <p className="text-zinc-300 leading-relaxed">{juego.descripcion}</p>
            )}

            <div className="mt-2 grid grid-cols-3 gap-4">
              {juego.edad_minima && (
                <InfoItem label="Edad mínima" value={`${juego.edad_minima}+`} />
              )}
              {juego.jugadores_min && (
                <InfoItem
                  label="Jugadores"
                  value={
                    juego.jugadores_max
                      ? `${juego.jugadores_min}-${juego.jugadores_max}`
                      : `${juego.jugadores_min}+`
                  }
                />
              )}
              {juego.duracion_min && (
                <InfoItem
                  label="Duración"
                  value={
                    juego.duracion_max
                      ? `${juego.duracion_min}-${juego.duracion_max} min`
                      : `${juego.duracion_min}+ min`
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}
