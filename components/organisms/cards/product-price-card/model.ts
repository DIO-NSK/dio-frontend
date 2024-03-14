import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {persist} from "effector-storage/local";


//region addToCart
const addToCart = async (productId: number) => {

    const requestBody = {
        userId: +localStorage.getItem("userId")!!,
        productId: productId,
        quantity: 1
    }

    return api.put("/cart", requestBody)
        .then(response => response.data.id)
        .catch(error => {throw Error(error.response.data.message)})
}

const addToCartFx = createEffect<number, number, Error>(addToCart)
export const addToCartEvent = createEvent<number>()
export const $cardId = createStore<number>(0)
export const $addToCartError = createStore<string>("")

persist({
    store : $cardId,
    key : "cartId"
})

sample({
    clock: addToCartEvent,
    target: addToCartFx
})

//endregion

//region addToFavourites
const addToFavourites = async (productId : number) => {
    const requestBody = {
        userId: +localStorage.getItem("userId")!!,
        productId: productId,
    }
    return api.put('/favourite', requestBody)
        .then(response => response.data.id)
        .catch(error => {throw Error(error.response.data.message)})
}

const addToFavouritesFx = createEffect(addToFavourites)
export const addToFavouritesEvent = createEvent<number>()
export const $favouritesId = createStore<number>(0)

$favouritesId.on(addToFavouritesFx.doneData, (_, favouritesId) => favouritesId)
$cardId.on(addToCartFx.doneData, (_, cartId) => cartId)
$addToCartError.on(addToCartFx.failData, (_, error) => error.message)

persist({
    key : "favouritesId",
    store : $favouritesId
})

sample({
    clock : addToFavouritesEvent,
    target : addToFavouritesFx
})

//endregion

//region removeFromFavourites

const removeFromFavourites = async (productId : number) => {
    return api.delete("/favourite", {params : {id : productId}})
        .catch(error => {throw Error(error.response.data.message)})
}

const removeFromFavouritesFx = createEffect(removeFromFavourites)
export const removeFromFavouritesEvent = createEvent<number>()

sample({
    clock : removeFromFavouritesEvent,
    target : removeFromFavouritesFx
})

//endregion
