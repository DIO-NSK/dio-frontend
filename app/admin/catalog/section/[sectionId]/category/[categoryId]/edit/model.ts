import {Category} from "@/types/dto/Category";
import {createEvent, createStore, sample} from "effector";
import {$categories, getCategoryFx} from "../../../model";
import {CreateCategoryData} from "@/schemas/admin/CreateCategorySchema";
import {combineEvents} from "patronum";
import {CharacteristicType} from "@/types/dto/Characteristic";

type PageSlug = {sectionId : number, categoryId : number}
export const editCategoryPageDidMountEvent = createEvent<PageSlug>()
export const $currentCategory = createStore<CreateCategoryData | null>(null)

const $pageSlug = createStore<PageSlug | null>(null)

$pageSlug.on(editCategoryPageDidMountEvent, (_, pageSlug) => pageSlug)

sample({
    clock: combineEvents([editCategoryPageDidMountEvent, getCategoryFx.doneData]),
    source : {categories : $categories, pageSlug : $pageSlug},
    fn : (source) => findAndCreateFormData(source),
    target: $currentCategory
})

sample({
    clock : editCategoryPageDidMountEvent,
    fn : (data : PageSlug) => data.sectionId,
    target : getCategoryFx
})

function findAndCreateFormData(source: {categories: Category[], pageSlug: PageSlug | null}) {

    const {categories, pageSlug} = source
    const categoryId = pageSlug?.categoryId!!
    const curCategory = categories.find(cat => cat.id === +categoryId)!!

    return {
        id: curCategory.id!!,
        name: curCategory.name,
        sequenceNumber: curCategory.sequenceNumber,
        properties: curCategory.properties.map(prop => ({
                ...prop,
                valueType: {
                    name: convertStatusToText(prop.valueType as CharacteristicType),
                    value: prop.valueType
                }
            })
        ),
    } as CreateCategoryData

}

function convertStatusToText(status : CharacteristicType) : string {
    switch (status) {
        case "TEXT": return "Текстовое значение"
        case "FLOAT": return "Дробное значние"
        case "INTEGER" : return "Целочисленное значение"
    }
}
