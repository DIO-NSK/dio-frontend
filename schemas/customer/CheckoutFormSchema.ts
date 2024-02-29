import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export enum CheckoutPaymentType {
    Online = "online",
    Offline = "offline"
}

const SelectItemSchema = z.object({
    name : z.string().min(1, requiredFiledError),
    value : z.string().min(1, requiredFiledError)
})

export const CheckoutFormSchema = z.object({
    name: z.string()
        .min(1, requiredFiledError),
    surname: z.string()
        .min(1, requiredFiledError),
    phoneNumber: z.string()
        .min(1, requiredFiledError),
    email: z.string()
        .min(1, requiredFiledError)
        .email("Почта введена некорректно"),
    city: z.string()
        .min(1, requiredFiledError),
    street: z.string()
        .min(1, requiredFiledError),
    houseNumber: z.string()
        .min(1, requiredFiledError),
    apartmentNumber: z.string()
        .min(1, requiredFiledError),
    doorway: z.string()
        .min(1, requiredFiledError),
    floor: z.string()
        .min(1, requiredFiledError),
    deliveryDate: z.string()
        .min(1, requiredFiledError),
    deliveryTime: SelectItemSchema,
    paymentType: z.nativeEnum(CheckoutPaymentType),
    additional: z.string()
})

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>

export const checkoutFormDefaultValues: CheckoutFormData = {
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    city: "",
    street: "",
    houseNumber: "",
    apartmentNumber: "",
    doorway: "",
    floor: "",
    deliveryDate: "",
    deliveryTime: {name : "", value : ""},
    paymentType: CheckoutPaymentType.Online,
    additional : ""
}
