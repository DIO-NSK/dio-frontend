import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const RegisterUserSchema = z.object({
    phoneNumber : z.string().min(1, requiredFiledError),
    fullName : z.string().min(1, requiredFiledError),
    password : z.string().min(1, requiredFiledError)
})

export type RegisterUserData = z.infer<typeof RegisterUserSchema>
