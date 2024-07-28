import {getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {removeFromFavouritesFx} from "@/components/organisms/cards/product-price-card/model";

type ResponseUserFavorites = {
    products : ResponseProductSearch[],
    promos : ResponseProductSearch[]
}

const getFavourites = async (): Promise<ResponseUserFavorites> => {
    return getRequest("/favourite")
}

export const getFavouritesFx = createEffect<void, ResponseUserFavorites, Error>(getFavourites)
export const getFavouritesEvent = createEvent<void>()
export const $favourites = createStore<ResponseUserFavorites | null>(null)

$favourites.on(getFavouritesFx.doneData, (_, favourites) => favourites)

sample({
    clock: getFavouritesEvent,
    target: getFavouritesFx
})

sample({
    clock : removeFromFavouritesFx.doneData,
    target : getFavouritesFx
})