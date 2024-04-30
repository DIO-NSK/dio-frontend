import {unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {AdminOrderTableRow} from "@/types/dto/Table";
import {filterOrdersFx} from "@/components/organisms/popups/admin/order-page-filter-popup/model";

const getOrders = async () => {
    return unauthorizedApi.get("/admin/stat/last/order")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getOrdersFx = createEffect<void, AdminOrder[], Error>(getOrders)
export const getOrdersEvent = createEvent<void>()
export const $orders = createStore<AdminOrderTableRow[]>([])

$orders
    .on(getOrdersFx.doneData, (_, orders) => convertOrdersToTableRows(orders))
    .on(filterOrdersFx.doneData, (_, orders) => convertOrdersToTableRows(orders))

sample({
    clock: getOrdersEvent,
    target: getOrdersFx
})

const convertOrdersToTableRows = (orders: AdminOrder[]): AdminOrderTableRow[] => {
    return orders.map(order => ({id: order.id, item: order}))
}