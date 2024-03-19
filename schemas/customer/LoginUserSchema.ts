import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const LoginUserSchema = z.object({
    phoneNumber : z.string().min(1, requiredFiledError),
    password : z.string().min(1, requiredFiledError)
})

export type LoginUserData = z.infer<typeof LoginUserSchema>

export const defaultLoginSchema : LoginUserData = {
    phoneNumber : "", password : ""
}