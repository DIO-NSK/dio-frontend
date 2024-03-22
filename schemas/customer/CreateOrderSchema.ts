import {z} from "zod"
import {requiredFiledError} from "@/schemas";
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";

export const CreateOrderSchema = z.object({
    orderId: z.number(),
    paymentMethod: z.string().min(1, requiredFiledError),
    deliveryDate: SelectInputSchema,
    deliveryTime: SelectInputSchema,
    pickedProducts : z.array(z.number()).optional()
})

export type CreateOrderData = z.infer<typeof CreateOrderSchema>