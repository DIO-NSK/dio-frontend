import {z} from "zod"
import {requiredFiledError} from "@/schemas/CheckoutFormSchema";

const onlyNumbersRegEx = /^\d+$/

export const onlyNumbersError = "Поле должно содержать только цифры"

export const LegalEntitySchema = z.object({
    companyName: z.string().min(1, requiredFiledError),
    legalAddress: z.string().min(1, requiredFiledError),
    ITN: z.string().min(1, requiredFiledError)
        .regex(onlyNumbersRegEx, onlyNumbersError),
    reasonCode: z.string().min(1, requiredFiledError)
        .regex(onlyNumbersRegEx, onlyNumbersError),
    contactPerson: z.string().min(1, requiredFiledError),
    bankName: z.string().min(1, requiredFiledError),
    BIC: z.string().min(1, requiredFiledError)
        .regex(onlyNumbersRegEx, onlyNumbersError),
    bankAccount: z.string().min(1, requiredFiledError)
        .min(1, onlyNumbersError),
    correspondingAccount: z.string().min(1, requiredFiledError)
        .min(1, onlyNumbersError)
})

export type LegalEntityData = z.infer<typeof LegalEntitySchema>
export const defaultLegalEntityData: LegalEntityData = {
    companyName: "",
    legalAddress: "",
    ITN: "",
    reasonCode: "",
    contactPerson: "",
    bankName: "",
    BIC: "",
    bankAccount: "",
    correspondingAccount: ""
}