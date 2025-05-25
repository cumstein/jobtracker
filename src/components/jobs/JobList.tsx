import { Job } from "@/generated/prisma";
import Link from "next/link";
import Spinner from "../ui/spinner";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Info, Pencil } from "lucide-react";
import DeleteJobButton from "./DeleteJobButton";

type JobListProps = {
  jobs: Job[];
};

export default function JobList({ jobs }: JobListProps) {
  if (!jobs) return <Spinner />;

  return (
    <div className="mt-6 space-y-4">
      {jobs.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-muted-foreground text-sm text-center">
            No jobs found.
          </p>
          <Link
            className="text-blue-600 hover:underline text-sm font-medium"
            href="/dashboard/new-job"
          >
            Add one?
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 bg-card rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {job.company} — {job.location || "No location"}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-2 capitalize w-fit text-xs"
                  >
                    {job.status.toLowerCase()}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-start sm:justify-end">
                  <Link href={`/dashboard/jobs/${job.id}/edit`}>
                    <Button variant="secondary" size="sm">
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/dashboard/jobs/${job.id}`}>
                    <Button variant="secondary" size="sm">
                      <Info className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </Link>
                  <DeleteJobButton jobId={job.id} jobTitle={job.title} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}