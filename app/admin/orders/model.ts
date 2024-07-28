import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {AdminOrderTableRow} from "@/types/dto/Table";
import {filterOrdersFx} from "@/components/organisms/popups/admin/order-page-filter-popup/model";

const getOrders = async () => {
    return api.get("/admin/stat/last/order")
        .then(response => response.data)
}

const getOrdersFx = createEffect<void, AdminOrder[], Error>(getOrders)
export const getOrdersEvent = createEvent<void>()
export const $orders = createStore<AdminOrderTableRow[]>([])
export const $ordersStat = createStore<AdminOrderTableRow[]>([])

$orders.on(filterOrdersFx.doneData, (_, orders) => convertOrdersToTableRows(orders))
$ordersStat.on(getOrdersFx.doneData, (_, orders) => convertAnalyticsOrders(orders))

sample({
    clock: getOrdersEvent,
    target: getOrdersFx
})

const convertOrdersToTableRows = (orders: AdminOrder[]): AdminOrderTableRow[] => {
    return orders.map(order => ({id: order.id, item: {...order, products: (order as any).items}}))
}

const convertAnalyticsOrders = (orders: AdminOrder[]): AdminOrderTableRow[] => {
    return orders.map(order => ({id: order.id, item : order}))
}