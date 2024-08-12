import {api, getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProfileOrder} from "@/types/dto/user/order/ResponseProfileOrder";

type OrderInfo = {
    cardholderName: string,
    depositKopecks: number,
    orderStatus: string,
    amountKopecks: number
}

const getOrders = async (): Promise<ResponseProfileOrder[]> => getRequest("/order");

const getOrderInfo = async (orderToken : string) : Promise<OrderInfo> => {
    return api.get('/order/pay-status', {params : {orderId : orderToken}})
        .then(response => response.data);
}

const getOrdersFx = createEffect<void, ResponseProfileOrder[], Error>(getOrders)

export const getOrderInfoFx = createEffect<string, OrderInfo, Error>(getOrderInfo);

export const getOrdersEvent = createEvent<void>()

export const $orders = createStore<ResponseProfileOrder[]>([])

export const $orderToRepeat = createStore<ResponseProfileOrder | null>(null)

export const selectOrderToRepeatEvent = createEvent<ResponseProfileOrder>()

export const resetOrderToRepeatEvent = createEvent<void>()

$orderToRepeat
    .reset(resetOrderToRepeatEvent)
    .on(selectOrderToRepeatEvent, (_, order) => {
        console.log(order);
        return order
    })

$orders.on(getOrdersFx.doneData, (_, orders) => orders)

sample({
    clock: [getOrdersEvent, getOrderInfoFx.doneData],
    target: getOrdersFx
})