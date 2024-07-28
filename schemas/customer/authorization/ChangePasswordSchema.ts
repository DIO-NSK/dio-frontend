import {z} from 'zod'
import {requiredFiledError} from "@/schemas";

export const ChangePasswordSchema = z.object({
    code : z.string().min(1, requiredFiledError),
    phoneNumber : z.string().min(1, requiredFiledError),
    newPassword : z.string().min(1, requiredFiledError)
})

export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>