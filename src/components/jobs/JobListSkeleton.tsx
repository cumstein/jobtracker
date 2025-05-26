export default function JobListSkeleton() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="p-4 bg-card rounded-2xl shadow-sm border animate-pulse transition-colors duration-300"
        >
          <div className="flex flex-col gap-3">
            <div className="h-5 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded" />
            <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mt-2" />
          </div>
        </li>
      ))}
    </ul>
  );
}