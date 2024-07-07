import {LoginUserData} from "@/schemas/customer/authorization/LoginUserSchema";
import {createEffect, createEvent, createStore} from "effector";

const loginUserByCredentials = async (formData: LoginUserData) => {
    console.log(formData)
    const request = {
        ...formData, phoneNumber: formData.phoneNumber.replace(/[\s()-]/g, '')
    }
    await fetch('/api/auth/login/by-credentials', {
        method : 'POST',
        body : JSON.stringify(request)
    })
}

export const loginPopupDidMountEvent = createEvent<void>()

export const loginUserByCredentialsFx = createEffect(loginUserByCredentials)

export const $loginError = createStore<string>("")

$loginError
    .on(loginUserByCredentialsFx.failData, (_, error) => error.message)
    .reset(loginPopupDidMountEvent)