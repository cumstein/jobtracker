import { MotivationalCard } from "@/components/custom/MotivationalCard";
import AddJobSheet from "@/components/jobs/AddJobSheet";
import JobList from "@/components/jobs/JobList";
import { StatsSummary } from "@/components/stats/StatsSummary";
import { getAuthSession } from "@/lib/auth";
import { getJobStats } from "@/lib/getJobStats";

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session?.user) return null;

  const stats = await getJobStats(session.user.id);

  return (
    <div className="p-4 space-y-6 flex flex-col justify-center items center">
      <h1 className="text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100">
        Your Jobs
      </h1>
      <StatsSummary stats={stats} />
      <MotivationalCard />
      <AddJobSheet />
      <JobList />
    </div>
  );
}
