import {CreateOrderDraftData} from "@/schemas/customer/CreateOrderDraftSchema";
import {api} from "@/api";
import {createEffect, createEvent, createStore} from "effector";
import {defaultCheckoutFirstStepData} from "@/data/forms/checkoutFirstStepData";

const createOrderDraft = async (formData: CreateOrderDraftData) => {
    return api.post("/order/draft", {...formData})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const createOrderDraftFx = createEffect<CreateOrderDraftData, number, Error>(createOrderDraft)
export const $orderId = createStore<number>(0)
export const $checkoutFirstStepData = createStore<CreateOrderDraftData>(defaultCheckoutFirstStepData)
export const setCheckoutFirstStepDataEvent = createEvent<CreateOrderDraftData>()

$orderId.on(createOrderDraftFx.doneData, (_, orderId) => orderId)
$checkoutFirstStepData.on(setCheckoutFirstStepDataEvent, (_, data) => data)