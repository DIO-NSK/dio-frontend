import {unauthorizedApi} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {createEffect, createEvent, createStore, sample} from "effector";
import {sendFiltersFx} from "@/components/organisms/bars/catalog-left-sidebar/model";
import {TextLink} from "@/types/dto/text";
import {Breadcrumbs} from "@/types/dto/Breadcrumbs";
import {
    $adminProductBreadcrumbs
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productId]/model";

const getCategoryByName = async (categoryId : number) : Promise<ResponseProductSearch[]> => {
    return unauthorizedApi.get("/catalogue/category", {params : {categoryId : categoryId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getCategoryBreadcrumbs = async (categoryId : number) : Promise<Breadcrumbs> => {
    return unauthorizedApi.get("/catalogue/breadcrumb/category", {params : {categoryId : categoryId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getCategoryByNameFx = createEffect<number, ResponseProductSearch[], Error>(getCategoryByName)
export const getCategoryByNameEvent = createEvent<number>()
export const $products = createStore<ResponseProductSearch[]>([])

const getCategoryBreadcrumbsFx = createEffect<number, Breadcrumbs, Error>(getCategoryBreadcrumbs)
export const getCategoryBreadcrumbsEvent = createEvent<number>()
export const getAdminCategoryBreadcrumbsEvent = createEvent<number>()
export const getAdminProductBreadcrumbsEvent = createEvent<number>()
export const $adminCategoryBreadcrumbs = createStore<TextLink[]>([])
export const $categoryBreadcrumbs = createStore<TextLink[]>([])
export const $catalogCategoryName = createStore<string>("")

$adminProductBreadcrumbs.on(getCategoryBreadcrumbsFx.doneData,
    (_, breadcrumbs) => convertAdminProductBreadcrumbsToList(breadcrumbs))

$adminCategoryBreadcrumbs.on(getCategoryBreadcrumbsFx.doneData,
    (_, breadcrumbs) => convertAdminBreadcrumbsToList(breadcrumbs))

$categoryBreadcrumbs.on(getCategoryBreadcrumbsFx.doneData,
    (_, breadcrumbs) => convertBreadcrumbsToList(breadcrumbs))

$catalogCategoryName.on(getCategoryBreadcrumbsFx.doneData,
    (_, breadcrumbs) => breadcrumbs.categoryName)

sample({
    clock : [getCategoryBreadcrumbsEvent, getAdminCategoryBreadcrumbsEvent, getAdminProductBreadcrumbsEvent],
    target : getCategoryBreadcrumbsFx
})

$products
    .on(getCategoryByNameFx.doneData, (_, products) => products)
    .on(sendFiltersFx.doneData, (_, products) => products)

sample({
    clock : getCategoryByNameEvent,
    target : getCategoryByNameFx
})

const convertAdminProductBreadcrumbsToList = (breadcrumbs : Breadcrumbs) : TextLink[] => {
    return [
        {text: "Разделы", link: `/admin/catalog`},
        {text: breadcrumbs.sectionName, link: `/admin/catalog/section/${breadcrumbs.categoryId}`},
        {text: breadcrumbs.categoryName, link: `/admin/catalog/section/${breadcrumbs.categoryId}/category/${breadcrumbs.categoryId}`},
    ]
}

const convertAdminBreadcrumbsToList = (breadcrumbs : Breadcrumbs) : TextLink[] => {
    return [
        {text: "Разделы", link: `/admin/catalog`},
        {text: breadcrumbs.sectionName, link: `/admin/catalog/section/${breadcrumbs.categoryId}`},
    ]
}

const convertBreadcrumbsToList = (breadcrumbs: Breadcrumbs): TextLink[] => {
    return [
        {text: "Главная", link: "/"},
        {text: breadcrumbs.sectionName, link: breadcrumbs.sectionId},
        {text: breadcrumbs.categoryName, link: `/catalog/${breadcrumbs.categoryId}`}
    ]
}