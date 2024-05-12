import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {requiredFiledError} from "@/schemas";

export const RangeInputSchema = z.object({
    min : z.string().optional(),
    max : z.string().optional(),
    from : z.string().optional(),
    to : z.string().optional()
})

export const OrderFilterSchema = z.object({
    status: SelectInputSchema.optional(),
    created: z.string().optional(),
    paymentDate: z.string().optional(),
    paymentType: SelectInputSchema.optional(),
    cost : RangeInputSchema.optional()
})

export type OrderFilterData = z.infer<typeof OrderFilterSchema>
export type RangeInputData = z.infer<typeof RangeInputSchema>