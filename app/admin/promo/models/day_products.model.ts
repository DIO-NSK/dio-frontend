import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";

type DayProduct = {
    productDayId: number
} & ResponseProductSearch

const addDayProducts = async (id: number) => {
    return api.post("/admin/catalogue/product/day", null, {params: {productId: id}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const deleteDayProduct = async (id: number) => {
    return api.delete("/admin/catalogue/product/day", {params: {productId: id}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getAllDayProducts = async (): Promise<DayProduct[]> => {
    return api.get("/catalogue/product/day")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const changeDayProductsOrder = async (ids: { id: number }[]) => {
    return api.put("/admin/catalogue/product/day/state", ids)
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const changeDayProductOrderFx = createEffect(changeDayProductsOrder)

const getAllDayProductsFx = createEffect<void, DayProduct[], Error>(getAllDayProducts)
export const getAllDayProductsEvent = createEvent<void>()

const addDayProductsFx = createEffect<number, void, Error>(addDayProducts)
export const addDayProductsEvent = createEvent<number>()

const deleteDayProductFx = createEffect<number, void, Error>(deleteDayProduct)
export const deleteDayProductEvent = createEvent<number>()
export const changeDayProductsOrderEvent = createEvent<DragEndEvent>()

export const $dayProducts = createStore<DayProduct[]>([])

$dayProducts
    .on(getAllDayProductsFx.doneData, (_, products) => products)
    .on(changeDayProductsOrderEvent, (products, event) => handleDragEnd(event, products, "productDayId"))

sample({
    clock: changeDayProductsOrderEvent,
    source: $dayProducts,
    fn: (products) => products.map(item => ({id: item.productDayId})),
    target: changeDayProductOrderFx
})

sample({
    clock: deleteDayProductEvent,
    source : $dayProducts,
    fn : (products, dayProductId) => {
        const productToDelete = products.find(item => item.productDayId === dayProductId)!!
        return productToDelete.id
    },
    target: deleteDayProductFx
})

sample({
    clock: addDayProductsEvent,
    target: addDayProductsFx
})

sample({
    clock: [addDayProductsFx.doneData, deleteDayProductFx.doneData, changeDayProductOrderFx.doneData],
    target: getAllDayProductsFx
})

sample({
    clock: getAllDayProductsEvent,
    target: getAllDayProductsFx
})