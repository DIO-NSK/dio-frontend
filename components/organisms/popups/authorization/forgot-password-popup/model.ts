import {api} from "@/api";
import {createEffect, createEvent, createStore} from "effector";
import {LoginByPhoneData} from "@/schemas/customer/authorization/LoginByPhoneSchema";

const sendConfirmationCodePassword = async (formData : LoginByPhoneData) => {
    return api.put("/user/restore/password", formData)
        .then(response => response.data)
}

export const $passwordPhoneNumber = createStore<string | null>(null)
export const setPasswordPhoneNumberEvent = createEvent<string | null>()

$passwordPhoneNumber.on(setPasswordPhoneNumberEvent, (_, phoneNumber) => phoneNumber)

export const sendConfirmationCodePasswordFx = createEffect(sendConfirmationCodePassword)