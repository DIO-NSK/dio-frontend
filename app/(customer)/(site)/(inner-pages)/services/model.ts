import {createEffect, createEvent, createStore, sample} from "effector";
import {ServiceForm} from "@/types/dto/user/ServiceForm";
import {api} from "@/api";
import {ServiceData} from "@/schemas/customer/ServiceSchema";

const sendService = async (serviceForm: ServiceForm) => {
    return api.put("/service", serviceForm)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const sendServiceFx = createEffect<ServiceForm, void, Error>(sendService)
export const sendServiceEvent = createEvent<ServiceData>()

export const $isServicePopupOpen = createStore<boolean>(false)
export const toggleServicePopupEvent = createEvent<void>()

$isServicePopupOpen.on(toggleServicePopupEvent, (state) => !state)

sample({
    clock: sendServiceEvent,
    fn: (serviceData: ServiceData) => convertDataToForm(serviceData),
    target: sendServiceFx
})

const convertDataToForm = (serviceData: ServiceData): ServiceForm => {
    return {
        ...serviceData,
        nameServiceType: serviceData.nameServiceType.value
    } as ServiceForm
}
