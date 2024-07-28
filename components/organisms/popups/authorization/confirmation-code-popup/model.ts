import {UserConfirmCodeData} from "@/schemas/customer/authorization/UserConfirmCodeSchema";
import {api} from "@/api";
import {createEffect, createStore, sample} from "effector";

import {loginUserByCredentialsFx} from "@/components/organisms/popups/authorization/login-popup/model";
import {persist} from "effector-storage/local";
import {Auth} from "@/types/AuthContextType";
import {cookies} from "next/headers";

type ConfirmationCodeResponse = { userId : number } & Auth

const sendConfirmationCode = async (formData : UserConfirmCodeData): Promise<ConfirmationCodeResponse> => {
    return api.put("/user/confirm", formData)
        .then(response => {
            localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
            return response.data
        })
        .catch(error => {throw Error(error.response.data.message)})
}

export const sendConfirmationCodeFx = createEffect(sendConfirmationCode)
export const $confirmationCodeError = createStore<string>("")
export const $userId = createStore<number>(0)

$confirmationCodeError.on(sendConfirmationCodeFx.failData, (_, error) => error.message)

persist({
    store : $userId,
    key : "userId",
})

sample({
    clock : [sendConfirmationCodeFx.doneData, loginUserByCredentialsFx.doneData],
    fn : (data) => data.userId,
    target : $userId
})