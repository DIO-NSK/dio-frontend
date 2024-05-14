import {LoginByPhoneData} from "@/schemas/customer/authorization/LoginByPhoneSchema";
import {api} from "@/api";
import {createEffect, createEvent, createStore} from "effector";
import {$userId} from "@/components/organisms/popups/authorization/confirmation-code-popup/model";

const loginByPhone = async (formData : LoginByPhoneData) => {
    return api.post("/user/login/sms", formData)
        .then(response => response.data)
}

export const $loginByPhoneNumber = createStore<string | null>(null)
export const setLoginByPhoneNumberEvent = createEvent<string>()

export const loginByPhoneFx = createEffect(loginByPhone)
export const loginByPhonePopupDidMountEvent = createEvent<void>()
export const $loginByPhoneError = createStore<string>("")

$loginByPhoneNumber
    .on(setLoginByPhoneNumberEvent, (_, number) => number)
    .reset(loginByPhonePopupDidMountEvent)

$loginByPhoneError
    .on(loginByPhoneFx.failData, (_, error) => error.message)
    .reset(loginByPhonePopupDidMountEvent)
$userId.on(loginByPhoneFx.doneData, (_, userId) => userId)