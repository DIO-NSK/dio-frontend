import {api, unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {getCartFx} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

type RequestAddCartProduct = {
    productId: number,
    quantityProduct : number
}

type RequestAddCartSale = {
    promoId: number,
    quantityPromo: number
}

export type RequestAddToCart = RequestAddCartSale | RequestAddCartProduct

//region addToCart
const addToCart = async (req: RequestAddToCart): Promise<string> => {
    return api.put("/cart", req)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const addToCartFx = createEffect<RequestAddToCart, string, Error>(addToCart)
export const addToCartEvent = createEvent<RequestAddToCart>()
export const $addToCartError = createStore<string>("")

sample({
    clock: addToCartEvent,
    target: addToCartFx
})

sample({
    clock : addToCartFx.doneData,
    target : getCartFx
})

//endregion

//region addToFavourites
const addToFavourites = async (productId: number) => {
    return api.put('/favourite', {productId})
        .then(response => response.data.id)
        .catch(error => {throw Error(error.response.data.message)})
}

const addToFavouritesFx = createEffect(addToFavourites)
export const addToFavouritesEvent = createEvent<number>()


$addToCartError.on(addToCartFx.failData, (_, error) => error.message)

sample({
    clock: addToFavouritesEvent,
    target: addToFavouritesFx
})

//endregion

//region removeFromFavourites

const removeFromFavourites = async (productId: number) => {
    return api.delete("/favourite", {data: {productId}})
        .then(response => response)
        .catch(error => {throw Error(error.response.data.message)})
}

export const removeFromFavouritesFx = createEffect(removeFromFavourites)
export const removeFromFavouritesEvent = createEvent<number>()

sample({
    clock: removeFromFavouritesEvent,
    target: removeFromFavouritesFx
})

//endregion

//region addAllToCart

const addAllToCart = async (productItemIds : number[]) => {
    return Promise.all(productItemIds.map(product => addToCart({productId : product, quantityProduct : 1})))
}

const addAllToCartFx = createEffect(addAllToCart)
export const addAllToCartEvent = createEvent<number[]>()

sample({
    clock : addAllToCartEvent,
    target : addAllToCartFx
})

//endregion
