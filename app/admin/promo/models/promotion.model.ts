import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";

export type RequestPromotion = {
    link: string,
    image: File,
    id?: number
}

export type ResponsePromotion = {
    promoId: number,
    image: string,
    id: number
}

const createPromotion = async (promotion: RequestPromotion) => {

    const formData = new FormData()
    formData.append("image", promotion.image)

    const lastSlashIndex = promotion.link.lastIndexOf('/') + 1;
    const id = promotion.link.slice(lastSlashIndex);

    return api.post("/admin/banner/promotion", formData, {
        params: {promotionId: id},
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)

}

const editPromotion = async (promotion: RequestPromotion) => {

    const formData = new FormData()
    formData.append("image", promotion.image)

    const lastSlashIndex = promotion.link.lastIndexOf('/') + 1;
    const id = promotion.link.slice(lastSlashIndex);

    const data = {promoId: id, promotionId: promotion.id}
    formData.append("promotionDto", new Blob([JSON.stringify(data)], {type: "application/json"}))

    return api.patch("/admin/banner/promotion", formData, {
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })

}

const changePromotionOrder = async (ids: { id: number }[]) => {
    return api.put("/admin/banner/promotion", ids)
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const changePromotionOrderFx = createEffect<{ id: number }[], void, Error>(changePromotionOrder)

const editPromotionFx = createEffect<RequestPromotion, void, Error>(editPromotion)
export const editPromotionEvent = createEvent<RequestPromotion>()

export const createPromotionFx = createEffect<RequestPromotion, void, Error>(createPromotion)

const getAllPromotions = async (): Promise<ResponsePromotion[]> => {
    return api.get("/admin/banner/promotion/all")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getAllPromotionsFx = createEffect<void, ResponsePromotion[], Error>(getAllPromotions)
export const getAllPromotionsEvent = createEvent<void>()
export const $promotions = createStore<ResponsePromotion[]>([])
export const setPromotionToEditEvent = createEvent<ResponsePromotion | null>()
export const changePromotionsOrderEvent = createEvent<DragEndEvent>()
export const $promotionToEdit = createStore<ResponsePromotion | null>(null)

$promotionToEdit
    .on(setPromotionToEditEvent, (_, promo) => promo)
    .reset(editPromotionFx.doneData)

$promotions
    .on(getAllPromotionsFx.doneData, (_, promos) => promos)
    .on(changePromotionsOrderEvent, (promos, event) => handleDragEnd(event, promos))
    .watch(console.log)

sample({
    clock: getAllPromotionsEvent,
    target: getAllPromotionsFx
})

sample({
    clock: [createPromotionFx.doneData, editPromotionFx.doneData],
    target: getAllPromotionsFx
})

sample({
    clock: editPromotionEvent,
    target: editPromotionFx
})

export const $editPromotionStatus = createStore<boolean | null>(null)
$editPromotionStatus
    .reset(setPromotionToEditEvent)
    .on(editPromotionFx.doneData, () => true)
    .on(editPromotionFx.failData, () => false)

const deletePromotion = async (promoId: number) => {
    return api.delete("/admin/banner/promotion", {params: {id: promoId}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.payload)
        })
}

const deletePromotionFx = createEffect<number, void, Error>(deletePromotion)
export const deletePromotionEvent = createEvent<number>()

sample({
    clock: deletePromotionEvent,
    target: deletePromotionFx
})

sample({
    clock: deletePromotionFx.doneData,
    target: getAllPromotionsFx
})

sample({
    clock: changePromotionsOrderEvent,
    source: $promotions,
    fn: (promotions) => promotions.map(item => ({id: item.id})),
    target: changePromotionOrderFx
})