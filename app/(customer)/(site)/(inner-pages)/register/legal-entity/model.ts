import {createEffect, createEvent, createStore} from "effector";
import {SelectItem} from "@/types/props/SelectItem";
import {legalEntityCheckoutSteps} from "@/data/deskstopCheckoutSteps";
import {LegalEntityData} from "@/schemas/customer/authorization/LegalEntitySchema";
import {api, unauthorizedApi} from "@/api";
import {UserConfirmCodeData} from "@/schemas/customer/authorization/UserConfirmCodeSchema";

const registerLegalEntity = async (formData: LegalEntityData) => {
    const {phoneNumber, ...rest} = formData
    const reqPhoneNumber = phoneNumber.replace(/[\s()-]/g, '')
    return unauthorizedApi.post('/user/legal/register', {phoneNumber: reqPhoneNumber, ...rest})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const registerLegalEntityFx = createEffect<LegalEntityData, void, Error>(registerLegalEntity)

const sendLegalConfirmationCode = async (formData: UserConfirmCodeData): Promise<void> => {
    const {phoneNumber, ...rest} = formData
    const reqPhoneNumber = phoneNumber.replace(/[\s()-]/g, '')
    return api.put('/user/confirm/legal', {phoneNumber: reqPhoneNumber, ...rest})
        .then(response => localStorage.setItem("ACCESS_TOKEN", response.data.accessToken))
        .catch(error => {throw Error(error.response.data.message)})
}

export const sendLegalConfirmationCodeFx = createEffect<UserConfirmCodeData, void, string>(sendLegalConfirmationCode)

export const $activeStep = createStore<SelectItem<number>>(legalEntityCheckoutSteps[0])
export const setActiveStepEvent = createEvent<SelectItem<number>>()
export const $firstStepData = createStore<Partial<LegalEntityData> | null>(null)
export const $secondStepData = createStore<Partial<LegalEntityData> | null>(null)

export const submitFirstStepEvent = createEvent<Partial<LegalEntityData>>()
export const submitSecondStepEvent = createEvent<Partial<LegalEntityData>>()

$firstStepData.on(submitFirstStepEvent, (_, data) => data)
$secondStepData.on(submitSecondStepEvent, (_, data) => data)
$activeStep.on(setActiveStepEvent, (_, activeStep) => activeStep)