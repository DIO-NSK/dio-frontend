import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {requiredFiledError} from "@/schemas";

export const RangeInputSchema = z.object({
    from : z.string(),
    to : z.string()
})

export const OrderFilterSchema = z.object({
    status: SelectInputSchema.optional(),
    created: z.string().min(1, requiredFiledError).optional(),
    paymentDate: z.string().min(1, requiredFiledError).optional(),
    paymentType: SelectInputSchema.optional(),
    cost : RangeInputSchema.optional()
})

export type OrderFilterData = z.infer<typeof OrderFilterSchema>
export type RangeInputData = z.infer<typeof RangeInputSchema>