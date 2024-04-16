import {z} from "zod";
import {requiredFiledError} from "@/schemas";

export const SelectInputSchema = z.object({
    name: z.string().min(1, requiredFiledError),
    value: z.string().min(1, requiredFiledError)
})