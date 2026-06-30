import { AppShell } from "../../components/layout/AppShell";

export default function TasksPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
        <p className="font-bold text-pink-500">Tareas</p>
        <h1 className="mt-2 text-4xl font-black">Mis tareas</h1>
        <p className="mt-3 text-slate-500">
          Vista general para administrar tus tareas, prioridades y estados.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Pendientes", "En progreso", "Finalizadas"].map((title) => (
            <article
              key={title}
              className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-5"
            >
              <h2 className="font-black text-slate-800">{title}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Próximamente se mostrarán acá las tareas agrupadas por estado.
              </p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}