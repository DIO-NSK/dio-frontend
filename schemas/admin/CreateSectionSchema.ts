import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const CreateSectionSchema = z.object({
    section: z.string().min(1, requiredFiledError)
})

export type CreateSectionData = z.infer<typeof CreateSectionSchema>
