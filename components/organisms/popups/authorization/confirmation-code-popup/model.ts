import {UserConfirmCodeData} from "@/schemas/customer/UserConfirmCodeSchema";
import {api} from "@/api";
import {createEffect, createStore, sample} from "effector";

import {loginUserByCredentialsFx} from "@/components/organisms/popups/authorization/login-popup/model";
import {persist} from "effector-storage/local";

const sendConfirmationCode = async (formData : UserConfirmCodeData) => {
    return api.put("/user/confirm", formData)
        .then(response => response.data)
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