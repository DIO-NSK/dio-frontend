import {z} from "zod"
import {LoginUserSchema} from "@/schemas/customer/LoginUserSchema";
import {requiredFiledError} from "@/schemas";

const NameSchema = z.object({
    username: z.string().min(1, requiredFiledError)
})
export const RegisterSchema = z.union([LoginUserSchema, NameSchema])
export type RegisterData = z.infer<typeof RegisterSchema>

export const defaultRegisterSchema: RegisterData = {
    username: "", phoneNumber: "", password: ""
}