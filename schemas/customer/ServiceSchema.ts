import {z} from "zod"
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {requiredFiledError} from "@/schemas";
import {PhoneNumberSchema} from "@/schemas/dto/PhoneNumberSchema";

export const ServiceSchema = z.object({
    name: z.string().min(1, requiredFiledError),
    phoneNumber: PhoneNumberSchema,
    message: z.string().min(1, requiredFiledError).optional(),
    nameServiceType: SelectInputSchema
})

export type ServiceData = z.infer<typeof ServiceSchema>