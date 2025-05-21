"use client";

import { useEffect, useState } from "react";
import { Job } from "@/generated/prisma";
import Link from "next/link";
import Spinner from "../ui/spinner";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Info, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

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
                {/* Info Section */}
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

                {/* Actions */}
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
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      const confirmed = confirm(
                      `  Are you sure you want to delete "${job.title}"?`
                      );
                      if (!confirmed) return;
                      const res = await fetch(`/api/jobs/${job.id}`, {
                        method: "DELETE",
                      });
                      if (res.ok) {
                        toast.success("Job Deleted Successfully");
                        setJobs((prev) =>
                          prev?.filter((j) => j.id !== job.id) || []
                        );
                      } else {
                        toast.error("Failed to delete job");
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}