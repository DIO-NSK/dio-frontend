import {getRequest, unauthorizedApi} from "@/api";
import {createEffect} from "effector/effector.umd";
import {createEvent, createStore, sample} from "effector";
import {ResponseProduct} from "@/types/dto/user/product/ResponseProduct";
import {getCartFx} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {getFavouritesFx} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/favorites/model";
import {TextLink} from "@/types/dto/text";
import {Breadcrumbs} from "@/types/dto/Breadcrumbs";

const getBreadcrumbs = async (productId: number): Promise<Breadcrumbs> => {
    return unauthorizedApi.get("/catalogue/breadcrumb/product", {params: {productId: productId}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.result)
        })
}

const getBreadcrumbsFx = createEffect<number, Breadcrumbs, Error>(getBreadcrumbs)
export const getBreadcrumbsEvent = createEvent<number>()

export const $adminProductBreadcrumbs = createStore<TextLink[]>([])
export const $breadcrumbs = createStore<TextLink[]>([])

$breadcrumbs.on(getBreadcrumbsFx.doneData, (_, data) => convertBreadcrumbsToList(data))

sample({
    clock: getBreadcrumbsEvent,
    target: getBreadcrumbsFx
})

const getProduct = async (productId: number): Promise<ResponseProduct> => {
    return getRequest("/catalogue/product/detail", {params: {productId: productId}})
}

export const getProductFx = createEffect<number, ResponseProduct, Error>(getProduct)
export const getProductEvent = createEvent<number>()

export const productPageDidMountEvent = createEvent()
export const $product = createStore<ResponseProduct | null>(null)

$product
    .reset(productPageDidMountEvent)
    .on(getProductFx.doneData, (_, product) => product)

sample({
    clock: getProductEvent,
    target: [getProductFx, getCartFx, getFavouritesFx]
})

const convertBreadcrumbsToList = (breadcrumbs: Breadcrumbs): TextLink[] => {
    return [
        {text: "Главная", link: "/"},
        {text: breadcrumbs.sectionName, link: breadcrumbs.sectionId},
        {text: breadcrumbs.categoryName, link: `/catalog/${breadcrumbs.categoryId}`}
    ]
}