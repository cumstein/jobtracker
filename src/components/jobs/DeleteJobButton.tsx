"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  jobId: string;
  jobTitle: string;
};

export default function DeleteJobButton({ jobId, jobTitle }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${jobTitle}"?`);
    if (!confirmed) return;
    const res = await fetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Job Deleted Successfully");
      router.refresh();
    } else {
      toast.error("Failed to delete job");
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => startTransition(handleDelete)}
      disabled={isPending}
    >
      <Trash2 className="w-4 h-4 mr-1" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}