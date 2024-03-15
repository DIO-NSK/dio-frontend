import {api, getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

export type ResponseCartItem = {
    name: string,
    price: number,
    quantity: number,
    mainImage: string,
    description: string,
    discountPercent: number,
}

const getCart = async (): Promise<ResponseCartItem[]> => {
    return getRequest("/cart", {params: {userId: localStorage.getItem("userId")}})
}

const getCartFx = createEffect<void, ResponseCartItem[], Error>(getCart)
export const getCartEvent = createEvent<void>()

const removeProductFromCart = async (productName: string) => {
    const requestBody = {productName: productName, cartId: localStorage.getItem("cartId")}
    return api.delete("/cart", {data: requestBody})
        .catch(error => {throw Error(error.response.data.message)})
}

const removeProductFromCartFx = createEffect(removeProductFromCart)
export const removeProductFromCartEvent = createEvent<string>()

export const $removeProductFromCartError = createStore<string>("")
export const $cart = createStore<ResponseCartItem[] | null>(null)

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