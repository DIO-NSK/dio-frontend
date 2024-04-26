import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";

export const CreateOurWaterSchema = z.object({
    ourWater: SelectInputSchema,
    image: z.custom<File>((v) => v instanceof File).or(z.null()).or(z.string())
})

export type CreateOurWaterData = z.infer<typeof CreateOurWaterSchema>