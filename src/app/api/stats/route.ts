import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabaseClient";

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("user_email", session.user.email);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  
  const total = data.length;
  const applied = data.filter((job) => job.status === "applied").length;
  const interview = data.filter((job) => job.status === "interview").length;
  const offer = data.filter((job) => job.status === "offer").length;
  const rejected = data.filter((job) => job.status === "rejected").length;

  return NextResponse.json({
    total,
    applied,
    interview,
    offer,
    rejected,
  });
}