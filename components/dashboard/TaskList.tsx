import { Circle, Trash2 } from "lucide-react";
import type { Task } from "../../types/task";

type TaskListProps = {
  tasks: Task[];
  onUpdateStatus: (id: string, status: Task["status"]) => void;
  onDeleteTask: (id: string) => void;
};

export function TaskList({
  tasks,
  onUpdateStatus,
  onDeleteTask,
}: TaskListProps) {
  return (
    <article className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">Tareas recientes</h2>
          <p className="text-sm text-slate-500">
            Últimas tareas cargadas en tu workspace.
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pink-200 bg-[#FFF9FB] p-8 text-center">
          <p className="font-bold text-slate-700">Todavía no tenés tareas</p>
          <p className="mt-1 text-sm text-slate-500">
            Creá una nueva tarea para empezar a organizar tu día.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-pink-100 bg-[#FFF9FB] p-4 md:flex-row md:items-center"
            >
              <div className="flex items-center gap-4">
                <Circle size={18} className="text-pink-400" />
                <div>
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm text-slate-500">{task.category}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-pink-500">
                  {task.priority}
                </span>

                <select
                  value={task.status}
                  onChange={(event) =>
                    onUpdateStatus(
                      task.id,
                      event.target.value as Task["status"]
                    )
                  }
                  className="rounded-full border border-pink-100 bg-white px-3 py-1 text-xs font-black text-slate-500 outline-none"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Finalizada">Finalizada</option>
                </select>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="rounded-full bg-white p-2 text-slate-400 hover:text-rose-500"
                  aria-label="Eliminar tarea"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}