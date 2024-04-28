import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

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

const getAllDayProductsFx = createEffect<void, ResponseProductSearch[], Error>(getAllDayProducts)
export const getAllDayProductsEvent = createEvent<void>()

const addDayProductsFx = createEffect<number, void, Error>(addDayProducts)
export const addDayProductsEvent = createEvent<number>()

const deleteDayProductFx = createEffect<number, void, Error>(deleteDayProduct)
export const deleteDayProductEvent = createEvent<number>()

export const $dayProducts = createStore<ResponseProductSearch[]>([])

$dayProducts.on(getAllDayProductsFx.doneData, (_, products) => products)

sample({
    clock : deleteDayProductEvent,
    target : deleteDayProductFx
})

sample({
    clock: addDayProductsEvent,
    target: addDayProductsFx
})

sample({
    clock: [addDayProductsFx.doneData, deleteDayProductFx.doneData],
    target: getAllDayProductsFx
})

sample({
    clock: getAllDayProductsEvent,
    target: getAllDayProductsFx
})