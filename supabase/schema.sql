-- ============================================================
-- Game Library — Schema + Seed Data
-- Generado automáticamente desde Supabase
-- ============================================================

-- 1. Tipos de juego
CREATE TABLE tipos_juego (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  imagen_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categorías
CREATE TABLE categorias (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Juegos
CREATE TABLE juegos (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  imagen_url TEXT,
  tipo_id BIGINT NOT NULL REFERENCES tipos_juego(id),
  fecha_lanzamiento DATE,
  edad_minima INT,
  jugadores_min INT,
  jugadores_max INT,
  duracion_min INT,
  duracion_max INT,
  valoracion NUMERIC(2,1) CHECK (valoracion >= 0 AND valoracion <= 5),
  plataformas TEXT[],
  desarrollador TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Relación muchos-a-muchos juegos <-> categorías
CREATE TABLE juego_categorias (
  juego_id BIGINT NOT NULL REFERENCES juegos(id) ON DELETE CASCADE,
  categoria_id BIGINT NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
  PRIMARY KEY (juego_id, categoria_id)
);

-- Índices
CREATE INDEX idx_juegos_tipo ON juegos(tipo_id);
CREATE INDEX idx_juegos_slug ON juegos(slug);
CREATE INDEX idx_juegos_valoracion ON juegos(valoracion DESC);
CREATE INDEX idx_juego_categorias_categoria ON juego_categorias(categoria_id);


-- ============================================================
-- ENABLE RLS
-- ============================================================
ALTER TABLE	public.tipos_juego ENABLE ROW LEVEL SECURITY;
ALTER TABLE	public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE	public.juegos ENABLE ROW LEVEL SECURITY;
ALTER TABLE	public.juego_categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de tipos_juego"
ON public.tipos_juego FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Lectura pública de categorias"
ON public.categorias FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Lectura pública de juegos"
ON public.juegos FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Lectura pública de juego_categorias"
ON public.juego_categorias FOR SELECT
TO anon, authenticated
USING (true);


-- ============================================================
-- SEED DATA
-- ============================================================

-- Tipos de juego
INSERT INTO tipos_juego (nombre, slug, descripcion, imagen_url) VALUES
  ('Videojuego', 'videojuegos', 'Juegos electrónicos que se ejecutan en consolas, computadoras o dispositivos móviles.', 'https://catnessgames.com/wp-content/uploads/2024/12/tipos-videojuegos-consolas-y-plataformas.jpg'),
  ('Juego de mesa', 'juegos-de-mesa', 'Juegos físicos que se juegan sobre una superficie utilizando piezas, tableros y fichas.', 'https://imagenes.hobbyconsolas.com/files/image_640_360/uploads/imagenes/2024/04/26/6903abaaceacb.jpeg'),
  ('Juego de cartas', 'juegos-de-cartas', 'Juegos que utilizan barajas de cartas como componente principal.', 'https://s1.ppllstatics.com/diariosur/www/multimedia/202207/01/media/cortadas/juegosmesa2-kPXF-U170589899898jvG-1248x770@Diario%20Sur.jpg');

-- Categorías
INSERT INTO categorias (nombre, slug, descripcion) VALUES
  ('Sandbox', 'sandbox', 'Mundos abiertos donde el jugador tiene libertad total de acción.'),
  ('Supervivencia', 'supervivencia', 'El objetivo es sobrevivir en un entorno hostil.'),
  ('Multijugador', 'multijugador', 'Diseñados para jugarse con múltiples jugadores.'),
  ('Estrategia', 'estrategia', 'Requieren planificación y toma de decisiones tácticas.'),
  ('Familiar', 'familiar', 'Adecuados para todas las edades y fáciles de aprender.'),
  ('Aventura', 'aventura', 'Enfocados en la exploración y la narrativa.'),
  ('Acción', 'accion', 'Gameplay rápido con reflejos y combate.'),
  ('Puzzle', 'puzzle', 'Desafíos de lógica y resolución de problemas.'),
  ('Cartas', 'cartas', 'Juegos basados en el uso de barajas de cartas.'),
  ('Coleccionismo', 'coleccionismo', 'Involucran coleccionar e intercambiar cartas o elementos.'),
  ('Competitivo', 'competitivo', 'Enfocados en la competición entre jugadores.'),
  ('Rol', 'rol', 'Interpretación de personajes y narrativa colaborativa.'),
  ('Fantasía', 'fantasia', 'Ambientados en mundos fantásticos con magia y criaturas.'),
  ('Narrativo', 'narrativo', 'La historia y la narrativa son el eje central.'),
  ('Cooperativo', 'cooperativo', 'Los jugadores trabajan juntos hacia un objetivo común.'),
  ('Territorio', 'territorio', 'El objetivo es conquistar o controlar territorio.'),
  ('Economía', 'economia', 'Gestión de recursos y economía como mecánica principal.'),
  ('Plataformas', 'plataformas', 'Saltar entre plataformas es la mecánica principal.'),
  ('Granja', 'granja', 'Gestión de granjas, cultivos y vida rural.'),
  ('Roguelike', 'roguelike', 'Dungeon crawling con muerte permanente y generación procedural.');

-- Juegos
INSERT INTO juegos (nombre, slug, descripcion, imagen_url, tipo_id, fecha_lanzamiento, edad_minima, jugadores_min, jugadores_max, duracion_min, duracion_max, valoracion, plataformas, desarrollador) VALUES
  ('Minecraft', 'minecraft', 'Un juego sandbox donde puedes construir, explorar y sobrevivir en un mundo generado proceduralmente con bloques.', 'https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Minecraft%20_Holiday_Game_Drop_2025_OV-PMP_1280x720.jpg', 1, '2011-11-18', 7, 1, NULL, NULL, NULL, 4.8, ARRAY['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'], 'Mojang Studios'),
  ('The Legend of Zelda: Breath of the Wild', 'zelda-breath-of-the-wild', 'Una aventura de mundo abierto donde Link explora los vastos paisajes de Hyrule tras despertar de un sueño de 100 años.', 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/store/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58', 1, '2017-03-03', 12, 1, 1, NULL, NULL, 4.9, ARRAY['Nintendo Switch', 'Wii U'], 'Nintendo EPD'),
  ('Super Mario Odyssey', 'super-mario-odyssey', 'Mario viaja por reinos fantásticos capturando y usando las habilidades de diversos personajes para rescatar a la Princesa Peach.', 'https://cdn.wccftech.com/wp-content/uploads/2017/04/Nintendo-FY-2016-03-Super-Mario-Odyssey-1920x960.jpg', 1, '2017-10-27', 7, 1, 2, 120, 300, 4.7, ARRAY['Nintendo Switch'], 'Nintendo EPD'),
  ('Stardew Valley', 'stardew-valley', 'Heredas la vieja granja de tu abuelo y comienzas una nueva vida en el pueblo de Pelican Town. Cultiva, cría animales y haz amigos.', 'https://gaming-cdn.com/images/news/articles/5980/cover/stardew-valley-includes-new-mining-and-fishing-features-with-patch-1-6-4-cover662233115665e.jpg', 1, '2016-02-26', 7, 1, 4, NULL, NULL, 4.9, ARRAY['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'], 'ConcernedApe'),
  ('Portal 2', 'portal-2', 'Un puzzle de acción en primera persona donde usas un dispositivo de portales para resolver acertijos cada vez más complejos.', 'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000050313/75484f73fedd25cb830c5d93fbb3fca643a5ec0b09df2815291ead880bc7d6b1', 1, '2011-04-19', 10, 1, 2, 480, 720, 4.8, ARRAY['PC', 'PlayStation', 'Xbox'], 'Valve'),
  ('Catan', 'catan', 'Un juego de estrategia donde construyes asentamientos, ciudades y carreteras en la isla de Catan comerciando con recursos.', 'https://juegosdemesayrol.com/wp-content/uploads/Catan_2.jpg', 2, '1995-01-01', 10, 3, 4, 60, 120, 4.6, NULL, 'Kosmos / Mayfair Games'),
  ('Carcassonne', 'carcassonne', 'Un juego de colocación de losetas donde construyes ciudades, caminos y monasterios en el sur de Francia medieval.', 'https://imaginaire.com/docs/0681706781006.JPG', 2, '2000-01-01', 7, 2, 5, 30, 45, 4.5, NULL, 'Hans im Glück'),
  ('Ticket to Ride', 'ticket-to-ride', 'Construye rutas de tren a través de un mapa de Norteamérica conectando ciudades y completando boletos de destino.', 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_TicketToRide_GBen_image1600w.jpg', 2, '2004-01-01', 8, 2, 5, 30, 60, 4.5, NULL, 'Days of Wonder'),
  ('Monopoly', 'monopoly', 'El clásico juego de compra y venta de propiedades. Lleva a tus oponentes a la bancarrota mientras acumulas riqueza.', 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70010000069639/8248e2edec2e8c106a26cb174fd4ae108207cf21ffd6012704f60ef5540cb79c', 2, '1935-01-01', 8, 2, 8, 60, 180, 4.2, NULL, 'Hasbro'),
  ('Risk', 'risk', 'Un juego de conquista mundial donde mueves ejércitos por los continentes intentando dominar el mundo.', 'https://www.magisnet.com/wp-content/uploads/2023/08/Risk-Sociales.jpg', 2, '1957-01-01', 10, 2, 6, 120, 240, 4.1, NULL, 'Hasbro / Avalon Hill'),
  ('UNO', 'uno', 'El clásico juego de cartas donde debes ser el primero en quedarte sin cartas usando cartas de acción especiales.', 'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000034088/ac97854c142c719f8ae843106d43511db61822eb9bdb78e2c1a98ea0ae3b6c08', 3, '1971-01-01', 7, 2, 10, 15, 30, 4.4, NULL, 'Mattel'),
  ('Pokémon TCG', 'pokemon-tcg', 'Un juego de cartas coleccionables donde entrenas Pokémon para batallar contra otros entrenadores.', 'https://pokeflip.com/cdn/shop/articles/Ontwerp_zonder_titel_-_2021-06-23T174108.270.jpg?v=1715009318', 3, '1996-10-20', 6, 2, 2, 20, 60, 4.5, NULL, 'The Pokémon Company'),
  ('Magic: The Gathering', 'magic-the-gathering', 'El juego de cartas coleccionables original. Construye mazos con más de 20,000 cartas únicas y desafía a otros planeswalkers.', 'https://m.media-amazon.com/images/I/81Rid3JxxmL._AC_UF1000,1000_QL80_.jpg', 3, '1993-08-05', 13, 2, 6, 20, 60, 4.7, NULL, 'Wizards of the Coast'),
  ('Yu-Gi-Oh!', 'yu-gi-oh', 'Un juego de cartas basado en el anime donde invocas monstruos, lanzas hechizos y atrapas trampas para derrotar a tu oponente.', 'https://larepublica.cronosmedia.glr.pe/original/2022/04/09/6251ece750944b184e0af862.jpg', 3, '1999-01-01', 8, 2, 2, 15, 45, 4.3, NULL, 'Konami'),
  ('Exploding Kittens', 'exploding-kittens', 'Un juego de cartas hilarante y estratégico donde evitas gatitos explosivos mientras saboteas a tus amigos.', 'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000029283/8a97e3725f288c7d3a58710ed371ee9188ce9724e24da3f5134c7b727c03a36f', 3, '2015-01-01', 7, 2, 5, 10, 20, 4.3, NULL, 'Exploding Kittens LLC');

-- Relaciones juego-categoría
INSERT INTO juego_categorias (juego_id, categoria_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 1),
  (2, 6),
  (2, 7),
  (3, 6),
  (3, 7),
  (3, 18),
  (4, 1),
  (4, 3),
  (4, 19),
  (5, 3),
  (5, 7),
  (5, 8),
  (6, 4),
  (6, 5),
  (6, 17),
  (7, 4),
  (7, 5),
  (7, 16),
  (8, 4),
  (8, 5),
  (8, 16),
  (9, 4),
  (9, 5),
  (9, 17),
  (10, 4),
  (10, 11),
  (10, 16),
  (11, 5),
  (11, 9),
  (11, 11),
  (12, 9),
  (12, 10),
  (12, 11),
  (13, 4),
  (13, 9),
  (13, 10),
  (14, 9),
  (14, 10),
  (14, 11),
  (15, 5),
  (15, 9),
  (15, 11);
