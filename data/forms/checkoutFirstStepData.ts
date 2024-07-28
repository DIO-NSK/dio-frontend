import {CreateOrderDraftData} from "@/schemas/customer/checkout/CreateOrderDraftSchema";

export const defaultCheckoutFirstStepData: CreateOrderDraftData = {
    firstName: "",
    surname: "",
    phoneNumber: "",
    email: "",
    city: "",
    street: "",
    houseNumber: "",
    flatNumber: "",
    entranceNumber: "",
    floor: "",
    addressId: undefined
}