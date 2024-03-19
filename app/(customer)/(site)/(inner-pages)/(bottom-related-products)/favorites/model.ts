import {getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseUserCart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

type ResponseUserFavorites = {
    products : ResponseProductSearch[],
    promos : ResponseProductSearch[]
}

const getFavourites = async (): Promise<ResponseUserFavorites> => {
    return getRequest("/favourite", {params: {id: localStorage.getItem("favouritesId")}})
}

const getFavouritesFx = createEffect<void, ResponseUserFavorites, Error>(getFavourites)
export const getFavouritesEvent = createEvent<void>()
export const $favourites = createStore<ResponseUserFavorites | null>(null)

$favourites.on(getFavouritesFx.doneData, (_, favourites) => favourites)

sample({
    clock: getFavouritesEvent,
    target: getFavouritesFx
})