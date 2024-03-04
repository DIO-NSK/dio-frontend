import {z} from "zod"
import {requiredFiledError} from "@/schemas";
import {CharacteristicSchema} from "@/schemas/dto/CharacteristicSchema";

export const CreateCategorySchema = z.object({
    name: z.string().min(1, requiredFiledError),
    properties: z.array(CharacteristicSchema),
    id: z.number().optional(),
    sequenceNumber: z.number().optional()
})

export type CreateCategoryData = z.infer<typeof CreateCategorySchema>