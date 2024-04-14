import {unauthorizedApi} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {createEffect, createEvent, createStore, sample} from "effector";
import {sendFiltersFx} from "@/components/organisms/bars/catalog-left-sidebar/model";
import {TextLink} from "@/types/dto/text";
import {Breadcrumbs} from "@/types/dto/Breadcrumbs";

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
export const $categoryBreadcrumbs = createStore<TextLink[]>([])
export const $catalogCategoryName = createStore<string>("")

$categoryBreadcrumbs.on(getCategoryBreadcrumbsFx.doneData,
    (_, breadcrumbs) => convertBreadcrumbsToList(breadcrumbs))

$catalogCategoryName.on(getCategoryBreadcrumbsFx.doneData,
    (_, breadcrumbs) => breadcrumbs.categoryName)

sample({
    clock : getCategoryBreadcrumbsEvent,
    target : getCategoryBreadcrumbsFx
})

$products
    .on(getCategoryByNameFx.doneData, (_, products) => products)
    .on(sendFiltersFx.doneData, (_, products) => products)

sample({
    clock : getCategoryByNameEvent,
    target : getCategoryByNameFx
})

const convertBreadcrumbsToList = (breadcrumbs: Breadcrumbs): TextLink[] => {
    return [
        {text: "Главная", link: "/"},
        {text: breadcrumbs.sectionName, link: breadcrumbs.sectionId},
        {text: breadcrumbs.categoryName, link: `/catalog/${breadcrumbs.categoryId}`}
    ]
}