import {Order} from "@/types/dto/Order";

export const mockOrder : Order = {
    orderId : 328990,
    status : "pending",
    address : "ул. Никитина, д. 64, кв. 27",
    deliverDate : "27.10.23",
    deliveryTime : "19:00 — 21:00",
    totalPrice : 1192,
    products : ["1", "2", "3"]
}

export const mockOrderList : Order[] = [
    mockOrder, mockOrder, mockOrder, mockOrder
]