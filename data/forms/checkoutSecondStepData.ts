import {CreateOrderData} from "@/schemas/customer/checkout/CreateOrderSchema";

export const checkoutSecondStepData: CreateOrderData = {
    paymentMethod: {name: "Картой", value: "CARD"},
    pickedProducts: [0],
    deliveryDate: {name: "", value: ""},
    deliveryTime: {name: "", value: ""},
    orderId: 0
}