import {Category} from "@/types/dto/Category";
import {createEffect, createEvent, createStore, sample} from "effector";
import {CreateCategoryData} from "@/schemas/admin/CreateCategorySchema";
import {combineEvents} from "patronum";
import {CharacteristicType} from "@/types/dto/Characteristic";
import {api} from "@/api";

const getCategory = async (categoryId: number) : Promise<Category> => {
    return api.get("/admin/catalogue/category", {params: {categoryId: categoryId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getCategoryFx = createEffect<number, Category, Error>(getCategory)

export const editCategoryPageDidMountEvent = createEvent<number>()

const $categoryId = createStore<number>(0)
export const $formData = createStore<CreateCategoryData | null>(null)

$formData.on(
    combineEvents([getCategoryFx.doneData, editCategoryPageDidMountEvent]),
    (_, [category, _]) => createFormData(category)
)

$categoryId.on(editCategoryPageDidMountEvent, (_, pageSlug) => pageSlug)

sample({
    clock: editCategoryPageDidMountEvent,
    target: getCategoryFx,
})

function createFormData(category : Category): CreateCategoryData {
    return {
        id: category.id!!,
        name: category.name,
        sequenceNumber: category.sequenceNumber,
        properties: category.properties.map(prop => ({
                ...prop,
                valueType: {
                    name: convertStatusToText(prop.valueType as CharacteristicType),
                    value: prop.valueType
                }
            })
        ),
    } as CreateCategoryData
}

function convertStatusToText(status: CharacteristicType): string {
    switch (status) {
        case "TEXT":
            return "Текстовое значение"
        case "FLOAT":
            return "Дробное значние"
        case "INTEGER" :
            return "Целочисленное значение"
    }
}
