import {api} from "@/api";
import {createEffect, createStore} from "effector";
import {RequestAdminProduct} from "@/types/dto/RequestAdminProduct";

export const getProducts = async (categoryId: number) : Promise<RequestAdminProduct[]> => {
    return api.get("/admin/catalogue/product", {params: {categoryId: categoryId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const getProductsFx = createEffect<number, RequestAdminProduct[], Error>(getProducts)
const $products = createStore<RequestAdminProduct[]>([])

$products.on(getProductsFx.doneData, (_, products) => products)


