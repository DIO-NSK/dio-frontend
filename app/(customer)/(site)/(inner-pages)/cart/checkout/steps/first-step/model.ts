import {CreateOrderDraftData} from "@/schemas/customer/CreateOrderDraftSchema";
import {api} from "@/api";
import {createEffect, createEvent, createStore} from "effector";
import {defaultCheckoutFirstStepData} from "@/data/forms/checkoutFirstStepData";
import {jwtDecode} from "jwt-decode";

const createOrderDraft = async (formData: CreateOrderDraftData) => {

    const accessToken = localStorage.getItem("ACCESS_TOKEN")!!
    const jwtToken = jwtDecode(accessToken)
    const userId = (jwtToken as {userID : number}).userID

    return api.post("/order/draft", {...formData, userId : userId})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const createOrderDraftFx = createEffect<CreateOrderDraftData, number, Error>(createOrderDraft)
export const $orderId = createStore<number>(0)
export const $checkoutFirstStepData = createStore<CreateOrderDraftData>(defaultCheckoutFirstStepData)
export const setCheckoutFirstStepDataEvent = createEvent<CreateOrderDraftData>()

$orderId.on(createOrderDraftFx.doneData, (_, orderId) => orderId)
$checkoutFirstStepData.on(setCheckoutFirstStepDataEvent, (_, data) => data)