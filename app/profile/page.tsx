"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Flame,
  LoaderCircle,
  Mail,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { AppShell } from "../../components/layout/AppShell";
import { getCurrentSessionUser } from "../../hooks/useAuth";
import { getTasks } from "../../services/taskService";
import type { Task } from "../../types/task";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadProfile() {
      const currentUser = await getCurrentSessionUser();
      setUser(currentUser);

      if (currentUser) {
        const data = await getTasks();
        setTasks(data);
      }
    }

    loadProfile();
  }, []);

  const total = tasks.length;
  const pending = tasks.filter((task) => task.status === "Pendiente").length;
  const inProgress = tasks.filter((task) => task.status === "En progreso").length;
  const done = tasks.filter((task) => task.status === "Finalizada").length;
  const highPriority = tasks.filter((task) => task.priority === "Alta").length;
  const percentage = total === 0 ? 0 : Math.round((done / total) * 100);
  

  const favoriteCategory =
    tasks.length === 0
      ? "Sin datos"
      : Object.entries(
          tasks.reduce<Record<string, number>>((acc, task) => {
            acc[task.category] = (acc[task.category] || 0) + 1;
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1])[0]?.[0] || "Sin datos";

  const productivityLevel =
    percentage === 100
      ? "Excelente"
      : percentage >= 70
        ? "Muy bueno"
        : percentage >= 40
          ? "En progreso"
          : "Inicial";

  const userName = user?.user_metadata?.full_name || "Invitada";
  const userEmail = user?.email || "Sin sesión iniciada";
  const userAvatar = user?.user_metadata?.avatar_url;

  return (
    <AppShell>
      <section className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-5">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="h-24 w-24 rounded-3xl object-cover shadow-lg shadow-pink-100"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-pink-100 text-4xl font-black text-pink-500">
                {userName.charAt(0)}
              </div>
            )}

            <div>
              <p className="font-bold text-pink-500">Perfil</p>
              <h1 className="mt-1 text-4xl font-black">{userName}</h1>
              <p className="mt-2 flex items-center gap-2 text-slate-500">
                <Mail size={17} />
                {userEmail}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-4 text-white shadow-lg shadow-pink-200">
            <p className="text-sm font-bold text-pink-50">Nivel Priora</p>
            <p className="text-2xl font-black">{productivityLevel}</p>
          </div>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
            <Target className="text-pink-500" />
            <p className="mt-4 text-sm font-bold text-slate-500">Total tareas</p>
            <h2 className="mt-2 text-5xl font-black">{total}</h2>
          </article>

          <article className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
            <Clock3 className="text-amber-500" />
            <p className="mt-4 text-sm font-bold text-slate-500">Pendientes</p>
            <h2 className="mt-2 text-5xl font-black">{pending}</h2>
          </article>

          <article className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
            <LoaderCircle className="text-sky-500" />
            <p className="mt-4 text-sm font-bold text-slate-500">En progreso</p>
            <h2 className="mt-2 text-5xl font-black">{inProgress}</h2>
          </article>

          <article className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
            <CheckCircle2 className="text-emerald-500" />
            <p className="mt-4 text-sm font-bold text-slate-500">Finalizadas</p>
            <h2 className="mt-2 text-5xl font-black">{done}</h2>
          </article>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
            <Flame className="text-rose-500" />
            <p className="mt-4 text-sm font-bold text-slate-500">
              Alta prioridad
            </p>
            <h2 className="mt-2 text-4xl font-black">{highPriority}</h2>
          </article>

          <article className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
            <Trophy className="text-pink-500" />
            <p className="mt-4 text-sm font-bold text-slate-500">
              Categoría más usada
            </p>
            <h2 className="mt-2 text-3xl font-black">{favoriteCategory}</h2>
          </article>

          <article className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
            <Zap className="text-amber-500" />
            <p className="mt-4 text-sm font-bold text-slate-500">
              Efectividad
            </p>
            <h2 className="mt-2 text-4xl font-black">{percentage}%</h2>
          </article>
        </section>
        <section className="mt-8 rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
  <h2 className="text-2xl font-black">Logros</h2>
  <p className="mt-2 text-sm text-slate-500">
    Reconocimientos generados según tu actividad en Priora.
  </p>

  <div className="mt-5 grid gap-4 md:grid-cols-4">
    {[
      ["🏁", "Primer paso", total > 0 ? "Desbloqueado" : "Creá tu primera tarea"],
      ["🔥", "Alta prioridad", highPriority > 0 ? "Desbloqueado" : "Sin tareas altas"],
      ["✅", "Productividad", done > 0 ? "Desbloqueado" : "Completá una tarea"],
      ["🎯", "Constancia", percentage >= 70 ? "Desbloqueado" : "Llegá al 70%"],
    ].map(([icon, title, text]) => (
      <article
        key={title}
        className="rounded-2xl border border-pink-100 bg-white p-4"
      >
        <p className="text-3xl">{icon}</p>
        <h3 className="mt-3 font-black">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{text}</p>
      </article>
    ))}
  </div>
</section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
          <article className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Progreso general</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Medí tu avance según las tareas finalizadas.
                </p>
              </div>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-pink-500">
                {percentage}%
              </span>
            </div>

            <div className="mt-6 h-4 rounded-full bg-white">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </article>

          <article className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-400 p-6 text-white shadow-lg shadow-pink-200">
            <div className="flex items-center gap-2 text-lg font-black">
              <Sparkles size={20} />
              Insight Priora
            </div>
            <p className="mt-3 text-sm leading-6 text-pink-50">
              {total === 0
                ? "Todavía no cargaste tareas. Creá la primera desde el dashboard."
                : percentage >= 70
                  ? "Tu productividad viene muy bien. Seguí cerrando tareas pendientes."
                  : highPriority > 0
                    ? "Tenés tareas de prioridad alta. Conviene resolverlas primero."
                    : "Tu carga está bastante equilibrada. Podés avanzar por estado o categoría."}
            </p>
          </article>
        </section>
      </section>
    </AppShell>
  );
}