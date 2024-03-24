import {getRequest} from "@/api";
import {createEffect} from "effector/effector.umd";
import {createEvent, createStore, sample} from "effector";
import {ResponseProduct} from "@/types/dto/user/product/ResponseProduct";
import {getCartFx} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {getFavouritesFx} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/favorites/model";
import {and} from "patronum";

const getProduct = async (productId: number): Promise<ResponseProduct> => {
    return getRequest("/catalogue/product/detail", {params: {productId: productId}})
}

const getProductFx = createEffect<number, ResponseProduct, Error>(getProduct)
export const getProductEvent = createEvent<number>()
export const $product = createStore<ResponseProduct | null>(null)
export const $productInformationIsDone = and([getProductFx.doneData, getCartFx.doneData, getFavouritesFx.doneData])

$product.on(getProductFx.doneData, (_, product) => product)

sample({
    clock: getProductEvent,
    target: [getProductFx, getCartFx, getFavouritesFx]
})