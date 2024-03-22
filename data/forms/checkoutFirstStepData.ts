import {CreateOrderDraftData} from "@/schemas/customer/CreateOrderDraftSchema";

export const defaultCheckoutFirstStepData: CreateOrderDraftData = {
    userId: 0,
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