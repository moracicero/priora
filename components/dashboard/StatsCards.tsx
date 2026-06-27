import { BarChart3, CalendarDays, CheckCircle2, Clock3 } from "lucide-react";

export function StatsCards() {
  const stats = [
    [BarChart3, "12", "Total"],
    [Clock3, "4", "Pendientes"],
    [CalendarDays, "3", "En progreso"],
    [CheckCircle2, "5", "Finalizadas"],
  ];

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-4">
      {stats.map(([Icon, number, label]) => (
        <article
          key={label as string}
          className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
            <Icon size={21} />
          </div>
          <p className="text-3xl font-black">{number as string}</p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {label as string}
          </p>
        </article>
      ))}
    </section>
  );
}