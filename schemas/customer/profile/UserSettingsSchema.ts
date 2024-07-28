import {z} from "zod"
import {PhoneNumberSchema} from "@/schemas/dto/PhoneNumberSchema";
import {requiredFiledError} from "@/schemas";

export const UserSettingsSchema = z.object({
    phoneNumber : PhoneNumberSchema,
    firstName : z.string().min(1, requiredFiledError),
    email : z.string().email().min(1, requiredFiledError),
    lastName : z.string().min(1, requiredFiledError)
})

export type UserSettingsData = z.infer<typeof UserSettingsSchema>