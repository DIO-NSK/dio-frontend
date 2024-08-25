import {CreateOrderDraftData} from "@/schemas/customer/checkout/CreateOrderDraftSchema";

export const defaultCheckoutFirstStepData: Partial<CreateOrderDraftData> = {
    email: '',
    firstName: "",
    surname: "",
    phoneNumber: "",
    address: {
        address: '',
        latitude: 0,
        longitude: 0,
        city: "",
        house: ""
    },
    addressId: undefined
}