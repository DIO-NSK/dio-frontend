import {unauthorizedApi} from "@/api";
import {LoginUserData} from "@/schemas/customer/authorization/LoginUserSchema";
import {createEffect, createEvent, createStore} from "effector";
import {cookies} from "next/headers";

const loginUserByCredentials = async (formData: LoginUserData) => {
    const request = {
        ...formData, phoneNumber: formData.phoneNumber.replace(/[\s()-]/g, '')
    }
    return unauthorizedApi.post("/user/login/credentials", request)
        .then(response => {
            localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
            return response.data
        })
        .catch(error => {throw Error(error.response.data.message)})
}

export const loginPopupDidMountEvent = createEvent<void>()

export const loginUserByCredentialsFx = createEffect(loginUserByCredentials)

export const $loginError = createStore<string>("")

$loginError
    .on(loginUserByCredentialsFx.failData, (_, error) => error.message)
    .reset(loginPopupDidMountEvent)