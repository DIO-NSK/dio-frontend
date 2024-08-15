import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

type Legal = {
    legalAddress: string,
    bankIdentificationCode: string,
    individualTaxNumber: string,
    organizationName: string,
    correspondentNumber: string,
    bankName: string,
    paymentAccount: string
}

type Address = {
    address: string,
    flatNumber: number,
    entranceNumber: number,
    floor: number,
    latitude: number,
    longitude: number
}

export type ResponseOrderDetails = {
    fullName: string,
    email: string,
    numberPhone: string,
    cost: number,
    status: string,
    created: string,
    fullNamePayer: string,
    typePayer: string,
    legalDto: Legal,
    addressDto: Address,
    deliveryTime: string,
    deliveryDate: string,
    paymentMethod: string,
    city : string,
    productItemDtoList: ResponseCartItem[],
    comment: string
}

const getOrderDetails = async (orderId: number): Promise<ResponseOrderDetails> => {
    return api.get('/order/detail', {params: {orderId: orderId}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getOrderLogs = async (orderId: number): Promise<string> => {
    return api.get('/order/bucket/order-logs', {params: {orderId: orderId}})
        .then(response => response.data)
}


const getOrderDetailsFx = createEffect<number, ResponseOrderDetails, Error>(getOrderDetails)
export const getOrderDetailsEvent = createEvent<number>()

sample({
    clock: getOrderDetailsEvent,
    target: getOrderDetailsFx
})

export const $orderDetails = createStore<ResponseOrderDetails | null>(null)
$orderDetails.on(getOrderDetailsFx.doneData, (_, details) => details)