import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().optional(),
  url: z.string().optional(),
  status: z.enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED", "ARCHIVED"]),
});
