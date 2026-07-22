import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().min(10, "Excerpt too short"),
  content: z.string().min(50, "Content too short"),
  coverImage: z.string().url("Valid image URL required"),
  tags: z.array(z.string()).optional(),
});
