import {getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseUserCart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

const getFavourites = async (): Promise<ResponseUserCart> => {
    return getRequest("/favourite", {params: {id: localStorage.getItem("favouritesId")}})
}

const getFavouritesFx = createEffect<void, ResponseUserCart, Error>(getFavourites)
export const getFavouritesEvent = createEvent<void>()
export const $favourites = createStore<ResponseUserCart | null>(null)

$favourites.on(getFavouritesFx.doneData, (_, favourites) => favourites)

sample({
    clock: getFavouritesEvent,
    target: getFavouritesFx
})