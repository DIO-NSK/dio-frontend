import {api} from "@/api";
import {LoginUserData} from "@/schemas/customer/authorization/LoginUserSchema";
import {createEffect, createStore} from "effector";

const loginUserByCredentials = async (formData : LoginUserData) => {
    const request = {
        ...formData, phoneNumber: formData.phoneNumber.replace(/[\s()-]/g, '')
    }
    return api.post("/user/login/credentials", request)
        .then(response => {
            localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
            return response.data
        })
        .catch(error => {throw Error(error.response.data.message)})
}

export const loginUserByCredentialsFx = createEffect(loginUserByCredentials)

export const $loginError = createStore<string>("")

$loginError.on(loginUserByCredentialsFx.failData, (_, error) => error.message)
$loginError.watch(e => console.log(e))