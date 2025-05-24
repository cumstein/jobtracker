import { createSupabaseServerClient } from "@/lib/supabaseClient";
import { getAuthSession } from "@/lib/auth";
import { StatCard } from "@/components/stats/StatCard";
import { StatsPieChart } from "@/components/stats/StatsPieChart";

export default async function StatsPage() {
  const session = await getAuthSession();

  const supabase = await createSupabaseServerClient();

  const { data: jobs, error } = await supabase
    .from("Job")
    .select("*")
    .eq("userId", session?.user.id);

  if (error || !jobs) {

    return (
      <div className="text-center mt-10 text-red-500">
        Error loading data
      </div>
    );
  }

  const {applied, interview, offer, rejected, archived } = {
    applied: jobs.filter((job) => job.status === "APPLIED").length,
    interview: jobs.filter((job) => job.status === "INTERVIEW").length,
    offer: jobs.filter((job) => job.status === "OFFER").length,
    rejected: jobs.filter((job) => job.status === "REJECTED").length,
    archived: jobs.filter((job) => job.status === "ARCHIVED").length,
  };

  const cards = [
    { title: "Applied", value: applied, color: "text-blue-500" },
    { title: "Interview", value: interview, color: "text-yellow-500" },
    { title: "Offer", value: offer, color: "text-green-500" },
    { title: "Rejected", value: rejected, color: "text-red-500" },
    { title: "Archived", value: archived, color: "text-gray-500" },
  ];


  return (
    <>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          color={card.color}
        />
      ))}
    </div>


<StatsPieChart data={cards} />
    </>
  );
}