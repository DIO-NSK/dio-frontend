import {z} from "zod"
import {requiredFiledError} from "@/schemas";
import {PhoneNumberSchema} from "@/schemas/dto/PhoneNumberSchema";

export const CreateOrderDraftSchema = z.object({
    firstName: z.string().min(1, requiredFiledError),
    surname: z.string().min(1, requiredFiledError),
    phoneNumber: PhoneNumberSchema,
    email: z.string().min(1, requiredFiledError).email(),
    addressId: z.number().optional(),
    city: z.string().min(1, requiredFiledError),
    street: z.string().min(1, requiredFiledError),
    houseNumber: z.string().min(1, requiredFiledError).or(z.number()),
    flatNumber: z.string().min(1, requiredFiledError).or(z.number()),
    entranceNumber: z.string().min(1, requiredFiledError).or(z.number()),
    floor: z.string().min(1, requiredFiledError).or(z.number())
})

export type CreateOrderDraftData = z.infer<typeof CreateOrderDraftSchema>
