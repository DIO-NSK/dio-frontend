import {ResponseBanner} from "@/app/admin/promo/models/banner.model";
import {api, unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

//region getBanners
export const getBanners = async () : Promise<ResponseBanner[]> => {
    return unauthorizedApi.get("/banner/all")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const getBannersFx = createEffect<void, ResponseBanner[], Error>(getBanners)
export const getBannersEvent = createEvent<void>()
export const $userBanners = createStore<ResponseBanner[]>([])

sample({
    clock : getBannersEvent,
    target : getBannersFx
})

$userBanners.on(getBannersFx.doneData, (_, banners) => banners)
//endregion

//region getDayProducts
const getDayProducts = async () : Promise<ResponseProductSearch[]> => {
    return api.get("/catalogue/product/day")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const getDayProductsFx = createEffect<void, ResponseProductSearch[], Error>(getDayProducts)
const getDayProductsEvent = createEvent<void>()
export const $userDayProducts = createStore<ResponseProductSearch[]>([])

sample({
    clock : getDayProductsEvent,
    target : getDayProductsFx
})

$userDayProducts.on(getDayProductsFx.doneData, (_, banners) => banners)
//endregion