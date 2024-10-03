import {z} from "zod"
import {requiredFiledError} from "@/schemas";
import {CharacteristicSchema} from "@/schemas/dto/CharacteristicSchema";
import { SeoSchema } from "./SeoSchema";

export const CreateCategorySchema = z.object({
    name: z.string().min(1, requiredFiledError),
    image : z.string().min(1, requiredFiledError).or(z.null()),
    properties: z.array(CharacteristicSchema),
    id: z.number().optional(),
    sequenceNumber: z.number().optional(),
    isNeedParsing : z.boolean().optional(),
    seoEntityDto : z.object({
        title: z.string().max(80, 'Длина заголовка не может быть больше 80 символов.').optional(),
        description: z.string().max(512, 'Описание не может быть больше 512 символов.').optional(),
        urlMask: z.string().min(1, requiredFiledError),
        keywords: z.string().refine(string => string.split(',').length < 20).optional(),
    })
})

export type CreateCategoryData = z.infer<typeof CreateCategorySchema>