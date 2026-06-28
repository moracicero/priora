"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  LayoutDashboard,
  LogOut,
  Plus,
  User,
} from "lucide-react";

import { AIWidget } from "../../components/dashboard/AIWidget";
import { StatsCards } from "../../components/dashboard/StatsCards";
import { TaskList } from "../../components/dashboard/TaskList";
import type { Task } from "../../types/task";

const STORAGE_KEY = "priora_tasks";

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
];
function suggestPriority(title: string): Task["priority"] {
  const text = title.toLowerCase();

  if (
    text.includes("urgente") ||
    text.includes("mañana") ||
    text.includes("entrevista") ||
    text.includes("cliente") ||
    text.includes("deploy")
  ) {
    return "Alta";
  }

  if (
    text.includes("proyecto") ||
    text.includes("readme") ||
    text.includes("estudiar") ||
    text.includes("validar")
  ) {
    return "Media";
  }

  return "Baja";
}

export default function DashboardPage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskCategory, setTaskCategory] = useState("General");
  const [taskPriority, setTaskPriority] = useState<Task["priority"]>("Media");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [aiMessage, setAiMessage] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const savedTasks = window.localStorage.getItem(STORAGE_KEY);

  if (savedTasks) {
    try {
      const parsedTasks = JSON.parse(savedTasks) as Task[];
      setTasks(parsedTasks);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  setIsLoaded(true);
}, []);

useEffect(() => {
  if (!isLoaded) return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks, isLoaded]);

  function handleCreateTask() {
    if (!taskTitle.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      category: taskCategory || "General",
      priority: taskPriority,
      status: "Pendiente",
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle("");
    setTaskCategory("General");
    setTaskPriority("Media");
    setAiMessage("");
  }
  
  function handleSuggestPriority() {
  if (!taskTitle.trim()) {
    setAiMessage("Escribí primero el título de la tarea.");
    return;
  }

  const suggestedPriority = suggestPriority(taskTitle);

  setTaskPriority(suggestedPriority);
  setAiMessage(`Priora recomienda prioridad ${suggestedPriority}.`);
}

  function handleUpdateTaskStatus(id: string, status: Task["status"]) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const completedPercentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((task) => task.status === "Finalizada").length /
            tasks.length) *
            100
        );

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

            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_160px_auto_auto]">
              <input
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="Ej: Preparar deploy del proyecto"
                className="rounded-2xl border border-pink-100 bg-[#FFF9FB] px-4 py-3 text-sm outline-none focus:border-pink-400"
              />

              <input
                value={taskCategory}
                onChange={(event) => setTaskCategory(event.target.value)}
                placeholder="Categoría"
                className="rounded-2xl border border-pink-100 bg-[#FFF9FB] px-4 py-3 text-sm outline-none focus:border-pink-400"
              />

              <select
                value={taskPriority}
                onChange={(event) =>
                  setTaskPriority(event.target.value as Task["priority"])
                }
                className="rounded-2xl border border-pink-100 bg-[#FFF9FB] px-4 py-3 text-sm outline-none focus:border-pink-400"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
              <button
                onClick={handleSuggestPriority}
                className="rounded-2xl border border-pink-100 bg-white px-5 py-3 text-sm font-bold text-pink-500 shadow-sm hover:bg-pink-50"
              >
                ✨ Sugerir
              </button>
              <button
                onClick={handleCreateTask}
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200"
              >
                Crear tarea
              </button>
            </div>
            {aiMessage && (
              <p className="mt-3 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-bold text-pink-500">
                ✨ {aiMessage}
              </p>
            )}
          </section>

          <StatsCards tasks={tasks} />

          <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
            <TaskList
              tasks={tasks}
              onUpdateStatus={handleUpdateTaskStatus}
              onDeleteTask={handleDeleteTask}
            />

            <aside className="space-y-6">
              <AIWidget />

              <article className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black">Progreso semanal</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Completaste el {completedPercentage}% de tus tareas.
                </p>

                <div className="mt-5 h-3 rounded-full bg-pink-50">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400"
                    style={{ width: `${completedPercentage}%` }}
                  />
                </div>
              </article>
            </aside>
          </section>
        </section>
      </div>
    </main>
  );
}