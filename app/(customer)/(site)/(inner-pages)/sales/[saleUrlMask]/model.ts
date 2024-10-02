import {AdminSale} from "@/types/dto/AdminSale";
import {unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

export type SaleDetails = {
    name: string,
    crmGroup: string,
    crmCode: string,
    deadline: string,
    description: string,
    products: ResponseProductSearch[],
    images : string[],
    ruleList: string[]
    isInvisible: boolean
}

const getSaleDetails = async (saleId : number) : Promise<SaleDetails> => {
    return unauthorizedApi.get('/catalogue/promo/detail', {params : {id : saleId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getSaleDetailsFx = createEffect<number, SaleDetails, Error>(getSaleDetails)
export const getSaleDetailsEvent = createEvent<number>()

export const $saleDetails = createStore<SaleDetails | null>(null)
export const resetSaleDetailsEvent = createEvent<void>()

$saleDetails
    .on(getSaleDetailsFx.doneData, (_, details) => details)
    .reset(resetSaleDetailsEvent)

sample({
    clock : getSaleDetailsEvent,
    target : getSaleDetailsFx
})