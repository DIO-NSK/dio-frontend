import { z } from "zod";

export const SeoSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    urlMask: z.string().optional(),
    keywords: z.string().optional(),
})

export type SeoData = z.infer<typeof SeoSchema>;