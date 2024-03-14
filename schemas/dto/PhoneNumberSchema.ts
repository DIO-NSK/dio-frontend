import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const PhoneNumberSchema = z.string()
    .min(1, requiredFiledError)
    .transform(s => s.replace(/[\s()-]/g, ''))