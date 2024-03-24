import {CreateOrderData} from "@/schemas/customer/checkout/CreateOrderSchema";

export const checkoutSecondStepData : CreateOrderData = {
    paymentMethod: "CASH",
    pickedProducts: [0],
    deliveryDate: {name : "", value : ""},
    deliveryTime: {name : "", value:  ""},
    orderId: 0
}