import {z} from "zod"

export const LoginByPhoneSchema = z.object({
    phoneNumber : z.string().transform(s => s.replace(/[\s()-]/g, ''))
})

export type LoginByPhoneData = z.infer<typeof LoginByPhoneSchema>