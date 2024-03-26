import {CreateOrderDraftData} from "@/schemas/customer/checkout/CreateOrderDraftSchema";
import {api, getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {defaultCheckoutFirstStepData} from "@/data/forms/checkoutFirstStepData";
import {UserAddress} from "@/types/dto/user/credentials/UserAddress";
import {SelectItem} from "@/types/props/SelectItem";

const createOrderDraft = async (formData: CreateOrderDraftData) => {
    return api.post("/order/draft", {...formData})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getAddresses = async (): Promise<UserAddress[]> => getRequest("/order/address")
const getAddressFx = createEffect<void, UserAddress[], Error>(getAddresses)
export const getAddressEvent = createEvent()

export const $userAddress = createStore<SelectItem<UserAddress>[]>([])
export const $activeUserAddress = createStore<SelectItem<UserAddress> | null>(null)
export const selectUserAddressEvent = createEvent<SelectItem<UserAddress>>()

$activeUserAddress.on(getAddressFx.doneData, (_, addresses) => toSelectItem(addresses[0]))
$activeUserAddress.on(selectUserAddressEvent, (_, selectItem) => selectItem)

export const createOrderDraftFx = createEffect<CreateOrderDraftData, number, Error>(createOrderDraft)
export const $orderId = createStore<number>(0)
export const $checkoutFirstStepData = createStore<CreateOrderDraftData>(defaultCheckoutFirstStepData)
export const setCheckoutFirstStepDataEvent = createEvent<CreateOrderDraftData>()

$orderId.on(createOrderDraftFx.doneData, (_, orderId) => orderId)
$checkoutFirstStepData.on(setCheckoutFirstStepDataEvent, (_, data) => data)
$userAddress.on(getAddressFx.doneData, (_, userAddress) => userAddress.map(toSelectItem))

sample({
    clock: getAddressEvent,
    target: getAddressFx
})

const toSelectItem = (address: UserAddress): SelectItem<UserAddress> => {
    return {
        name: `ул. ${address.street}, д. ${address.houseNumber}, кв. ${address.flatNumber}`,
        value: address
    } as SelectItem<UserAddress>
}