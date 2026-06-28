import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  type LucideIcon,
} from "lucide-react";
import type { Task } from "../../types/task";

type StatsCardsProps = {
  tasks: Task[];
};

type Stat = {
  icon: LucideIcon;
  number: number;
  label: string;
};

export function StatsCards({ tasks }: StatsCardsProps) {
  const total = tasks.length;
  const pending = tasks.filter((task) => task.status === "Pendiente").length;
  const inProgress = tasks.filter(
    (task) => task.status === "En progreso"
  ).length;
  const done = tasks.filter((task) => task.status === "Finalizada").length;

  const stats: Stat[] = [
    {
      icon: BarChart3,
      number: total,
      label: "Total",
    },
    {
      icon: Clock3,
      number: pending,
      label: "Pendientes",
    },
    {
      icon: CalendarDays,
      number: inProgress,
      label: "En progreso",
    },
    {
      icon: CheckCircle2,
      number: done,
      label: "Finalizadas",
    },
  ];

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
              <Icon size={21} />
            </div>

            <p className="text-3xl font-black">{stat.number}</p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {stat.label}
            </p>
          </article>
        );
      })}
    </section>
  );
}