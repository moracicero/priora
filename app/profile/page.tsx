import { AppShell } from "../../components/layout/AppShell";

export default function ProfilePage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
        <p className="font-bold text-pink-500">Perfil</p>
        <h1 className="mt-2 text-4xl font-black">Mi perfil</h1>
        <p className="mt-3 text-slate-500">
          Espacio para visualizar información del usuario, métricas personales y preferencias.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["📋", "Tareas", "Gestioná tu productividad"],
            ["🔥", "Progreso", "Medí tu avance semanal"],
            ["⚡", "Prioridad", "Detectá tareas importantes"],
            ["✨", "IA", "Recibí sugerencias inteligentes"],
          ].map(([icon, title, text]) => (
            <article
              key={title}
              className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-5"
            >
              <p className="text-3xl">{icon}</p>
              <h2 className="mt-3 font-black">{title}</h2>
              <p className="mt-1 text-sm text-slate-500">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}