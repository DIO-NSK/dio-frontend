import { requiredFiledError } from "@/schemas";
import { z } from "zod";
import { SeoSchema } from "./SeoSchema";

export const CreateSectionSchema = z.object({
    section: z.string().min(1, requiredFiledError),
    seoEntityDto: SeoSchema.optional()
})

export type CreateSectionData = z.infer<typeof CreateSectionSchema>
