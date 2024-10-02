import {api} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {createEffect, createEvent, createStore, sample} from "effector";
import {
    catalogPageDidMountEvent,
    CatalogueFilterParams,
    sendFiltersEvent,
    sendFiltersFx
} from "@/components/organisms/bars/catalog-left-sidebar/model";
import {TextLink} from "@/types/dto/text";
import {Breadcrumbs} from "@/types/dto/Breadcrumbs";
import {
    $adminProductBreadcrumbs
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productUrlMask]/model";
import {pending} from "patronum";

const getCategoryByName = async (categoryId : number) : Promise<ResponseProductSearch[]> => {
    return api.get("/catalogue/category", {params : {categoryId : categoryId}})
        .then(response => response.data)
}

const getCategoryBreadcrumbs = async (categoryId : number) : Promise<Breadcrumbs> => {
    return api.get("/catalogue/breadcrumb/category", {params : {categoryId : categoryId}})
        .then(response => response.data)
}

const getCategoryByNameFx = createEffect<number, ResponseProductSearch[], Error>(getCategoryByName)
export const getCategoryByNameEvent = createEvent<number>()
export const $products = createStore<ResponseProductSearch[]>([])

export const $productsAmount = createStore<number>(0)

export const getCategoryBreadcrumbsFx = createEffect<number, Breadcrumbs, Error>(getCategoryBreadcrumbs)
export const $categoryBreadcrumbsPending = pending([getCategoryBreadcrumbsFx])
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

$categoryBreadcrumbs
    .on(getCategoryBreadcrumbsFx.doneData, (_, breadcrumbs) => convertBreadcrumbsToList(breadcrumbs))
    .reset(catalogPageDidMountEvent)

$catalogCategoryName.on(getCategoryBreadcrumbsFx.doneData,
    (_, breadcrumbs) => breadcrumbs.categoryName)

sample({
    clock : [getCategoryBreadcrumbsEvent, getAdminCategoryBreadcrumbsEvent, getAdminProductBreadcrumbsEvent],
    target : getCategoryBreadcrumbsFx
})

$products
    .on(getCategoryByNameFx.doneData, (_, products) => products)
    .on(sendFiltersFx.doneData, (_, catalog) => catalog.products)
    .reset(catalogPageDidMountEvent)

$productsAmount.on(sendFiltersFx.doneData, (_, catalog) => catalog.count)

sample({
    clock : getCategoryByNameEvent,
    target : getCategoryByNameFx
})

sample({
    clock : sendFiltersEvent,
    filter : (params : CatalogueFilterParams) => params.filters.length === 0,
    fn: (params: CatalogueFilterParams) => +params.categoryId,
    target: getCategoryByNameFx
})

const convertAdminProductBreadcrumbsToList = (breadcrumbs : Breadcrumbs) : TextLink[] => {
    return [
        {text: "Разделы", link: `/admin/catalog`},
        {text: breadcrumbs.sectionName, link: `/admin/catalog/section/${breadcrumbs.sectionId}`},
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
        {text: breadcrumbs.sectionName, link: `/catalog/categories/${breadcrumbs.sectionId}`},
        {text: breadcrumbs.categoryName, link: `/catalog/${breadcrumbs.categoryId}`}
    ]
}