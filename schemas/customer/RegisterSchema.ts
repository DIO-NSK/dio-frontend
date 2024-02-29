import {z} from "zod"
import {LoginSchema} from "@/schemas/customer/LoginSchema";
import {requiredFiledError} from "@/schemas";

const NameSchema = z.object({
    username: z.string().min(1, requiredFiledError)
})
export const RegisterSchema = z.union([LoginSchema, NameSchema])
export type RegisterData = z.infer<typeof RegisterSchema>

export const defaultRegisterSchema: RegisterData = {
    username: "", phoneNumber: "", password: ""
}