import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { FiltrosJuego, JuegoCompleto, TipoJuegoConConteo, Categoria, Juego } from "@/lib/types";

type JuegoRaw = Juego & {
  tipos_juego: { id: number; nombre: string; slug: string; descripcion: string | null; imagen_url: string | null; created_at: string; juegos?: { id: number }[] };
  juego_categorias?: { categorias: Categoria }[];
};

function mapJuego(juego: JuegoRaw): JuegoCompleto {
  return {
    ...juego,
    tipos_juego: { ...juego.tipos_juego, juegos: undefined },
    categorias: juego.juego_categorias?.map((jc) => jc.categorias) ?? [],
    juego_categorias: undefined,
  } as JuegoCompleto;
}

export const getTiposJuego = cache(async (): Promise<TipoJuegoConConteo[]> => {
  const { data, error } = await supabase
    .from("tipos_juego")
    .select("*, juegos(id)")
    .order("nombre");

  if (error) throw new Error(error.message);

  return (data ?? []).map((t) => ({
    ...t,
    juegos_count: t.juegos?.length ?? 0,
    juegos: undefined,
  }));
});

export const getTipoBySlug = cache(async (slug: string) => {
  const { data, error } = await supabase
    .from("tipos_juego")
    .select("*, juegos(id)")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    ...data,
    juegos_count: data.juegos?.length ?? 0,
    juegos: undefined,
  } as TipoJuegoConConteo;
});

export const getCategorias = cache(async (): Promise<Categoria[]> => {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre");

  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getJuegos = cache(async (filtros?: FiltrosJuego): Promise<JuegoCompleto[]> => {
  let query = supabase
    .from("juegos")
    .select("*, tipos_juego(*, juegos(id)), juego_categorias(categorias(*))")
    .order("nombre");

  if (filtros?.busqueda) {
    query = query.ilike("nombre", `%${filtros.busqueda}%`);
  }

  if (filtros?.tipo) {
    query = query.eq("tipo_id", parseInt(filtros.tipo));
  }

  if (filtros?.jugadores) {
    const j = filtros.jugadores;
    if (j === "1") {
      query = query.lte("jugadores_min", 1);
    } else if (j === "2") {
      query = query.lte("jugadores_min", 2).or("jugadores_max.gte.2,jugadores_max.is.null");
    } else if (j === "3-4") {
      query = query.lte("jugadores_min", 4).or("jugadores_max.gte.3,jugadores_max.is.null");
    } else if (j === "5+") {
      query = query.or("jugadores_max.gte.5,jugadores_max.is.null");
    }
  }

  if (filtros?.duracion) {
    const d = filtros.duracion;
    if (d === "menos-30") {
      query = query.lte("duracion_min", 30);
    } else if (d === "30-60") {
      query = query.lte("duracion_min", 60).or("duracion_max.gte.30,duracion_max.is.null");
    } else if (d === "1-2h") {
      query = query.lte("duracion_min", 120).or("duracion_max.gte.60,duracion_max.is.null");
    } else if (d === "mas-2h") {
      query = query.or("duracion_max.gte.120,duracion_max.is.null");
    }
  }

  if (filtros?.categoria) {
    query = query.in(
      "id",
      (
        await supabase
          .from("juego_categorias")
          .select("juego_id")
          .eq("categoria_id", parseInt(filtros.categoria))
      ).data?.map((r) => r.juego_id) ?? []
    );
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data ?? []).map(mapJuego);
});

export const getJuegoBySlug = cache(async (slug: string): Promise<JuegoCompleto | null> => {
  const { data, error } = await supabase
    .from("juegos")
    .select("*, tipos_juego(*, juegos(id)), juego_categorias(categorias(*))")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return mapJuego(data);
});

export const getJuegosPorTipo = cache(async (tipoSlug: string): Promise<JuegoCompleto[]> => {
  const { data: tipo, error: tipoError } = await supabase
    .from("tipos_juego")
    .select("id")
    .eq("slug", tipoSlug)
    .single();

  if (tipoError || !tipo) return [];

  const { data, error } = await supabase
    .from("juegos")
    .select("*, tipos_juego(*, juegos(id)), juego_categorias(categorias(*))")
    .eq("tipo_id", tipo.id)
    .order("nombre");

  if (error) throw new Error(error.message);

  return (data ?? []).map(mapJuego);
});

export const getJuegosDestacados = cache(async (): Promise<JuegoCompleto[]> => {
  const { data, error } = await supabase
    .from("juegos")
    .select("*, tipos_juego(*, juegos(id)), juego_categorias(categorias(*))")
    .order("valoracion", { ascending: false, nullsFirst: false })
    .limit(4);

  if (error) throw new Error(error.message);

  return (data ?? []).map(mapJuego);
});

export const getJuegosPopulares = cache(async (): Promise<JuegoCompleto[]> => {
  const { data, error } = await supabase
    .from("juegos")
    .select("*, tipos_juego(*, juegos(id)), juego_categorias(categorias(*))")
    .order("valoracion", { ascending: false, nullsFirst: false })
    .range(4, 7);

  if (error) throw new Error(error.message);

  return (data ?? []).map(mapJuego);
});

export const getAllJuegosSlugs = cache(async (): Promise<{ slug: string }[]> => {
  const { data, error } = await supabase
    .from("juegos")
    .select("slug");

  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getAllTiposSlugs = cache(async (): Promise<{ slug: string }[]> => {
  const { data, error } = await supabase
    .from("tipos_juego")
    .select("slug");

  if (error) throw new Error(error.message);
  return data ?? [];
});

export const buscarJuegos = cache(async (params: {
  jugadores?: number;
  duracion_min?: number;
  tipo_id?: number;
}): Promise<JuegoCompleto[]> => {
  let query = supabase
    .from("juegos")
    .select("*, tipos_juego(*, juegos(id)), juego_categorias(categorias(*))")
    .order("valoracion", { ascending: false, nullsFirst: false });

  if (params.jugadores) {
    query = query.lte("jugadores_min", params.jugadores);
  }

  if (params.duracion_min) {
    query = query.lte("duracion_min", params.duracion_min);
  }

  if (params.tipo_id) {
    query = query.eq("tipo_id", params.tipo_id);
  }

  const { data, error } = await query.limit(12);
  if (error) throw new Error(error.message);

  return (data ?? []).map(mapJuego);
});
