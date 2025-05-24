import { createSupabaseServerClient } from "@/lib/supabaseClient";

export async function getJobStats(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("Job").select("status").eq("userId", userId);

  if (!data) return { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };

  const countByStatus = (status: string) => data.filter((j) => j.status === status).length;

  return {
    Applied: countByStatus("APPLIED"),
    Interview: countByStatus("INTERVIEW"),
    Offer: countByStatus("OFFER"),
    Rejected: countByStatus("REJECTED"),
  };
}