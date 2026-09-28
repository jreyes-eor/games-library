export type TipoJuego = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  imagen_url: string | null;
  created_at: string;
};

export type Categoria = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  created_at: string;
};

export type Juego = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  imagen_url: string | null;
  tipo_id: number;
  fecha_lanzamiento: string | null;
  edad_minima: number | null;
  jugadores_min: number | null;
  jugadores_max: number | null;
  duracion_min: number | null;
  duracion_max: number | null;
  valoracion: number | null;
  plataformas: string[] | null;
  desarrollador: string | null;
  created_at: string;
};

export type JuegoConTipo = Juego & {
  tipos_juego: TipoJuego;
};

export type JuegoConCategorias = Juego & {
  categorias: Categoria[];
};

export type JuegoCompleto = Juego & {
  tipos_juego: TipoJuego;
  categorias: Categoria[];
};

export type JuegoConTodo = Juego & {
  tipos_juego: TipoJuego;
  juego_categorias: { categorias: Categoria }[];
};

export type FiltrosJuego = {
  tipo?: string;
  jugadores?: string;
  duracion?: string;
  categoria?: string;
  busqueda?: string;
};

export type TipoJuegoConConteo = TipoJuego & {
  juegos_count: number;
};
