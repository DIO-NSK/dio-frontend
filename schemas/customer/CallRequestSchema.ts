import {z} from "zod"
import {requiredFiledError} from "@/schemas";
import {PhoneNumberSchema} from "@/schemas/dto/PhoneNumberSchema";

export const CallRequestSchema = z.object({
    phoneNumber: PhoneNumberSchema,
    fullName: z.string().min(1, requiredFiledError),
    comment: z.string().min(1, requiredFiledError)
})

export type CallRequestData = z.infer<typeof CallRequestSchema>