import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {CategoryPropertyFormData, EditCategoryPropertyFormData} from "@/schemas/admin/CategoryPropertySchema";

export type CategoryPropertyProduct = {
    productId: number,
    image: string,
    name: string,
    crmCode: string,
    crmGroup: string,
    propertyValue: string
}

type CategoryPropertyState = {
    categoryName: string,
    propertyId: number,
    propertyName: string,
    propertyType: string,
    propertyValueType: string,
    productsProperties: CategoryPropertyProduct[]
}

const getCategoryPropertyState = async (id: number): Promise<CategoryPropertyState> => {
    return api.get('/admin/property', {params: {id: id}})
        .then(response => response.data)
}

const getCategoryPropertyProducts = async (id: number): Promise<CategoryPropertyProduct[]> => {
    return api.get('/admin/property/category', {params : {categoryId : id}})
        .then(response => response.data)
}

const editCategoryPropertyState = async (formData: CategoryPropertyFormData) => {

    const request = {
        ...formData,
        propertyType: convertNameToValueType(formData.propertyType.name),
        filledProperties: formData.filledProperties.map(p => ({value: p.value, productId: p.productId}))
    }

    return api.put('/admin/property', request)
        .then(response => response.data)
}

const createCategoryPropertyState = async (formData: EditCategoryPropertyFormData) => {

    const request = {
        ...formData,
        propertyType: convertNameToValueType(formData.propertyType.name),
        filledProperties: formData.filledProperties.map(p => ({value: p.value, productId: p.productId}))
    }

    return api.post('/admin/property', request)
        .then(response => response.data)
}

const getCategoryPropertyProductsFx = createEffect(getCategoryPropertyProducts)
export const getCategoryPropertyProductsEvent = createEvent<number>()
export const createCategoryPropertyStateFx = createEffect(createCategoryPropertyState)
export const editCategoryPropertyStateFx = createEffect(editCategoryPropertyState)

export const getCategoryPropertyStateFx = createEffect<number, CategoryPropertyState, Error>(getCategoryPropertyState)
export const getCategoryPropertyStateEvent = createEvent<number>()
export const $categoryPropertyState = createStore<CategoryPropertyState | null>(null)
export const $categoryPropertyProducts = createStore<CategoryPropertyProduct[]>([])

$categoryPropertyState.on(getCategoryPropertyStateFx.doneData, (_, state) => state)
$categoryPropertyProducts.on(getCategoryPropertyProductsFx.doneData, (_, products) => products)

sample({
    clock : getCategoryPropertyProductsEvent,
    target : getCategoryPropertyProductsFx
})

sample({
    clock: getCategoryPropertyStateEvent,
    target: getCategoryPropertyStateFx
})

function convertNameToValueType(name: string): string {
    return name === "Текстовое значение" ? "TEXT"
        : name === "Целочисленное значение" ? "NUMBER"
            : name === "Дробное значение" ? "FLOAT"
                : ""
}