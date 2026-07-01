/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { Mail, CheckCircle2, Clock3, LoaderCircle, LogOut } from "lucide-react";

import { AppShell } from "../../components/layout/AppShell";
import { getCurrentSessionUser, signOut } from "../../hooks/useAuth";
import { getTasks } from "../../services/taskService";
import type { Task } from "../../types/task";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadData() {
      const currentUser = await getCurrentSessionUser();

      setUser(currentUser);

      if (currentUser) {
        const data = await getTasks();
        setTasks(data);
      }
    }

    loadData();
  }, []);

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pendiente").length;
  const progress = tasks.filter((t) => t.status === "En progreso").length;
  const completed = tasks.filter((t) => t.status === "Finalizada").length;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  async function handleLogout() {
    await signOut();
    window.location.href = "/dashboard";
  }

  return (
    <AppShell>
      <section className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">

        <div className="flex flex-col items-center">

          <img
            src={
              user?.user_metadata?.avatar_url ??
              "https://ui-avatars.com/api/?background=fbcfe8&color=db2777&name=User"
            }
            className="h-32 w-32 rounded-full border-4 border-pink-200"
            alt="avatar"
          />

          <h1 className="mt-5 text-3xl font-black">
            {user?.user_metadata?.full_name ?? "Invitada"}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-slate-500">
            <Mail size={18} />
            {user?.email ?? "No has iniciado sesión"}
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-bold text-white"
          >
            <LogOut className="mr-2 inline" size={18} />
            Cerrar sesión
          </button>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <article className="rounded-3xl bg-pink-50 p-6">
            <p className="text-sm font-bold text-pink-500">
              Total tareas
            </p>

            <h2 className="mt-3 text-5xl font-black">
              {total}
            </h2>
          </article>

          <article className="rounded-3xl bg-amber-50 p-6">
            <Clock3 className="text-amber-500" />

            <h2 className="mt-3 text-5xl font-black">
              {pending}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Pendientes
            </p>
          </article>

          <article className="rounded-3xl bg-sky-50 p-6">
            <LoaderCircle className="text-sky-500" />

            <h2 className="mt-3 text-5xl font-black">
              {progress}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              En progreso
            </p>
          </article>

          <article className="rounded-3xl bg-emerald-50 p-6">
            <CheckCircle2 className="text-emerald-500" />

            <h2 className="mt-3 text-5xl font-black">
              {completed}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Finalizadas
            </p>
          </article>

        </section>

        <section className="mt-10 rounded-3xl border border-pink-100 p-6">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">
              Progreso general
            </h2>

            <span className="font-black text-pink-500">
              {percentage}%
            </span>
          </div>

          <div className="mt-5 h-4 rounded-full bg-pink-100">

            <div
              className="h-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </section>

      </section>
    </AppShell>
  );
}