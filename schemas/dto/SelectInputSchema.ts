import {z} from "zod";

export const SelectInputSchema = z.object({
    name: z.string(),
    value: z.string()
})

export type SelectInputData = z.infer<typeof SelectInputSchema>