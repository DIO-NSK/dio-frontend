import {Category} from "@/types/dto/Category";
import {api, unauthorizedApi} from "@/api";
import {CreateCategoryData} from "@/schemas/admin/CreateCategorySchema";
import {createEffect, createEvent, createStore, sample} from "effector";
import {TableRow} from "@/types/dto/Table";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";

const createCategory = async (request: { data: CreateCategoryData, sequenceNumber: number, id: number }) => {

    const mappedProperties = request.data.properties
        .map((property) => ({...property, valueType: property.valueType.value}))

    const mappedData: Category = {
        ...request.data,
        sequenceNumber: request.sequenceNumber,
        properties: mappedProperties
    } as Category

    const params = {params: {sectionId: request.id}}
    return unauthorizedApi.post("/admin/catalogue/category", mappedData, params)
        .then(response => response.data)
}

const getCategoryList = async (sectionId: number) => {
    const params = {params: {sectionId: sectionId}}
    return api.get("/admin/catalogue/category/search", params)
        .then(response => response.data)
}

const updateCategory = async (request: { categories: Category[], sectionId: number }) => {
    const params = {params: {sectionId: request.sectionId}}
    return unauthorizedApi.post("/admin/catalogue/category/v2", request.categories, params)
        .then(response => response.data)
}

export const deleteCategoryEvent = createEvent<number>()

export const changeCategoryOrderEvent = createEvent<DragEndEvent>()

export const saveChangesEvent = createEvent<void>()
export const cancelChangesEvent = createEvent<void>()

export const onCloseCategoryToDeleteEvent = createEvent<void>()
export const selectCategoryToDeleteEvent = createEvent<TableRow<string[]>>()
export const $categoryToDelete = createStore<TableRow<string[]> | null>(null)

export const updateCategoriesFx = createEffect(updateCategory)
export const createCategoryFx = createEffect(createCategory)
export const getCategoryFx = createEffect<number, Category[], Error>(getCategoryList)

export const pageDidMountEvent = createEvent<number>()

export const $categories = createStore<Category[]>([])
export const $sectionId = createStore<number>(0)
export const $creationStatus = createStore<"success" | "failure" | "pending" | "stale">("stale")
export const resetEditStatusEvent = createEvent()

$categoryToDelete
    .on(selectCategoryToDeleteEvent, (_, tableRow) => tableRow)
    .on(onCloseCategoryToDeleteEvent, (_,) => null)

$categories
    .on(getCategoryFx.doneData, (_, categories) => categories)
    .on(changeCategoryOrderEvent, (categories, event) => handleDragEnd(event, categories))

$creationStatus
    .on(createCategoryFx.doneData, () => "success")
    .on(createCategoryFx.failData, () => "failure")
    .reset(resetEditStatusEvent)

$creationStatus.watch(console.log)

$sectionId.on(pageDidMountEvent, (_, sectionId: number) => sectionId)

sample({
    clock: createCategoryFx.doneData,
    source: $sectionId,
    fn: (sectionId: number) => sectionId,
    target: getCategoryFx
})

sample({
    clock: deleteCategoryEvent,
    source: $categories,
    fn: (categories, categoryId) =>
        categories.filter(cat => cat.id !== categoryId),
    target: $categories
})

sample({
    clock: saveChangesEvent,
    source: {categories: $categories, sectionId: $sectionId},
    target: updateCategoriesFx
})

sample({
    clock: [cancelChangesEvent, updateCategoriesFx.doneData],
    source: $sectionId,
    fn: (sectionId: number) => sectionId,
    target: getCategoryFx
})

sample({
    clock: pageDidMountEvent,
    target: getCategoryFx
})
