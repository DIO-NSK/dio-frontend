import {CreateOrderDraftData} from "@/schemas/customer/checkout/CreateOrderDraftSchema";

export const defaultCheckoutFirstStepData: CreateOrderDraftData = {
    entrance: "",
    floor: "",
    comment: '',
    email: '',
    firstName: "",
    surname: "",
    phoneNumber: "",
    address: {
        address: '',
        latitude: 0,
        longitude: 0
    },
    addressId: undefined
}