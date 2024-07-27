import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {requiredFiledError} from "@/schemas";

export const CreateOurWaterSchema = z.object({
    ourWater: SelectInputSchema,
    imageUrl: z.string().min(1, requiredFiledError).or(z.null())
})

export type CreateOurWaterData = z.infer<typeof CreateOurWaterSchema>