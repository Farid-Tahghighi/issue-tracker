import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export const patchIssueScheme = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title is too long.")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65335, "Description is too long.")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "At least one assignee needed.")
    .max(255, "Too much assignees")
    .optional()
    .nullable(),
});
