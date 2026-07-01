"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { TaskList } from "../../components/dashboard/TaskList";
import type { Task } from "../../types/task";
import {
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../../services/taskService";
import { getCurrentSessionUser } from "../../hooks/useAuth";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Task["status"] | "Todas">(
    "Todas"
  );

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, []);

  async function handleUpdateTaskStatus(id: string, status: Task["status"]) {
    await updateTaskStatus(id, status);
    await loadTasks();
  }

  async function handleDeleteTask(id: string) {
    await deleteTask(id);
    await loadTasks();
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "Todas" || task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell>
      <section className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
        <p className="font-bold text-pink-500">Tareas</p>
        <h1 className="mt-2 text-4xl font-black">Mis tareas</h1>
        <p className="mt-3 text-slate-500">
          Administrá todas tus tareas, cambiá estados y organizá tus prioridades.
        </p>

        <section className="mt-8 flex flex-col gap-3 md:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar tarea..."
            className="flex-1 rounded-2xl border border-pink-100 bg-[#FFF9FB] px-4 py-3 text-sm outline-none focus:border-pink-400"
          />

          <select
            value={filterStatus}
            onChange={(event) =>
              setFilterStatus(event.target.value as Task["status"] | "Todas")
            }
            className="rounded-2xl border border-pink-100 bg-[#FFF9FB] px-4 py-3 text-sm outline-none focus:border-pink-400"
          >
            <option value="Todas">Todas</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </section>

        <section className="mt-8">
          <TaskList
            tasks={filteredTasks}
            onUpdateStatus={handleUpdateTaskStatus}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </section>
    </AppShell>
  );
}