import { BackButton } from "@/components/custom/BackButton";
import { JobForm } from "@/components/jobs/JobForm";
import { getJobById } from "@/lib/jobs";
import { notFound } from "next/navigation";

export default async function EditJobPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobById(params.id);

  if (!job) return notFound();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <JobForm
        initialData={{
          ...job,
          location: job.location ?? undefined,
          url: job.url ?? undefined,
        }}
        jobId={params.id}
      />
    </div>
  );
}
