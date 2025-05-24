
interface StatCardProps {
  title: string;
  value: number;
  color?: string;
}

export function StatCard({ title, value, color = "text-primary" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-md flex flex-col items-start justify-center">
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}