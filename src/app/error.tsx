"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl">⚠️</span>
      <h2 className="mt-4 text-xl font-semibold text-white">Algo salió mal</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Ha ocurrido un error al cargar el contenido.
      </p>
      <button
        onClick={retry}
        className="mt-6 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
