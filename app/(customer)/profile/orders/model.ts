import {getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProfileOrder} from "@/types/dto/user/order/ResponseProfileOrder";

const getOrders = async (): Promise<ResponseProfileOrder[]> => getRequest("/order")

const getOrdersFx = createEffect<void, ResponseProfileOrder[], Error>(getOrders)
export const getOrdersEvent = createEvent<void>()
export const $orders = createStore<ResponseProfileOrder[]>([])

$orders.on(getOrdersFx.doneData, (_, orders) => orders)

sample({
    clock: getOrdersEvent,
    target: getOrdersFx
})