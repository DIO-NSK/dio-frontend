import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {requiredFiledError} from "@/schemas";

export const OrderFilterSchema = z.object({
    status: SelectInputSchema.optional(),
    created: z.string().min(1, requiredFiledError).optional(),
    paymentDate: z.string().min(1, requiredFiledError).optional(),
    paymentType: SelectInputSchema.optional(),
    costFrom: z.string().min(1, requiredFiledError).optional(),
    costTo: z.string().min(1, requiredFiledError).optional(),
})

export type OrderFilterData = z.infer<typeof OrderFilterSchema>