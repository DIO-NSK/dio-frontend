import {AdminSale} from "@/types/dto/AdminSale";
import {unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

const getSaleDetails = async (saleId : number) : Promise<AdminSale> => {
    return unauthorizedApi.get('/catalogue/promo/detail', {params : {id : saleId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getSaleDetailsFx = createEffect<number, AdminSale, Error>(getSaleDetails)
export const getSaleDetailsEvent = createEvent<number>()

export const $saleDetails = createStore<AdminSale | null>(null)

$saleDetails.on(getSaleDetailsFx.doneData, (_, details) => details)

sample({
    clock : getSaleDetailsEvent,
    target : getSaleDetailsFx
})