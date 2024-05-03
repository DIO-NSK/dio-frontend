import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const LegalEntitySchema = z.object({
    password: z.string().min(1, requiredFiledError),
    fullName: z.string().min(1, requiredFiledError),
    organizationName: z.string().min(1, requiredFiledError),
    individualTaxNumber: z.string().min(1, requiredFiledError),
    phoneNumber: z.string().min(1, requiredFiledError),
    bankIdentificationCode: z.string().min(1, requiredFiledError),
    correspondentNumber: z.string().min(1, requiredFiledError),
    legalAddress: z.string().min(1, requiredFiledError),
    accountingCode: z.string().min(1, requiredFiledError),
    bankName: z.string().min(1, requiredFiledError),
    paymentAccount: z.string().min(1, requiredFiledError)
})

export type LegalEntityData = z.infer<typeof LegalEntitySchema>
