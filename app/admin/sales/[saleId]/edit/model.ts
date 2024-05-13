import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {CreateSaleData} from "@/schemas/admin/CreateSaleSchema";
import {CreateSaleRequest} from "@/app/admin/sales/new/model";
import {parseDate} from "@/components/organisms/popups/admin/order-page-filter-popup/model";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

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
    const {sale, images, promoId} = request
    return api.put("/admin/catalogue/v2/promo", {...sale, promoId : promoId, oldImagesUrl: images})
        .then(response => response.data)
}

const getPromo = async (id: number) => {
    return api.get('/admin/catalogue/promo', {params: {id}})
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

const editSaleFx = createEffect<CreateSaleRequest, void, Error>(editSale)
export const editSaleEvent = createEvent<{ data : CreateSaleData, promoId : number}>()

sample({
    clock: editSaleEvent,
    fn: (data) => convertSaleDataToRequest(data),
    target: editSaleFx
})

const convertSaleDataToRequest = (req : { data : CreateSaleData, promoId : number}): CreateSaleRequest => {
    const {promoId, data} = req
    return {
        sale: {
            name: data.name,
            crmGroup: data.crmGroup,
            crmCode: data.crmCode,
            description: data.description,
            deadline: '2024-01-01',
            products: data.productIdList,
            ruleList: data.ruleList.map(item => item.rule)
        },
        images: data.photos,
        promoId : promoId
    }
}