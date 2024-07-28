import {ResponseShortSale} from "@/app/admin/sales/model";
import {unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

const getSales = async () : Promise<ResponseShortSale[]> => {
    return unauthorizedApi.get('/catalogue/promo/all')
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getSalesFx = createEffect<void, ResponseShortSale[], Error>(getSales)
export const getSalesEvent = createEvent<void>()
export const $sales = createStore<ResponseShortSale[]>([])

$sales.on(getSalesFx.doneData, (_, sales) => sales)

sample({
    clock : getSalesEvent,
    target : getSalesFx
})