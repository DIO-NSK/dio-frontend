import {unauthorizedApi} from "@/api";
import {ResponseAdminProduct} from "@/types/dto/admin/product/ResponseAdminProduct";
import {createEffect, createEvent, createStore, sample} from "effector";

const getProduct = async (productId: number): Promise<ResponseAdminProduct> => {
    return unauthorizedApi.get("/admin/catalogue/product", {params: {productId: productId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getProductFx = createEffect<number, ResponseAdminProduct, Error>(getProduct)
export const getProductToEditEvent = createEvent<number>()
export const $productToEdit = createStore<ResponseAdminProduct | null>(null)
export const setProductToEditIdEvent = createEvent<number>()
export const $productToEditId = createStore<number>(0)

$productToEditId.on(setProductToEditIdEvent, (_, id) => id)
$productToEdit.on(getProductFx.doneData, (_, product) => product)

sample({
    clock: getProductToEditEvent,
    target: getProductFx
})