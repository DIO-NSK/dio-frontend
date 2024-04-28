import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";
import {$ourWaters, changeOurWatersOrderEvent} from "@/app/admin/promo/models/our_waters.model";

const addDayProducts = async (id: number) => {
    return api.post("/admin/catalogue/product/day", null, {params: {productId: id}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const deleteDayProduct = async (id : number) => {
    return api.delete("/admin/catalogue/product/day", {params : {productId : id}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getAllDayProducts = async (): Promise<ResponseProductSearch[]> => {
    return api.get("/catalogue/product/day")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const changeDayProductsOrder = async (ids : {id : number}[]) => {
    return api.put("/admin/catalogue/product/day/state", ids)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const changeDayProductOrderFx = createEffect(changeDayProductsOrder)

const getAllDayProductsFx = createEffect<void, ResponseProductSearch[], Error>(getAllDayProducts)
export const getAllDayProductsEvent = createEvent<void>()

const addDayProductsFx = createEffect<number, void, Error>(addDayProducts)
export const addDayProductsEvent = createEvent<number>()

const deleteDayProductFx = createEffect<number, void, Error>(deleteDayProduct)
export const deleteDayProductEvent = createEvent<number>()
export const changeDayProductsOrderEvent = createEvent<DragEndEvent>()

export const $dayProducts = createStore<ResponseProductSearch[]>([])

$dayProducts
    .on(getAllDayProductsFx.doneData, (_, products) => products)
    .on(changeDayProductsOrderEvent, (products, event) => handleDragEnd(event, products))

sample({
    clock: changeDayProductsOrderEvent,
    source: $dayProducts,
    fn: (products) => products.map(item => ({id: item.id})),
    target: changeDayProductOrderFx
})

sample({
    clock : deleteDayProductEvent,
    target : deleteDayProductFx
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