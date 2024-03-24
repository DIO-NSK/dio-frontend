import {api} from "@/api";
import {CreateOrderData} from "@/schemas/customer/checkout/CreateOrderSchema";
import {createEffect, createEvent, sample} from "effector";
import {pending} from "patronum";
import {$checkoutSecondStepData} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/second-step/model";

type CreateOrderRequest = {
    orderId: number,
    paymentMethod: string,
    deliveryDate: string,
    routeCode: number,
    deliveryTime: string,
    pickedProducts: number[]
}

const createOrder = async (request: CreateOrderRequest) => {
    return api.post("/order", request)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const createOrderFx = createEffect<CreateOrderRequest, void, Error>(createOrder)
export const createOrderEvent = createEvent<void>()
export const $createOrderPending = pending([createOrderFx])

sample({
    clock: createOrderEvent,
    source: $checkoutSecondStepData,
    fn: (data) => convertFormDataToRequest(data),
    target: createOrderFx
})

const convertFormDataToRequest = (data: CreateOrderData): CreateOrderRequest => {
    return ({
        orderId: data.orderId,
        pickedProducts: data.pickedProducts,
        paymentMethod: data.paymentMethod,
        deliveryTime: data.deliveryTime.name,
        deliveryDate: data.deliveryDate.value,
        routeCode: +data.deliveryTime.value
    }) as CreateOrderRequest
}