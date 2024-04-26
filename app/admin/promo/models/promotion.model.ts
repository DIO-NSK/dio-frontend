import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

export type RequestPromotion = {
    link : string,
    image: File,
    id ?: number
}

type ResponsePromotion = {
    promotionId: number,
    image: string,
    id: number
}

const createPromotion = async (promotion: RequestPromotion) => {

    const formData = new FormData()
    formData.append("image", promotion.image)

    const id = promotion.link.slice(-1)

    return api.post("/admin/banner/promotion", formData, {
        params: {promotionId : id},
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })

}

const editPromotion = async (promotion: RequestPromotion) => {

    const formData = new FormData()
    formData.append("image", promotion.image)

    return api.patch("/admin/banner/promotion", formData, {
        params: promotion.id,
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })

}

export const editPromotionFx = createEffect(editPromotion)

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
export const setPromotionToEditEvent = createEvent<ResponsePromotion>()
export const $promotionToEdit = createStore<ResponsePromotion | null>(null)

$promotionToEdit.on(setPromotionToEditEvent, (_, promo) => promo)

$promotions.on(getAllPromotionsFx.doneData, (_, promos) => promos)

sample({
    clock: getAllPromotionsEvent,
    target: getAllPromotionsFx
})

sample({
    clock: [createPromotionFx.doneData, editPromotionFx.doneData],
    target: getAllPromotionsFx
})

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