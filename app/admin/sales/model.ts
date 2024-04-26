import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ProductTableRow} from "@/types/dto/Table";

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

const getSalesFx = createEffect<void, ResponseShortSale[], Error>(getSales)
export const getSalesEvent = createEvent<void>()

export const $sales = createStore<ProductTableRow<ResponseShortSale>[]>([])

$sales.on(getSalesFx.doneData, (_, sales) => createTableRows(sales))

sample({
    clock: getSalesEvent,
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