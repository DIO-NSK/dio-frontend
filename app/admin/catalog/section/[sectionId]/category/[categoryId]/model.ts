import {api, unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseAdminProduct} from "@/types/dto/admin/product/ResponseAdminProduct";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";

type RequestChangeProducts = {
    categoryId: number,
    products: ResponseAdminProduct[]
}

export const getProducts = async (categoryId: number): Promise<ResponseAdminProduct[]> => {
    const params = {params: {categoryId: categoryId}}
    return unauthorizedApi.get("/admin/catalogue/product/search", params)
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const changeProductState = async (req: RequestChangeProducts) => {
    const ids = req.products.map(product => ({id: product.id}))
    return api.post("/admin/catalogue/product/state", ids, {params: {categoryId: req.categoryId}})
        .then(response => response.data)
}

const changeProductStateFx = createEffect<RequestChangeProducts, void, Error>(changeProductState)
export const changeProductStateEvent = createEvent<number>()

export const getProductsFx = createEffect<number, ResponseAdminProduct[], Error>(getProducts)
export const $products = createStore<ResponseAdminProduct[]>([])
export const catalogProductPageDidMount = createEvent<number>()
export const changeProductsOrderEvent = createEvent<DragEndEvent>()
export const deleteProductEvent = createEvent<number>()

export const $isProductsEditable = createStore<boolean>(false)
export const toggleEditableEvent = createEvent<void>()

$isProductsEditable.on(toggleEditableEvent, (state) => !state)

const $categoryId = createStore<number>(0)
$categoryId.on(catalogProductPageDidMount, (_, id) => id)

$products
    .on(getProductsFx.doneData, (_, products) => products)
    .on(changeProductsOrderEvent, (products, event) => handleDragEnd(event, products))
    .on(deleteProductEvent, (products, id) => products.filter(product => product.id !== id))

sample({
    clock: catalogProductPageDidMount,
    target: getProductsFx
})

sample({
    clock: changeProductStateFx.doneData,
    source: $categoryId,
    target: getProductsFx
})

sample({
    clock: changeProductStateEvent,
    source: $products,
    fn: (products, categoryId) => ({products: products, categoryId: categoryId}),
    target: changeProductStateFx
})

