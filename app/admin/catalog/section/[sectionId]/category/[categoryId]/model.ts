import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseAdminProduct} from "@/types/dto/admin/product/ResponseAdminProduct";

export const getProducts = async (categoryId: number) : Promise<ResponseAdminProduct[]> => {
    const params = {params: {categoryId: categoryId}}
    return api.get("/admin/catalogue/product/search", params)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const getProductsFx = createEffect<number, ResponseAdminProduct[], Error>(getProducts)
export const $products = createStore<ResponseAdminProduct[]>([])
export const catalogProductPageDidMount = createEvent<number>()

$products.on(getProductsFx.doneData, (_, products) => products)

sample({
    clock : catalogProductPageDidMount,
    target : getProductsFx
})

