import { Sparkles } from "lucide-react";

export function AIWidget() {
  return (
    <article className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-400 p-6 text-white shadow-lg shadow-pink-200">
      <div className="flex items-center gap-2 text-lg font-black">
        <Sparkles size={20} />
        Sugerencia IA
      </div>

      <p className="mt-3 text-sm leading-6 text-pink-50">
        Te recomiendo empezar por las tareas de prioridad alta y cerrar primero
        el flujo de login antes del deploy.
      </p>
    </article>
  );
}