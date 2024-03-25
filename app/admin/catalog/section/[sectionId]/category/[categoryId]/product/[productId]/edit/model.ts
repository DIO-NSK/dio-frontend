import {unauthorizedApi} from "@/api";
import {ResponseAdminProduct} from "@/types/dto/admin/product/ResponseAdminProduct";
import {createEffect, createEvent, createStore, sample} from "effector";
import {CreateProductData} from "@/schemas/admin/CreateProductSchema";

type EditProductParams = {
    productId : number,
    product : CreateProductData
}

const getProduct = async (productId: number): Promise<ResponseAdminProduct> => {
    return unauthorizedApi.get("/admin/catalogue/product", {params: {productId: productId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const editProduct = async (reqParams : EditProductParams) => {

    const {product, productId} = reqParams
    const formData = new FormData()

    product.photos.map(photo => formData.append("images", photo))
    formData.append("product", new Blob([JSON.stringify(product)], {type: "application/json"}))

    return unauthorizedApi.put("/admin/catalogue/product", formData, {
        params: {productId: productId},
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})

}

const editProductFx = createEffect(editProduct)
export const editProductEvent = createEvent<EditProductParams>()

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

sample({
    clock: editProductEvent,
    target : editProductFx
})