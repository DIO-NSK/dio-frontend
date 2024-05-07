import {ResponseBanner} from "@/app/admin/promo/models/banner.model";
import {api, unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {ResponseOurWater} from "@/app/admin/promo/models/our_waters.model";
import {ResponsePromotion} from "@/app/admin/promo/models/promotion.model";

//region getBanners
export const getBanners = async (): Promise<ResponseBanner[]> => {
    return unauthorizedApi.get("/banner/all")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

export const getBannersFx = createEffect<void, ResponseBanner[], Error>(getBanners)
export const getBannersEvent = createEvent<void>()
export const $userBanners = createStore<ResponseBanner[]>([])

sample({
    clock: getBannersEvent,
    target: getBannersFx
})

$userBanners.on(getBannersFx.doneData, (_, banners) => banners)
//endregion

//region getDayProducts
const getDayProducts = async (): Promise<ResponseProductSearch[]> => {
    return api.get("/catalogue/product/day")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getDayProductsFx = createEffect<void, ResponseProductSearch[], Error>(getDayProducts)
export const getDayProductsEvent = createEvent<void>()

sample({
    clock : getDayProductsEvent,
    target : getDayProductsFx
})

export const $userDayProducts = createStore<ResponseProductSearch[]>([])

sample({
    clock: getDayProductsEvent,
    target: getDayProductsFx
})

$userDayProducts.on(getDayProductsFx.doneData, (_, banners) => banners)
//endregion

//region getOurWaters
const getOurWaters = async (): Promise<ResponseOurWater[]> => {
    return unauthorizedApi.get("/banner/water/all")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getUserOurWatersFx = createEffect<void, ResponseOurWater[], Error>(getOurWaters)
export const getUserOurWatersEvent = createEvent<void>()
export const $userOurWaters = createStore<ResponseOurWater[]>([])

sample({
    clock: getUserOurWatersEvent,
    target: getUserOurWatersFx
})

$userOurWaters.on(getUserOurWatersFx.doneData, (_, waters) => waters)
//endregion

//region getPromotions
const getPromotions = async (): Promise<ResponsePromotion[]> => {
    return unauthorizedApi.get("/banner/promotion/all")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getUserPromotionsFx = createEffect<void, ResponsePromotion[], Error>(getPromotions)
export const getUserPromotionsEvent = createEvent<void>()
export const $userPromotions = createStore<ResponsePromotion[]>([])

sample({
    clock: getUserPromotionsEvent,
    target: getUserPromotionsFx
})

$userPromotions.on(getUserPromotionsFx.doneData, (_, promotions) => promotions)
//endregion

//region getSaleProducts

const getSaleProducts = async () : Promise<ResponseProductSearch[]> => {
    return unauthorizedApi.get('/catalogue/product/filter?discountPercent=0')
        .then(response => response.data.products)
        .catch(error => {throw Error(error.response.data.message)})
}

const getSaleProductsFx = createEffect<void, ResponseProductSearch[], Error>(getSaleProducts)
export const getSaleProductsEvent = createEvent<void>()

sample({
    clock : getSaleProductsEvent,
    target : getSaleProductsFx
})

export const $saleProducts = createStore<ResponseProductSearch[]>([])

$saleProducts.on(getSaleProductsFx.doneData, (_, products) => products)