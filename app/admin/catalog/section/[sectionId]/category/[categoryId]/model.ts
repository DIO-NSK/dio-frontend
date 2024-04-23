import {unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseAdminProduct} from "@/types/dto/admin/product/ResponseAdminProduct";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";

export const getProducts = async (categoryId: number): Promise<ResponseAdminProduct[]> => {
    const params = {params: {categoryId: categoryId}}
    return unauthorizedApi.get("/admin/catalogue/product/search", params)
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

export const getProductsFx = createEffect<number, ResponseAdminProduct[], Error>(getProducts)
export const $products = createStore<ResponseAdminProduct[]>([])
export const catalogProductPageDidMount = createEvent<number>()
export const changeProductsOrderEvent = createEvent<DragEndEvent>()

$products
    .on(getProductsFx.doneData, (_, products) => products)
    .on(changeProductsOrderEvent, (products, event) => handleDragEnd(event, products))

sample({
    clock: catalogProductPageDidMount,
    target: getProductsFx
})

