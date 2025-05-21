"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Job } from "@/generated/prisma";
import { BackButton } from "../custom/BackButton";

export default function JobDetailsWrapper({ job }: { job: Job }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Job deleted");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to delete job");
    }
  };

  return (
    <>
      <div className="mb-4 md:ml-8">
        <BackButton />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto mt-10 p-6 bg-card rounded-2xl border shadow-md space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-muted-foreground">{job.company}</p>
          <p className="text-muted-foreground text-sm">
            {job.location || "No location"}
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-medium">Status</h3>
          <p className="text-sm text-primary">{job.status}</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Description</h3>
          <p className="text-sm text-primary">{job.description}</p>
        </div>

        {job.url && (
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Link</h3>
            <a
              href={job.url}
              className="text-blue-600 hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.url}
            </a>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            onClick={() => router.push(`/dashboard/jobs/${job.id}/edit`)}
            variant="outline"
          >
            Edit
          </Button>
        </div>
      </motion.div>
    </>
  );
}
