"use client";

import { useForm } from "react-hook-form";
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
import { useState } from "react";

type JobFormValues = z.infer<typeof jobSchema>;

type JobFormProps = {
  initialData?: JobFormValues & { id?: string | number };
  onSuccess?: () => void;
};

export function JobForm({
  initialData,
  jobId,
}: JobFormProps & { jobId?: string }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: initialData?.title || "",
      company: initialData?.company || "",
      description: initialData?.description || "",
      location: initialData?.location || "",
      url: initialData?.url || "",
      status: initialData?.status || "APPLIED",
    },
  });

  const onSubmit = async (data: JobFormValues) => {

    try {
      const res = await fetch(jobId ? `/api/jobs/${jobId}` : "/api/jobs", {
        method: jobId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Something went wrong");
      toast.success("Well Done!");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Error!");
    } finally {
      console.log("success");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Job title" {...register("title")} />
      {errors.title && (
        <p className="text-sm text-red-500">{errors.title.message}</p>
      )}

      <Input placeholder="Company name" {...register("company")} />
      {errors.company && (
        <p className="text-sm text-red-500">{errors.company.message}</p>
      )}

      <Textarea placeholder="Description" {...register("description")} />
      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}

      <Input placeholder="Location (optional)" {...register("location")} />
      {errors.location && (
        <p className="text-sm text-red-500">{errors.location.message}</p>
      )}

      <Input placeholder="Application URL (optional)" {...register("url")} />
      {errors.url && (
        <p className="text-sm text-red-500">{errors.url.message}</p>
      )}

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
      {errors.status && (
        <p className="text-sm text-red-500">{errors.status.message}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 text-zinc-100 dark:text-zinc-800 bg-zinc-900 dark:bg-zinc-100 p-2 rounded-xl hover:bg-primary/90 transition"
      >
        {isSubmitting ? <Spinner /> : initialData ? "Update Job" : "Create Job"}
      </Button>
    </form>
  );
}
