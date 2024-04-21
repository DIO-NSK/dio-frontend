import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {
    $userId,
    sendConfirmationCodeFx
} from "@/components/organisms/popups/authorization/confirmation-code-popup/model";
import {loginUserByCredentialsFx} from "@/components/organisms/popups/authorization/login-popup/model";
import {loginByPhoneFx} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";
import {registerUserFx} from "@/components/organisms/popups/authorization/signup-popup/model";
import {updateUserSettingsFx} from "@/app/(customer)/profile/settings/model";

export type ResponseUserCredentials = {
    email : string,
    phoneNumber: string,
    fullName: string
}

const getUserCredentials = async (): Promise<ResponseUserCredentials> => {
    return api.get(`/user`)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const getUserCredentialsFx = createEffect(getUserCredentials)
export const getUserCredentialsEvent = createEvent<void>()

export const $userCredentials = createStore<ResponseUserCredentials | null>(null)

$userCredentials.on(getUserCredentialsFx.doneData, (_, data) => data)

sample({
    clock: [
        getUserCredentialsEvent, updateUserSettingsFx.doneData, sendConfirmationCodeFx.doneData,
        loginUserByCredentialsFx.doneData, loginByPhoneFx.doneData, registerUserFx.doneData
    ],
    source: $userId,
    fn: (userId: number, _) => userId,
    target: getUserCredentialsFx
})