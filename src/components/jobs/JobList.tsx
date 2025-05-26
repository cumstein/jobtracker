"use client";

import React from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Info, Pencil } from "lucide-react";
import DeleteJobButton from "./DeleteJobButton";
import { useJobFilters } from "@/lib/store/useJobFilters";
import { useQuery } from "@apollo/client";
import { GET_FILTERED_JOBS } from "@graphql/queries";
import JobListSkeleton from "./JobListSkeleton";

type JobListItem = {
  id: string;
  title: string;
  company: string;
  location?: string;
  status: string;
};

export default function JobList() {
  const { search, status, tags, page } = useJobFilters();
  const { data, loading, error } = useQuery(GET_FILTERED_JOBS, {
  variables: {
    filters: {
      search ,
      status,
      tags,
      page,
      limit: 5,
    },
  },
});

  if (loading) return <JobListSkeleton />;
  if (error) return <div className="text-red-500">Error loading jobs: {error.message}</div>;

  const jobs = data?.filteredJobs?.jobs || [];

  return (
    <div className="mt-6 space-y-4 min-h-[300px]">
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
          {jobs.map((job: JobListItem) => (
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
