import {api} from "@/api";
import {RegisterUserData} from "@/schemas/customer/authorization/RegisterUserSchema";
import {createEffect, createEvent, createStore} from "effector";

const registerUser = async (request: RegisterUserData) => {

    const userData = {
        ...request, phoneNumber: request.phoneNumber.replace(/[\s()-]/g, '')
    }

    return api.post("/user/register", userData)
        .then(response => response.data.code as string)
}

export const registerUserFx = createEffect(registerUser)

export const setUserPhoneNumberEvent = createEvent<string>()
export const registerPopupDidMountEvent = createEvent<void>()
export const $userPhoneNumber = createStore<string>("")
export const $registerUserError = createStore<string>("")
export const $confirmationCode = createStore<string>("")

$userPhoneNumber.on(setUserPhoneNumberEvent, (_, phoneNumber) => phoneNumber.replace(/[\s()-]/g, ''))

$confirmationCode.on(registerUserFx.doneData, (_, code: string) => code)