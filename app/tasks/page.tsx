"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import { AppShell } from "../../components/layout/AppShell";
import type { Task } from "../../types/task";
import {
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../../services/taskService";
import { getCurrentSessionUser } from "../../hooks/useAuth";

const columns: {
  title: Task["status"];
  icon: LucideIcon;
  description: string;
}[] = [
  {
    title: "Pendiente",
    icon: Clock3,
    description: "Tareas que todavía no empezaste.",
  },
  {
    title: "En progreso",
    icon: LoaderCircle,
    description: "Tareas en las que estás trabajando.",
  },
  {
    title: "Finalizada",
    icon: CheckCircle2,
    description: "Tareas que ya completaste.",
  },
];

const priorityStyles = {
  Alta: "bg-rose-50 text-rose-500",
  Media: "bg-amber-50 text-amber-500",
  Baja: "bg-emerald-50 text-emerald-500",
};

export default function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  async function loadTasks() {
    const user = await getCurrentSessionUser();

    if (!user) {
      setTasks([]);
      return;
    }

    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    async function fetchTasks() {
      try {
        await loadTasks();
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  async function handleUpdateTaskStatus(id: string, status: Task["status"]) {
    await updateTaskStatus(id, status);
    await loadTasks();
  }

  async function handleDeleteTask(id: string) {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que querés eliminar esta tarea?"
    );

    if (!confirmDelete) return;

    await deleteTask(id);
    await loadTasks();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF9FB]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500" />
      </main>
    );
  }

  return (
    <AppShell>
      <section className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
        <p className="font-bold text-pink-500">Tareas</p>
        <h1 className="mt-2 text-4xl font-black">Mis tareas</h1>
        <p className="mt-3 text-slate-500">
          Visualizá tus tareas separadas por estado para entender rápidamente en
          qué avanzar.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {columns.map((column) => {
            const count = tasks.filter(
              (task) => task.status === column.title
            ).length;

            return (
              <article
                key={column.title}
                className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-5"
              >
                <p className="text-sm font-bold text-pink-500">
                  {column.title}
                </p>
                <h2 className="mt-2 text-4xl font-black">{count}</h2>
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-5 xl:grid-cols-3">
          {columns.map((column) => {
            const Icon = column.icon;
            const columnTasks = tasks.filter(
              (task) => task.status === column.title
            );

            return (
              <article
                key={column.title}
                className="rounded-3xl border border-pink-100 bg-[#FFF9FB] p-5"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon size={18} className="text-pink-500" />
                      <h2 className="font-black text-slate-900">
                        {column.title}
                      </h2>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {column.description}
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-pink-500">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="grid gap-3">
                  {columnTasks.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-pink-200 bg-white p-8 text-center">
                      <p className="text-5xl">📭</p>
                      <h3 className="mt-4 font-black">No hay tareas</h3>
                      <p className="mt-2 text-sm text-slate-500">
                        Creá una nueva tarea desde el Dashboard.
                      </p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-black text-slate-900">
                              {task.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {task.category}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="rounded-full bg-pink-50 p-2 text-slate-400 hover:text-rose-500"
                            aria-label="Eliminar tarea"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${
                              priorityStyles[task.priority]
                            }`}
                          >
                            {task.priority}
                          </span>

                          <select
                            value={task.status}
                            onChange={(event) =>
                              handleUpdateTaskStatus(
                                task.id,
                                event.target.value as Task["status"]
                              )
                            }
                            className="rounded-full border border-pink-100 bg-[#FFF9FB] px-3 py-1 text-xs font-black text-slate-500 outline-none"
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En progreso">En progreso</option>
                            <option value="Finalizada">Finalizada</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </AppShell>
  );
}