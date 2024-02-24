import {z} from "zod"
import {requiredFiledError} from "@/schemas/CheckoutFormSchema";

export const ForgotPasswordSchema = z.object({
    password : z.string().min(1, requiredFiledError),
    repeatedPassword : z.string().min(1, requiredFiledError)
})

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>
export const defaultForgotPasswordData : ForgotPasswordData = {
    password: "", repeatedPassword: ""
}