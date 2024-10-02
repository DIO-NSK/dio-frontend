import { api } from "@/api";
import { createEffect, createEvent, sample } from "effector";
import { AdminSale } from "@/types/dto/AdminSale";
import { CreateSaleData } from "@/schemas/admin/CreateSaleSchema";

export type CreateSaleRequest = {
    sale: any,
    images: string[],
    promoId?: number
}

const createSale = async (request: CreateSaleRequest): Promise<void> => {
    const { sale, images } = request as any;

    const newSale = {
        ...sale,
        seoEntityDto: sale.seoEntityDto ? {
            ...sale.seoEntityDto,
            keywords: sale.seoEntityDto?.keywords.split(',')
        } : undefined
    }

    return api.post("/admin/catalogue/v2/promo", { ...newSale, imagesUrl: images })
        .then(response => response.data)
}

export const createSaleFx = createEffect<CreateSaleRequest, void, Error>(createSale)
export const createSaleEvent = createEvent<CreateSaleData>()

sample({
    clock: createSaleEvent,
    fn: (data) => convertSaleDataToRequest(data),
    target: createSaleFx
})

const convertSaleDataToRequest = (data: CreateSaleData): CreateSaleRequest => {
    return {
        sale: {
            name: data.name,
            crmGroup: data.crmGroup,
            crmCode: data.crmCode,
            description: data.description,
            deadline: data.deadline,
            products: data.productIdList as any,
            ruleList: data.ruleList.map(item => item.rule),
        },
        images: data.photos,
    }
}