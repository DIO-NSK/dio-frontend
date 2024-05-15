import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const CreateWorkerSchema = z.object({
    phoneNumber: z.string().transform(s => s.replace(/[\s()-]/g, '')),
    fullName: z.string().min(1, requiredFiledError),
    password: z.string().min(1, requiredFiledError),
})

export type CreateWorkerData = z.infer<typeof CreateWorkerSchema>