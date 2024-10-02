import { api } from "@/api";
import { createEffect, createEvent, createStore, sample } from "effector";
import { CreateSaleRequest } from "@/app/admin/sales/new/model";
import { ResponseCartItem } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

export type PromoDetails = {
    name: string,
    crmGroup: string,
    crmCode: string,
    deadline: string,
    description: string,
    products: ResponseCartItem[],
    ruleList: string[],
    price: number,
    images: string[],
    isInvisible: boolean
}

const editSale = async (request: CreateSaleRequest): Promise<void> => {
    const { sale, images, promoId } = request

    const newSale = {
        ...sale,
        seoEntityDto: sale.seoEntityDto ? {
            ...sale.seoEntityDto,
            keywords: sale.seoEntityDto?.keywords.split(',')
        } : undefined
    }

    return api.put("/admin/catalogue/v2/promo", { ...newSale, promoId: promoId, oldImagesUrl: images })
        .then(response => response.data)
}

const getPromo = async (id: number) => {
    return api.get('/admin/catalogue/promo', { params: { id } })
        .then(response => response.data)
}

const getPromoFx = createEffect(getPromo)
export const getPromoEvent = createEvent<number>()

sample({
    clock: getPromoEvent,
    target: getPromoFx
})

export const $promoDetails = createStore<PromoDetails | null>(null)

$promoDetails.on(getPromoFx.doneData, (_, promo) => promo)

export const editSaleFx = createEffect<CreateSaleRequest, void, Error>(editSale)