import { createSupabaseServerClient } from "@/lib/supabaseClient";
import { getAuthSession } from "./auth";


export async function getJobStats(userId: string) {
  const supabase = await createSupabaseServerClient();
  const session = await getAuthSession();

  const { data } = await supabase
    .from("Job")
    .select("*")
    .eq("userId", session?.user.id);

  if (!data) return { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };

  const countByStatus = (status: string) =>
    data.filter((j) => j.status === status).length;

  return {
    Applied: countByStatus("APPLIED"),
    Interview: countByStatus("INTERVIEW"),
    Offer: countByStatus("OFFER"),
    Rejected: countByStatus("REJECTED"),
  };
}
