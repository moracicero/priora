import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  LayoutDashboard,
  LogOut,
  Plus,
  Sparkles,
  User,
} from "lucide-react";

export default function DashboardPage() {
  const tasks = [
    ["Preparar entrevista técnica", "Trabajo", "Alta", "Pendiente"],
    ["Documentar README", "Proyecto", "Media", "En progreso"],
    ["Validar flujo de login", "QA", "Alta", "Pendiente"],
    ["Deploy en Vercel", "DevOps", "Media", "Finalizada"],
  ];

  return (
    <main className="min-h-screen bg-[#FFF9FB] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-pink-100 bg-white/80 p-6 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white">
              ✓
            </div>
            <span className="text-2xl font-black">Priora</span>
          </div>

          <nav className="mt-10 space-y-2">
            <button className="flex w-full items-center gap-3 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-bold text-pink-500">
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-pink-50 hover:text-pink-500">
              <CheckCircle2 size={18} />
              Tareas
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-pink-50 hover:text-pink-500">
              <User size={18} />
              Perfil
            </button>
          </nav>

          <button className="mt-10 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-pink-50 hover:text-pink-500">
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </aside>

        <section className="p-6 lg:p-10">
          <header className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="font-bold text-pink-500">Dashboard</p>
              <h1 className="mt-1 text-4xl font-black">Hola, Mora 👋</h1>
              <p className="mt-2 text-slate-500">
                Acá tenés el resumen de tu productividad de hoy.
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200">
              <Plus size={18} />
              Nueva tarea
            </button>
          </header>

          <section className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              [BarChart3, "12", "Total"],
              [Clock3, "4", "Pendientes"],
              [CalendarDays, "3", "En progreso"],
              [CheckCircle2, "5", "Finalizadas"],
            ].map(([Icon, number, label]) => (
              <article
                key={label as string}
                className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                  <Icon size={21} />
                </div>
                <p className="text-3xl font-black">{number as string}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {label as string}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
            <article className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black">Tareas recientes</h2>
                  <p className="text-sm text-slate-500">
                    Últimas tareas cargadas en tu workspace.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                {tasks.map(([title, category, priority, status]) => (
                  <div
                    key={title}
                    className="flex flex-col justify-between gap-3 rounded-2xl border border-pink-100 bg-[#FFF9FB] p-4 md:flex-row md:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <Circle size={18} className="text-pink-400" />
                      <div>
                        <h3 className="font-bold">{title}</h3>
                        <p className="text-sm text-slate-500">{category}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-pink-500">
                        {priority}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500">
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <aside className="space-y-6">
              <article className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-400 p-6 text-white shadow-lg shadow-pink-200">
                <div className="flex items-center gap-2 text-lg font-black">
                  <Sparkles size={20} />
                  Sugerencia IA
                </div>
                <p className="mt-3 text-sm leading-6 text-pink-50">
                  Te recomiendo empezar por las tareas de prioridad alta y
                  cerrar primero el flujo de login antes del deploy.
                </p>
              </article>

              <article className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black">Progreso semanal</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Completaste el 64% de tus tareas esta semana.
                </p>

                <div className="mt-5 h-3 rounded-full bg-pink-50">
                  <div className="h-3 w-[64%] rounded-full bg-gradient-to-r from-pink-500 to-rose-400" />
                </div>
              </article>
            </aside>
          </section>
        </section>
      </div>
    </main>
  );
}