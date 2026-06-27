export type TaskPriority = "Alta" | "Media" | "Baja";

export type TaskStatus = "Pendiente" | "En progreso" | "Finalizada";

export type Task = {
  id: string;
  title: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
};