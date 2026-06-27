import { ArrowRight, BarChart3, Check, Circle, ListChecks, Play, Sparkles } from "lucide-react";

export default function Home() {
  const tasks = [
    ["Preparar entrevista técnica", "Trabajo", "Alta"],
    ["Documentar decisiones del README", "Proyecto", "Media"],
    ["Validar flujo de login", "QA", "Alta"],
    ["Deploy en Vercel", "DevOps", "Media"],
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9FB] text-slate-950">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-pink-100 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-pink-50 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-200">
              <Check size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Priora</span>
          </div>

          <button className="rounded-2xl border border-pink-100 bg-white px-6 py-3 text-sm font-semibold text-pink-500 shadow-md shadow-pink-100 hover:bg-pink-50">
            Iniciar sesión
          </button>
        </nav>

        <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-2">
          <section>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-5 py-3 text-sm font-bold text-pink-500 shadow-md shadow-pink-100">
              <Sparkles size={17} />
              AI Productivity Workspace
            </div>

            <h1 className="max-w-2xl text-5xl font-black tracking-tight md:text-7xl">
              Organizá tus tareas con{" "}
              <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
                prioridad inteligente.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Priora te ayuda a planificar, priorizar y avanzar en tu trabajo
              diario con asistencia de inteligencia artificial.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-pink-200 hover:opacity-95">
                Comenzar ahora
                <ArrowRight size={18} />
              </button>

              <button className="inline-flex items-center justify-center gap-3 rounded-2xl border border-pink-100 bg-white px-7 py-4 text-sm font-bold text-pink-500 shadow-md shadow-pink-100 hover:bg-pink-50">
                <Play size={17} fill="currentColor" />
                Ver demo
              </button>
            </div>

            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
              {[
                [Sparkles, "Prioridades inteligentes"],
                [ListChecks, "Todo tu trabajo en un solo lugar"],
                [BarChart3, "Seguimiento y progreso"],
              ].map(([Icon, text]) => (
                <div key={text as string}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-500 shadow-sm">
                    <Icon size={22} />
                  </div>
                  <p className="text-sm font-semibold leading-6 text-slate-600">
                    {text as string}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-pink-100 bg-white/90 p-6 shadow-2xl shadow-pink-100 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-bold text-pink-500">Dashboard</p>
                <h2 className="text-3xl font-black">Hoy 👋</h2>
              </div>

              <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-black text-pink-500">
                8 tareas
              </div>
            </div>

            <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["12", "Total"],
                ["4", "Pendientes"],
                ["3", "En progreso"],
                ["5", "Finalizadas"],
              ].map(([number, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
                >
                  <p className="text-2xl font-black">{number}</p>
                  <p className="mt-1 text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-black">Tareas recientes</h3>
              <button className="text-sm font-bold text-pink-500">
                Ver todas →
              </button>
            </div>

            <div className="grid gap-3">
              {tasks.map(([title, category, priority]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <Circle size={18} className="text-pink-400" />
                    <div>
                      <h4 className="font-bold">{title}</h4>
                      <p className="text-sm text-slate-500">{category}</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black text-pink-500">
                    {priority}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-400 p-5 text-white shadow-lg shadow-pink-200">
              <div className="flex items-center gap-2 text-lg font-black">
                <Sparkles size={20} />
                Sugerencia IA
              </div>
              <p className="mt-2 text-sm leading-6 text-pink-50">
                Esta semana conviene priorizar las tareas relacionadas al deploy
                y la documentación del proyecto.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}