import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {requiredFiledError} from "@/schemas";

export const FilterOrdersSchema = z.object({
    orderStatus : SelectInputSchema,
    paymentStatus : SelectInputSchema,
    creationDate : z.string().min(1, requiredFiledError),
    paymentDate : z.string().min(1, requiredFiledError)
})

export type FilterOrdersData = z.infer<typeof FilterOrdersSchema>

