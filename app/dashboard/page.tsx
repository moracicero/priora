"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { CheckCircle2, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import type { User as SupabaseUser } from "@supabase/supabase-js";

import {
  getCurrentSessionUser,
  signInWithGoogle,
  signOut,
} from "@/hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { AIWidget } from "../../components/dashboard/AIWidget";
import { StatsCards } from "../../components/dashboard/StatsCards";
import { TaskList } from "../../components/dashboard/TaskList";
import type { Task } from "../../types/task";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../../services/taskService";

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [aiMessage, setAiMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Task["status"] | "Todas">(
    "Todas"
  );
  const [user, setUser] = useState<SupabaseUser | null>(null);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
      setTasks([]);
    }
  }

  useEffect(() => {
    async function fetchInitialData() {
      const currentUser = await getCurrentSessionUser();
      setUser(currentUser);

      if (currentUser) {
        await loadTasks();
      }
    }

    fetchInitialData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const loggedUser = session?.user ?? null;

      setUser(loggedUser);

      if (loggedUser) {
        await loadTasks();
      } else {
        setTasks([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleCreateTask() {
    if (!user) {
      setAiMessage("Iniciá sesión con Google para crear tareas.");
      return;
    }

    if (!taskTitle.trim()) return;

    await createTask({
      title: taskTitle,
      category: taskCategory || "General",
      priority: taskPriority,
      status: "Pendiente",
    });

    await loadTasks();

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

  async function handleUpdateTaskStatus(id: string, status: Task["status"]) {
    await updateTaskStatus(id, status);
    await loadTasks();
  }

  async function handleDeleteTask(id: string) {
    await deleteTask(id);
    await loadTasks();
  }

  async function handleLogout() {
    await signOut();
    setUser(null);
    setTasks([]);
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "Todas" || task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const completedPercentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((task) => task.status === "Finalizada").length /
            tasks.length) *
            100
        );

  const progressMessage =
    tasks.length === 0
      ? "Creá tu primera tarea para empezar a organizar tu día."
      : completedPercentage === 100
        ? "Excelente trabajo, completaste todas tus tareas."
        : completedPercentage >= 70
          ? "Ya casi terminás, estás muy cerca del objetivo."
          : completedPercentage >= 30
            ? "Buen ritmo, seguí avanzando con las tareas importantes."
            : "Empezá por una tarea de prioridad alta para ganar impulso.";

  const userName = user?.user_metadata?.full_name || "Usuario";
  const userAvatar = user?.user_metadata?.avatar_url;

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
            <Link
              href="/dashboard"
              className="flex w-full items-center gap-3 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-bold text-pink-500"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href="/tasks"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-pink-50 hover:text-pink-500"
            >
              <CheckCircle2 size={18} />
              Tareas
            </Link>

            <Link
              href="/profile"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-pink-50 hover:text-pink-500"
            >
              <User size={18} />
              Perfil
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-10 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-pink-50 hover:text-pink-500"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </aside>

        <section className="p-6 lg:p-10">
          <header className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-14 w-14 rounded-2xl object-cover shadow-md shadow-pink-100"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-xl font-black text-pink-500">
                  {userName.charAt(0)}
                </div>
              )}

              <div>
                <p className="font-bold text-pink-500">Dashboard</p>
                <h1 className="mt-1 text-4xl font-black">
                  Hola, {user ? userName : "invitada"} 👋
                </h1>
                <p className="mt-2 text-slate-500">
                  {user
                    ? "Acá tenés el resumen de tu productividad de hoy."
                    : "Iniciá sesión para guardar y gestionar tus tareas."}
                </p>
              </div>
            </div>

            {user ? (
              <button
                onClick={handleLogout}
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200"
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200"
              >
                Iniciar con Google
              </button>
            )}
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
            <div>
              <section className="mb-6 flex flex-col gap-3 md:flex-row">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar tarea..."
                  className="flex-1 rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm outline-none focus:border-pink-400"
                />

                <select
                  value={filterStatus}
                  onChange={(event) =>
                    setFilterStatus(
                      event.target.value as Task["status"] | "Todas"
                    )
                  }
                  className="rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm outline-none focus:border-pink-400"
                >
                  <option value="Todas">Todas</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Finalizada">Finalizada</option>
                </select>
              </section>

              <TaskList
                tasks={filteredTasks}
                onUpdateStatus={handleUpdateTaskStatus}
                onDeleteTask={handleDeleteTask}
              />
            </div>

            <aside className="space-y-6">
              <AIWidget />

              <article className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black">Progreso semanal</h2>
                <p className="mt-2 text-sm text-slate-500">{progressMessage}</p>

                <div className="mt-5 h-3 rounded-full bg-pink-50">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400"
                    style={{ width: `${completedPercentage}%` }}
                  />
                </div>

                <p className="mt-3 text-xs font-bold text-pink-500">
                  {completedPercentage}% completado
                </p>
              </article>
            </aside>
          </section>
        </section>
      </div>
    </main>
  );
}