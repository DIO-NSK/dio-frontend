import {CreateOrderDraftData} from "@/schemas/customer/checkout/CreateOrderDraftSchema";

export const defaultCheckoutFirstStepData: CreateOrderDraftData = {
    entranceNumber: "",
    floor: "",
    comment: '',
    email: '',
    firstName: "",
    surname: "",
    phoneNumber: "",
    address: {
        address: '',
        latitude: 0,
        longitude: 0,
        flat: "",
        city: "",
        house: ""
    },
    addressId: undefined
}