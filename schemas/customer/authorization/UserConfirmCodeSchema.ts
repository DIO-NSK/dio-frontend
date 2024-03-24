import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const UserConfirmCodeSchema = z.object({
    phoneNumber : z.string().min(1, requiredFiledError),
    code : z.string().min(1, requiredFiledError)
})

export type UserConfirmCodeData = z.infer<typeof UserConfirmCodeSchema>