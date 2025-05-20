import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import JobList from "@/components/jobs/JobList";
import AddJobSheet from "@/components/jobs/AddJobSheet";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-center">
        Your Jobs
      </h1>
      <div className="flex items-center justify-center">
        <AddJobSheet  />
      </div>
      <JobList />
    </div>
  );
}
