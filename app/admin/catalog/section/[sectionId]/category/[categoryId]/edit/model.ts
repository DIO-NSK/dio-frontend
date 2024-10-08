import { Category, CategoryProperty } from "@/types/dto/Category";
import { createEffect, createEvent, createStore, sample } from "effector";
import { CreateCategoryData } from "@/schemas/admin/CreateCategorySchema";
import { combineEvents } from "patronum";
import { api, unauthorizedApi } from "@/api";

export type ChangeCategoryRequest = {
    id: number,
    name: string,
    sequenceNumber: number,
    properties: CategoryProperty[],
    canBeDeleted?: boolean,
    image: string,
}

const getCategory = async (categoryId: number): Promise<Category> => {
    return api.get("/admin/catalogue/category", { params: { categoryId: categoryId } })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const changeCategory = async (req: ChangeCategoryRequest) => {
    const { image, ...request } = req as any;

    const resultRequest = {
        ...request,
        seoEntityDto: request?.seoEntityDto ? {
            ...request.seoEntityDto,
            keywords: request.seoEntityDto?.keywords.split(',')
        } : undefined
    }

    return api.post('/admin/catalogue/category/change/with-image', resultRequest, {
        params: {
            image: image
        }
    })
        .then(response => response.data)
}

export const changeCategoryFx = createEffect<ChangeCategoryRequest, void, Error>(changeCategory)

const getCategoryFx = createEffect<number, Category, Error>(getCategory)

export const editCategoryPageDidMountEvent = createEvent<number>()

const $categoryId = createStore<number>(0)

export const $formData = createStore<CreateCategoryData | null>(null)

$formData.on(
    combineEvents([getCategoryFx.doneData, editCategoryPageDidMountEvent]),
    (_, [category, pageSlug]) => createFormData(category)
)

$categoryId.on(editCategoryPageDidMountEvent, (_, pageSlug) => pageSlug)

sample({
    clock: editCategoryPageDidMountEvent,
    target: getCategoryFx,
})

function createFormData(category: Category) {
    return {
        id: category.id!!,
        name: category.name,
        sequenceNumber: category.sequenceNumber,
        properties: category.properties.map(prop => ({
            ...prop,
            propertyId: prop.id,
            valueType: {
                name: prop.valueType,
                value: convertNameToValueType(prop.valueType)
            }
        })
        ),
        seoId: (category as any)?.seoId,
        isNeedParsing: category.isNeedParsing,
        image: category.image
    } as any
}

function convertNameToValueType(name: string): string {
    return name === "Текстовое значение" ? "TEXT"
        : name === "Целочисленное значение" ? "NUMBER"
            : name === "Дробное значение" ? "FLOAT"
                : ""
}
