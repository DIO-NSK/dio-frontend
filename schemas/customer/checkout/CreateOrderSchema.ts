import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";

export const CreateOrderSchema = z.object({
    orderId: z.number(),
    paymentMethod: SelectInputSchema,
    deliveryDate: SelectInputSchema,
    deliveryTime: SelectInputSchema,
    pickedProducts : z.array(z.number()).optional(),
    pickedPromos : z.array(z.number()).optional(),
})

export type CreateOrderData = z.infer<typeof CreateOrderSchema>