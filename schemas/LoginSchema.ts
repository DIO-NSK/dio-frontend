import {z} from "zod"
import {requiredFiledError} from "@/schemas/CheckoutFormSchema";

export const LoginSchema = z.object({
    phoneNumber : z.string().min(1, requiredFiledError),
    password : z.string().min(1, requiredFiledError)
})

export type LoginData = z.infer<typeof LoginSchema>

export const defaultLoginSchema : LoginData = {
    phoneNumber: "",
    password : ""
}