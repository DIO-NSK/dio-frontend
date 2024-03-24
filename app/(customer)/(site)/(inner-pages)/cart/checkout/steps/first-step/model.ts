import {CreateOrderDraftData} from "@/schemas/customer/checkout/CreateOrderDraftSchema";
import {api, getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {defaultCheckoutFirstStepData} from "@/data/forms/checkoutFirstStepData";
import {UserAddress} from "@/types/dto/user/credentials/UserAddress";

const createOrderDraft = async (formData: CreateOrderDraftData) => {
    return api.post("/order/draft", {...formData})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getAddresses = async () : Promise<UserAddress[]> => getRequest("/order/address")
const getAddressFx = createEffect<void, UserAddress[], Error>(getAddresses)
export const getAddressEvent = createEvent<void>()
export const $userAddress = createStore<UserAddress[]>([])

export const createOrderDraftFx = createEffect<CreateOrderDraftData, number, Error>(createOrderDraft)
export const $orderId = createStore<number>(0)
export const $checkoutFirstStepData = createStore<CreateOrderDraftData>(defaultCheckoutFirstStepData)
export const setCheckoutFirstStepDataEvent = createEvent<CreateOrderDraftData>()

$orderId.on(createOrderDraftFx.doneData, (_, orderId) => orderId)
$checkoutFirstStepData.on(setCheckoutFirstStepDataEvent, (_, data) => data)
$userAddress.on(getAddressFx.doneData, (_, userAddress) => userAddress)

sample({
    clock : getAddressEvent,
    target : getAddressFx
})

