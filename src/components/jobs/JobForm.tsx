"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/lib/validation/jobSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import Spinner from "../ui/spinner";
import { useRouter } from "next/navigation";

type JobFormValues = z.infer<typeof jobSchema>;

type JobFormProps = {
  initialData?: JobFormValues;
  onSuccess?: () => void;
};

export function JobForm({ initialData, onSuccess }: JobFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      ...initialData,
      status: initialData?.status || "APPLIED",
    },
  });

  const onSubmit: SubmitHandler<JobFormValues> = async (data) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Job added successfully");
      reset();               
      router.refresh();      
      onSuccess?.();
    } else {
      const errorData = await res.json();
      console.error("Error creating job:", errorData);
      toast.error("Failed to create job. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Job title" {...register("title")} />
      {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

      <Input placeholder="Company name" {...register("company")} />
      {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}

      <Textarea placeholder="Description" {...register("description")} />
      {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

      <Input placeholder="Location (optional)" {...register("location")} />
      {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}

      <Input placeholder="Application URL (optional)" {...register("url")} />
      {errors.url && <p className="text-sm text-red-500">{errors.url.message}</p>}

      <Select
        defaultValue={initialData?.status || "APPLIED"}
        onValueChange={(value) =>
          setValue("status", value as JobFormValues["status"])
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="APPLIED">Applied</SelectItem>
          <SelectItem value="INTERVIEW">Interview</SelectItem>
          <SelectItem value="OFFER">Offered</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
          <SelectItem value="ARCHIVED">Archived</SelectItem>
        </SelectContent>
      </Select>
      {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 text-zinc-100 dark:text-zinc-800 bg-zinc-900 dark:bg-zinc-100 p-2 rounded-xl hover:bg-primary/90 transition"
      >
        {isSubmitting ? <Spinner /> : "Create Job"}
      </Button>
    </form>
  );
}