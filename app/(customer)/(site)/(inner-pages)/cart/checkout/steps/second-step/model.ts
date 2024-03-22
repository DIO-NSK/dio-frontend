import { DeliveryDate } from "@/types/dto/user/order/DeliveryDate"
import {api, getRequest} from "@/api";
import {DeliveryTime} from "@/types/dto/user/order/DeliveryTime";
import {createEffect, createEvent, createStore, sample} from "effector";
import {CreateOrderData} from "@/schemas/customer/CreateOrderSchema";
import {checkoutSecondStepData} from "@/data/forms/checkoutSecondStepData";

export type GetDeliveryTimeParams = {
    orderId: number,
    localDate: string
}

const getDeliveryDate = async (orderId: number): Promise<DeliveryDate> => {
    return getRequest("/order/delivery/date", {params: {orderId: orderId}})
}

const getDeliveryTime = async (params: GetDeliveryTimeParams): Promise<DeliveryTime> => {
    return getRequest("/order/delivery/time", {params: params})
}

const getDeliveryDateFx = createEffect<number, DeliveryDate, Error>(getDeliveryDate)

const getDeliveryTimeFx = createEffect<GetDeliveryTimeParams, DeliveryTime, Error>(getDeliveryTime)
export const getDeliveryDateEvent = createEvent<number>()
export const getDeliveryTimeEvent = createEvent<GetDeliveryTimeParams>()

export const $deliveryDates = createStore<DeliveryDate>([])
export const $deliveryTimes = createStore<DeliveryTime>([])

export const $checkoutSecondStepData = createStore<CreateOrderData>(checkoutSecondStepData)
export const setCheckoutSecondStepDataEvent = createEvent<CreateOrderData>()

$deliveryDates.on(getDeliveryDateFx.doneData, (_, deliveryDates) => deliveryDates)
$deliveryTimes.on(getDeliveryTimeFx.doneData, (_, deliveryTimes) => deliveryTimes)
$checkoutSecondStepData.on(setCheckoutSecondStepDataEvent, (_, data) => data)

sample({
    clock: getDeliveryDateEvent,
    target: getDeliveryDateFx
})

sample({
    clock: getDeliveryTimeEvent,
    target: getDeliveryTimeFx
})