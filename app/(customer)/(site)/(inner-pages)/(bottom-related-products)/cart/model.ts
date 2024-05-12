import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {debounce} from "patronum";

export type ResponseCartItem = {
    productId: number,
    productItemId: number,
    name: string,
    price: number,
    quantity: number,
    mainImage: string,
    description: string,
    discountPercent: number,
    inFavourites: boolean,
    inStock: boolean
}

export type ResponseCartSaleItem = {
    promoId : number,
    promoItemId : number,
    description : string,
    mainImage : string
    name : string,
    price : number
    products : ResponseCartItem[]
    quantity : number
    rules : string[],
    duration : string
}

export type ResponseUserCart = {
    products: ResponseCartItem[],
    promos: ResponseCartSaleItem[]
}

export type RequestEditProductParams = {
    productId: number,
    quantityProduct: number
}

export type RequestRemoveCart = { productId: number } | { promoId: number }

const getCart = async (): Promise<ResponseUserCart> => {
    return api.get("/cart")
        .then(response => response.data)
}

export const getCartFx = createEffect<void, ResponseUserCart, Error>(getCart)
export const getCartEvent = createEvent()

const removeProductFromCart = async (req : RequestRemoveCart) => {
    return api.delete("/cart", {data: req})
        .then(response => response.data)
}

const removeProductFromCartFx = createEffect(removeProductFromCart)
export const removeProductFromCartEvent = createEvent<RequestRemoveCart>()

export const removeSaleFromCartEvent = createEvent<number>()

sample({
    clock : removeSaleFromCartEvent,
    fn : (saleId : number) => ({promoId : saleId}),
    target : removeProductFromCartFx
})

export const $removeProductFromCartError = createStore<string>("")
export const $cart = createStore<ResponseUserCart | null>(null)

$cart.on(getCartFx.doneData, (_, cart) => cart)
$removeProductFromCartError.on(removeProductFromCartFx.failData, (_, error) => error.message)

const editProductAmount = async (params: RequestEditProductParams) => {
    return api.put("/cart/edit", params)
        .then(response => response.data)
}

const editProductAmountFx = createEffect(editProductAmount)
export const editProductAmountEvent = createEvent<RequestEditProductParams>()
const debouncedEditProductAmountEvent = debounce(editProductAmountEvent, 400)

sample({
    clock: debouncedEditProductAmountEvent,
    target: editProductAmountFx
})

sample({
    clock: removeProductFromCartEvent,
    target: removeProductFromCartFx
})

sample({
    clock: [removeProductFromCartFx.doneData, editProductAmountFx.doneData],
    fn: _ => {},
    target: getCartFx
})

sample({
    clock: getCartEvent,
    target: getCartFx
})