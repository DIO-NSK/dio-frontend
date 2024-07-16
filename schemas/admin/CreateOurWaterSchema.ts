import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {requiredFiledError} from "@/schemas";

const SelectOurWaterSchema = z.object({
    name : z.string().min(1, requiredFiledError),
    value : z.object({
        name : z.string(),
        categoryId : z.number().or(z.string()),
        filterId : z.number().or(z.string())
    })
})

export const CreateOurWaterSchema = z.object({
    ourWater: SelectOurWaterSchema,
    imageUrl: z.string().min(1, requiredFiledError).or(z.null())
})

export type CreateOurWaterData = z.infer<typeof CreateOurWaterSchema>