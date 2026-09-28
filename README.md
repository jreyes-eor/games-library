# Game Library

Catálogo interactivo de juegos desarrollado con Next.js, TypeScript, Tailwind CSS y Supabase.

## Descripción del Proyecto

Game Library es una aplicación web que permite explorar, buscar y filtrar juegos de diferentes categorías:

- **Videojuegos**
- **Juegos de mesa**
- **Juegos de cartas**

### Características principales

- Exploración de juegos por tipo
- Búsqueda por nombre
- Filtros por jugadores, duración, tipo y categoría
- Vista detallada de cada juego
- Diseño responsive y moderno
- Loading states y manejo de errores

## Instalación Local

### Prerrequisitos

- Node.js 18+ instalado
- pnpm (recomendado) o npm
- Cuenta de Supabase

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd games-libray
```

2. **Instalar dependencias**

```bash
pnpm install
```

o con npm:

```bash
npm install
```

3. **Configurar Supabase**

Crear un proyecto en [Supabase](https://supabase.com) y ejecutar el script SQL ubicado en `supabase/schema.sql` para crear las tablas y datos iniciales.

4. **Configurar variables de entorno**

Crear un archivo `.env.local` en la raíz del proyecto (ver sección siguiente).

5. **Ejecutar el servidor de desarrollo**

```bash
pnpm dev
```

o con npm:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Obtener las credenciales

1. Ir a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navegar a **Project Overview**
3. Copiar:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Publisahble key** → `NEXT_PUBLIC_SUPABASE_PUBLISAHBLE_KEY`



## Estructura del Proyecto

```
src/
├── app/                    # Rutas de la aplicación
│   ├── juego/[slug]/      # Detalle de juego
│   ├── juegos/            # Catálogo
│   ├── tipo/[slug]/       # Juegos por tipo
│   └── tipos/             # Lista de tipos
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades, queries Y Types
```

## Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first
- **Supabase** - Base de datos PostgreSQL
- **React 19** - Librería UI
- **Vercel** - Despliegue

## Scripts Disponibles

```bash
pnpm dev       # Iniciar servidor de desarrollo
pnpm build     # Build para producción
pnpm start     # Iniciar servidor de producción
```
