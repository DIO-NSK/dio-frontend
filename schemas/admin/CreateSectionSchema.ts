import { requiredFiledError } from "@/schemas";
import { z } from "zod";
import { SeoSchema } from "./SeoSchema";

export const CreateSectionSchema = z.object({
    section: z.string().min(1, requiredFiledError),
    seoEntityDto: z.object({
        title: z.string().max(80, 'Длина заголовка не может быть больше 80 символов.').optional(),
        description: z.string().max(512, 'Описание не может быть больше 512 символов.').optional(),
        urlMask: z.string().min(1, requiredFiledError),
        keywords: z.string().refine(string => string.split(',').length < 20).optional(),
    })
})

export type CreateSectionData = z.infer<typeof CreateSectionSchema>
