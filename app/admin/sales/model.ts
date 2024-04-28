import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ProductTableRow} from "@/types/dto/Table";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";

export type ResponseShortSale = {
    id: number,
    name: string,
    discount: number,
    image: string
}

const getSales = async (): Promise<ResponseShortSale[]> => {
    return api.get("/admin/catalogue/promo/all")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const changeSalesOrder = async (ids : {id : number}[]) => {
    return api.put("/admin/catalogue/promo/state", ids)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const changeSalesOrderFx = createEffect<{id : number}[], void, Error>(changeSalesOrder)
export const changeSalesOrderEvent = createEvent<void>()

const getSalesFx = createEffect<void, ResponseShortSale[], Error>(getSales)
export const getSalesEvent = createEvent<void>()

export const $sales = createStore<ProductTableRow<ResponseShortSale>[]>([])
export const changeSalesRowOrder = createEvent<DragEndEvent>()

$sales
    .on(getSalesFx.doneData, (_, sales) => createTableRows(sales))
    .on(changeSalesRowOrder, (sales, event) => handleDragEnd(event, sales))

sample({
    clock : changeSalesOrderEvent,
    source: $sales,
    fn : (sales) => sales.map(item => ({id : item.id})),
    target : changeSalesOrderFx
})

sample({
    clock: [getSalesEvent, changeSalesOrderFx.doneData],
    target: getSalesFx
})

const createTableRows = (sales: ResponseShortSale[]) => sales.map((sale) => ({
    item: sale,
    id: sale.id,
    sequenceNumber: sale.id,
    itemsWidth: {
        image: "col-span-4",
        discount: "col-span-1",
        name: "",
        id: ""
    },
}))