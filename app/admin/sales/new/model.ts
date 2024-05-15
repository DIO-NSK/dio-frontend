import {api} from "@/api";
import {createEffect, createEvent, sample} from "effector";
import {AdminSale} from "@/types/dto/AdminSale";
import {CreateSaleData} from "@/schemas/admin/CreateSaleSchema";

export type CreateSaleRequest = {
    sale : AdminSale,
    images : string[],
    promoId ?: number
}

const createSale = async (request : CreateSaleRequest) : Promise<void> => {
    const {sale, images} = request
    return api.post("/admin/catalogue/v2/promo", {...sale, imagesUrl : images})
        .then(response => response.data)
}

const createSaleFx = createEffect<CreateSaleRequest, void, Error>(createSale)
export const createSaleEvent = createEvent<CreateSaleData>()

sample({
    clock : createSaleEvent,
    fn : (data) => convertSaleDataToRequest(data),
    target : createSaleFx
})

const convertSaleDataToRequest = (data : CreateSaleData) : CreateSaleRequest => {
    return {
        sale : {
            name : data.name,
            crmGroup : data.crmGroup,
            crmCode : data.crmCode,
            description : data.description,
            deadline : "2024-07-08",
            products : data.productIdList as any,
            ruleList : data.ruleList.map(item => item.rule),
        },
        images : data.photos,
    }
}