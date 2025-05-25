import { createSupabaseServerClient } from "@/lib/supabaseClient";
import { getAuthSession } from "@/lib/auth";
import { getJobStats } from "@/lib/getJobStats";
import JobList from "@/components/jobs/JobList";
import { StatsSummary } from "@/components/stats/StatsSummary";
import { MotivationalCard } from "@/components/custom/MotivationalCard";
import AddJobSheet from "@/components/jobs/AddJobSheet";
import { PaginationControlsWrapper } from "@/components/jobs/PaginationControlsWrapper";

type DashboardPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { page, limit } = await searchParams;

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 5;
  const offset = (currentPage - 1) * currentLimit;

  const session = await getAuthSession();
  if (!session?.user) return null;

  const supabase = await createSupabaseServerClient();

  const { data: jobs, count } = await supabase
    .from("Job")
    .select("*", { count: "exact" })
    .eq("userId", session.user.id)
    .range(offset, offset + currentLimit - 1)
    .order("createdAt", { ascending: false });

  const stats = await getJobStats(session.user.id);
  const totalPages = Math.ceil((count || 0) / currentLimit);

  return (
    <div className="p-4 space-y-6 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100 -mt-12">
        Your Jobs
      </h1>
      <StatsSummary stats={stats} />
      <MotivationalCard />
      <AddJobSheet />
      <PaginationControlsWrapper
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <JobList jobs={jobs || []} />
      <PaginationControlsWrapper
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
