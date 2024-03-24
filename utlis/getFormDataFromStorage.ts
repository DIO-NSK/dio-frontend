import {checkoutFormDefaultValues} from "@/schemas/customer/checkout/CheckoutFormSchema";

export const getFormDataFromStorage = <T, >(itemKey: string): T => {
    const jsonString: string | null = window.localStorage.getItem(itemKey)
    if (!jsonString) return checkoutFormDefaultValues as T
    return JSON.parse(jsonString)
}