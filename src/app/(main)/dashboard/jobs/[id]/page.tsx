
import JobDetailsWrapper from "@/components//jobs/job-details-wrapper";
import { getJobById } from "@/lib/jobs";

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);
  if (!job) return <div>Job not found.</div>;

  return <JobDetailsWrapper job={job} />;
}