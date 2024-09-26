import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {pending} from "patronum";
import {getCartFx} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

export type CreateOrderRequest = {
    orderId: number,
    paymentMethod: string,
    deliveryDate: string,
    routeCode: number,
    deliveryTime: string,
    pickedProducts: number[]
    bonuses ?: number;
}

const createOrder = async (request: CreateOrderRequest) => {
    return api.post("/order", request)
        .then(response => response.data)
}

export const createOrderFx = createEffect<CreateOrderRequest, string, Error>(createOrder)

export const $createOrderPending = pending([createOrderFx])
export const $createOrderStatus = createStore<boolean | null>(null)
export const thirdStepDidMountEvent = createEvent<void>()

sample({
    clock : createOrderFx.doneData,
    target : getCartFx
})

$createOrderStatus
    .reset(thirdStepDidMountEvent)
    .on(createOrderFx.doneData, () => true)
    .on(createOrderFx.failData, () => false)