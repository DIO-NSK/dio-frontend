import {CreateOrderDraftData} from "@/schemas/customer/checkout/CreateOrderDraftSchema";
import {api, getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {defaultCheckoutFirstStepData} from "@/data/forms/checkoutFirstStepData";
import {SelectItem} from "@/types/props/SelectItem";
import {Address} from "@/components/organisms/map/Map.types";

const createAddress = (flat : string | undefined, address : string) => {
    if (flat && flat.length > 0) {
        return `${address} кв. ${flat}`
    }

    return address;
}

const createOrderDraft = async (formData: CreateOrderDraftData) => {
    const {address, ...rest} = formData;
    const {address: currentAddress, latitude, longitude, city, house} = address;
    const {entranceNumber, flat, floor, comment, ...data} = rest;

    const request = {
        ...data,
        city, house,
        address: createAddress(flat, currentAddress),
        latitude: Number(latitude),
        longitude: Number(longitude),
        entranceNumber : entranceNumber && entranceNumber.length > 0 ? entranceNumber : undefined,
        floor : floor && floor.length > 0 ? floor : undefined,
        comment : comment && comment.length > 0 ? comment : undefined,
    };

    return api.post("/order/draft", request)
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getAddresses = async (): Promise<Address[]> => getRequest("/order/address")

export const getAddressFx = createEffect<void, Address[], Error>(getAddresses)

export const getAddressEvent = createEvent()

export const $userAddress = createStore<SelectItem<Address>[]>([])

export const $activeUserAddress = createStore<SelectItem<Address> | null>(null)

export const selectUserAddressEvent = createEvent<SelectItem<Address>>()

$activeUserAddress.on(selectUserAddressEvent, (_, selectItem) => selectItem)

export const createOrderDraftFx = createEffect<CreateOrderDraftData, number, Error>(createOrderDraft)

export const $orderId = createStore<number>(0)

export const $checkoutFirstStepData = createStore<Partial<CreateOrderDraftData>>(defaultCheckoutFirstStepData)

export const setCheckoutFirstStepDataEvent = createEvent<CreateOrderDraftData>()

$orderId.on(createOrderDraftFx.doneData, (_, orderId) => orderId)

$checkoutFirstStepData.on(setCheckoutFirstStepDataEvent, (_, data) => data)

$userAddress.on(getAddressFx.doneData, (_, userAddress) => userAddress.filter(item => item.address !== null).map(toSelectItem))

sample({
    clock: getAddressEvent,
    target: getAddressFx
})

const toSelectItem = (address: Address): SelectItem<Address> => {
    return {
        name: address.address,
        value: address
    } as SelectItem<Address>
}