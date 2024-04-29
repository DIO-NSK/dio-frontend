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
    street: string,
    houseNumber: string,
    flatNumber: string,
    entranceNumber: string,
    floor: string
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

const getOrderDetailsFx = createEffect<number, ResponseOrderDetails, Error>(getOrderDetails)
export const getOrderDetailsEvent = createEvent<number>()

sample({
    clock: getOrderDetailsEvent,
    target: getOrderDetailsFx
})

export const $orderDetails = createStore<ResponseOrderDetails | null>(null)
$orderDetails.on(getOrderDetailsFx.doneData, (_, details) => details)