import {createEffect, createEvent, createStore, sample} from "effector";
import {Category} from "@/types/dto/Category";
import {api} from "@/api";
import {CreateCategoryData} from "@/schemas/admin/CreateCategorySchema";
import {$sections} from "@/models/admin/section";

const createCategory = async (args : {data : Category, id : number}) => {
    const params = {params: {sectionId: args.id}}
    return api.post("/admin/catalogue/category", args.data, params)
        .then(response => response.data)
}

const getCategories = async (sectionId: number) => {
    const params = {params: {sectionId: sectionId}}
    return api.get("/admin/catalogue/category", params)
        .then(response => response.data)
}

export const $isCreateSuccess = createStore<boolean>(false)
export const $categories = createStore<Category[]>([])
export const submitFormEvent = createEvent<CreateCategoryData>()
export const getCategoriesEvent = createEvent<number>()
export const pageDidMountEvent = createEvent<number>()

const createCategoryFx = createEffect(createCategory)
const getCategoriesFx = createEffect(getCategories)

const $sectionId = createStore<number>(0)

$isCreateSuccess.on(createCategoryFx.doneData, () => true)
$sectionId.on(pageDidMountEvent, (_, sectionId) => sectionId)
$categories.on(getCategoriesFx.doneData, (_, categories: Category[]) => categories)

sample({
    clock: submitFormEvent,
    source : {sectionId : $sectionId, sections : $sections},
    fn : (source, data : CreateCategoryData) => ({
        data : {
            name : data.name, sequenceNumber : source.sections.length,
            properties : data.properties.map((property) =>
                ({...property, valueType : property.valueType.name}))
        } as Category,
        id : source.sectionId
    }),
    target : createCategoryFx
})

sample({
    clock: [pageDidMountEvent, getCategoriesEvent],
    source: $sectionId,
    fn: (sectionId, _) => sectionId,
    target: getCategoriesFx
})
