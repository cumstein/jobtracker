"use client";

import { useEffect, useState } from "react";
import { Job } from "@/generated/prisma";
import Link from "next/link";
import Spinner from "../ui/spinner";

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
            className="text-blue-600 hover:underline"
            href="/dashboard/new-job"
          >
            Add one?
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 bg-card rounded-xl shadow-sm border flex flex-col sm:flex-row sm:justify-between gap-2"
            >
              <div>
                <h3 className="font-semibold text-base">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.company} — {job.location || "No location"}
                </p>
              </div>

              <div className="text-sm text-right sm:text-left text-primary font-medium self-start sm:self-center">
                {job.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
