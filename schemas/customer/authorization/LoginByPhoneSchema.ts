import {z} from "zod"

export const LoginByPhoneSchema = z.object({
    phoneNumber : z.string().transform(s => s.replace(/[\s()-]/g, '')),
    captchaToken : z.string()
})

export type LoginByPhoneData = z.infer<typeof LoginByPhoneSchema>