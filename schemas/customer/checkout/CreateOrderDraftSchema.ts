import {z} from "zod"
import {requiredFiledError} from "@/schemas";
import {PhoneNumberSchema} from "@/schemas/dto/PhoneNumberSchema";

export const AddressSchema = z.object({
    address : z.string().min(1, 'Пожалуйста, укажите адрес доставки'),
    latitude : z.number().or(z.string()),
    longitude : z.number().or(z.string()),
    city : z.string().min(1, 'Пожалуйста, укажите город доставки'),
    house : z.string().min(1, 'Пожалуйста, укажите дом доставки'),
})

export const CreateOrderDraftSchema = z.object({
    firstName: z.string().min(1, requiredFiledError),
    surname: z.string().min(1, requiredFiledError),
    phoneNumber: PhoneNumberSchema,
    email: z.string().min(1, requiredFiledError).email(),
    entranceNumber : z.string().optional(),
    floor : z.string().optional(),
    flat : z.string().optional(),
    addressId: z.number().optional(),
    address : AddressSchema,
    comment : z.string().optional()
})

export type CreateOrderDraftData = z.infer<typeof CreateOrderDraftSchema>
