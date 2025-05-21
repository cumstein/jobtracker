
import JobDetailsWrapper from "@/components//jobs/job-details-wrapper";
import { getJobById } from "@/lib/jobs";

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) return <div>Job not found.</div>;

  return <JobDetailsWrapper job={job} />;
}