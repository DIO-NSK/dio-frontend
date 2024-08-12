import {z} from "zod"
import {requiredFiledError} from "@/schemas";
import {PhoneNumberSchema} from "@/schemas/dto/PhoneNumberSchema";

export const AddressSchema = z.object({
    address : z.string(),
    latitude : z.number(),
    longitude : z.number()
})

export const CreateOrderDraftSchema = z.object({
    firstName: z.string().min(1, requiredFiledError),
    surname: z.string().min(1, requiredFiledError),
    phoneNumber: PhoneNumberSchema,
    email: z.string().min(1, requiredFiledError).email(),
    addressId: z.number().optional(),
    address : AddressSchema,
    comment : z.string().optional()
})

export type CreateOrderDraftData = z.infer<typeof CreateOrderDraftSchema>
