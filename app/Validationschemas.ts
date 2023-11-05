import z from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1, "Title is requried").max(255),
    description: z.string().min(1, "Description is required"),
});
