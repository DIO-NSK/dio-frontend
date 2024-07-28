import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const LegalSettingsSchema = z.object({
    email : z.string().email().min(1, requiredFiledError).or(z.null()).optional(),
    firstName: z.string().min(1, requiredFiledError),
    lastName: z.string().min(1, requiredFiledError),
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

export type LegalSettingsData = z.infer<typeof LegalSettingsSchema>