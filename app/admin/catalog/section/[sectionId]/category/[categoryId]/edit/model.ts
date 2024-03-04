import {Category} from "@/types/dto/Category";
import {createEvent, createStore, sample} from "effector";
import {getCategoryFx} from "../../../model";
import {CreateCategoryData} from "@/schemas/admin/CreateCategorySchema";
import {combineEvents} from "patronum";
import {CharacteristicType} from "@/types/dto/Characteristic";

type PageSlug = { sectionId: number, categoryId: number }

export const editCategoryPageDidMountEvent = createEvent<PageSlug>()

const $pageSlug = createStore<PageSlug | null>(null)
export const $formData = createStore<CreateCategoryData | null>(null)

$formData.on(
    combineEvents([getCategoryFx.doneData, editCategoryPageDidMountEvent]),
    (_, clocks) => createFormData(clocks[1], clocks[0])
)

$pageSlug.on(editCategoryPageDidMountEvent, (_, pageSlug) => pageSlug)

sample({
    clock: editCategoryPageDidMountEvent,
    fn: (data: PageSlug) => data.sectionId,
    target: getCategoryFx,
})

function createFormData(pageSlug : PageSlug, categories : Category[]) : CreateCategoryData {
    const category = categories.find(cat => cat.id === +pageSlug.categoryId)!!
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
