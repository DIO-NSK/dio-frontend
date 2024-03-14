import {api, getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

export type ResponseUserProduct = {
    discountPercent: number
} & ResponseUserPromo

export type ResponseUserPromo = {
    id : number,
    name: string,
    description: string,
    oldPrice: number,
    newPrice: number,
    quantity: number,
    mainImage: string
}

export type ResponseUserCart = {
    products: ResponseUserProduct[],
    promos: ResponseUserPromo[]
}

const getCart = async (): Promise<ResponseUserCart> => {
    return getRequest("/cart", {params: {userId: localStorage.getItem("userId")}})
}

const getCartFx = createEffect<void, ResponseUserCart, Error>(getCart)
export const getCartEvent = createEvent<void>()

const removeProductFromCart = async (productName: string) => {
    const requestBody = {productName: productName, cartId: localStorage.getItem("cartId")}
    return api.delete("/cart", {data: requestBody})
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const removeProductFromCartFx = createEffect(removeProductFromCart)
export const removeProductFromCartEvent = createEvent<string>()

export const $removeProductFromCartError = createStore<string>("")
export const $cart = createStore<ResponseUserCart | null>(null)

$cart.on(getCartFx.doneData, (_, cart) => cart)
$removeProductFromCartError.on(removeProductFromCartFx.failData, (_, error) => error.message)

sample({
    clock: removeProductFromCartEvent,
    target: removeProductFromCartFx
})

sample({
    clock: removeProductFromCartFx.doneData,
    target: getCartFx
})

sample({
    clock: getCartEvent,
    target: getCartFx
})