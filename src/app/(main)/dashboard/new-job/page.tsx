"use client";

import { JobForm } from "@/components/jobs/JobForm";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
  const router = useRouter();

  const onSuccess = () => {
 
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-center">
        Add a New Job
      </h1>
      <JobForm onSuccess={onSuccess} />
    </div>
  );
}
