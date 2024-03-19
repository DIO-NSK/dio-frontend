import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

export type ResponseCartItem = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    mainImage: string,
    description: string,
    discountPercent: number,
}

export type ResponseUserCart = {
    sessionId: string,
    responseCart: {
        products: ResponseCartItem[],
        promos: ResponseCartItem[]
    }
}

const getCart = async (): Promise<ResponseUserCart> => {
    const sessionId = sessionStorage.getItem("SESSION_ID")
    return api.get("/cart", {params: {sessionId: sessionId}})
        .then(response => {
            if (response.data.sessionId !== sessionId) {
                sessionStorage.setItem("SESSION_ID", response.data.sessionId)
            }
            return response.data
        })
}

export const getCartFx = createEffect<void, ResponseUserCart, Error>(getCart)
export const getCartEvent = createEvent()

const removeProductFromCart = async (productName: string) => {
    const requestBody = {productName: productName, cartId: localStorage.getItem("cartId")}
    return api.delete("/cart", {data: requestBody})
        .then(response => {
            const sessionId = sessionStorage.getItem("SESSION_ID")
            if (response.data.sessionId !== sessionId) {
                sessionStorage.setItem("SESSION_ID", response.data.sessionId)
            }
        })
        .catch(error => {throw Error(error.response.data.message)})
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
    fn: _ => {},
    target: getCartFx
})

sample({
    clock: getCartEvent,
    target: getCartFx
})