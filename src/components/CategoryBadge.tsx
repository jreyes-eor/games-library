export default function CategoryBadge({ nombre }: { nombre: string }) {
  return (
    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
      {nombre}
    </span>
  );
}
