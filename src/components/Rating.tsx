export default function Rating({ value }: { value: number }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-xs ${
              i < full
                ? "text-amber-400"
                : i === full && hasHalf
                ? "text-amber-400/60"
                : "text-zinc-600"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs font-medium text-amber-400">{value.toFixed(1)}</span>
    </div>
  );
}
