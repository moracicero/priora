"use client";
import {
  CheckCircle2,
  LayoutDashboard,
  LogOut,
  Plus,
  User,
} from "lucide-react";

import { AIWidget } from "@/components/dashboard/AIWidget";
import { StatsCards } from "@/components/dashboard/StatsCards"; 
import { TaskList } from "@/components/dashboard/TaskList";
import type { Task } from "../../types/task";
import { useState } from "react";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Preparar entrevista técnica",
    category: "Trabajo",
    priority: "Alta",
    status: "Pendiente",
  },
  {
    id: "2",
    title: "Documentar README",
    category: "Proyecto",
    priority: "Media",
    status: "En progreso",
  },
  {
    id: "3",
    title: "Validar flujo de login",
    category: "QA",
    priority: "Alta",
    status: "Pendiente",
  },
  {
    id: "4",
    title: "Deploy en Vercel",
    category: "DevOps",
    priority: "Media",
    status: "Finalizada",
  },
];

export default function DashboardPage() {
    const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleCreateTask() {
    if (!taskTitle.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      category: "General",
      priority: "Media",
      status: "Pendiente",
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle("");
  }
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
          <section className="mt-8 rounded-3xl border border-pink-100 bg-white p-5 shadow-sm">
  <h2 className="text-xl font-black">Crear nueva tarea</h2>

  <div className="mt-4 flex flex-col gap-3 md:flex-row">
    <input
      value={taskTitle}
      onChange={(event) => setTaskTitle(event.target.value)}
      placeholder="Ej: Preparar deploy del proyecto"
      className="flex-1 rounded-2xl border border-pink-100 bg-[#FFF9FB] px-4 py-3 text-sm outline-none focus:border-pink-400"
    />

    <button
      onClick={handleCreateTask}
      className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200"
    >
      Crear tarea
    </button>
  </div>
</section>

          <StatsCards />

          <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
            <TaskList tasks={tasks} />

            <aside className="space-y-6">
              <AIWidget />

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