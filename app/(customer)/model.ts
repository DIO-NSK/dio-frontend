import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {
    $userId,
    sendConfirmationCodeFx
} from "@/components/organisms/popups/authorization/confirmation-code-popup/model";
import {loginUserByCredentialsFx} from "@/components/organisms/popups/authorization/login-popup/model";
import {loginByPhoneFx} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";
import {registerUserFx} from "@/components/organisms/popups/authorization/signup-popup/model";
import {LegalPartnerDto, updateLegalSettingsFx, updateUserSettingsFx} from "@/app/(customer)/profile/settings/model";
import {sendLegalConfirmationCodeFx} from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/model";
import {pending} from "patronum";
import {
    sendConfirmationCodeByPhoneFx
} from "@/components/organisms/popups/authorization/confirmation-code-popup/by-phone/model";

export type ResponseUserCredentials = {
    email: string,
    phoneNumber: string,
    fullName: string,
    legalPartner ?: LegalPartnerDto
}

const getUserCredentials = async (isLogout: boolean = false): Promise<ResponseUserCredentials | void> => {
    if (localStorage.getItem("ACCESS_TOKEN") || isLogout) {
        return api.get(`/user`)
            .then(response => response.data)
            .catch(error => {throw Error(error.response.data.message)})
    }
}

const logoutUser = async () => {
    return api.delete("/user/logout")
        .then(_ => localStorage.removeItem("ACCESS_TOKEN"))
        .catch(error => {
            throw Error(error.message.data.response)
        })
}

export const logoutUserFx = createEffect(logoutUser)

export const getUserCredentialsFx = createEffect(getUserCredentials)
export const getUserCredentialsEvent = createEvent<void>()

export const $getUserCredentialsPending = pending([getUserCredentialsFx])

export const $userCredentials = createStore<ResponseUserCredentials | null>(null)

$userCredentials.on(getUserCredentialsFx.doneData, (_, data) => data)
    .on(getUserCredentialsFx.failData, () => null)

sample({
    clock: logoutUserFx.doneData,
    fn: () => true,
    target: getUserCredentialsFx
})

sample({
    clock: [
        getUserCredentialsEvent, updateUserSettingsFx.doneData, updateLegalSettingsFx.doneData,
        sendConfirmationCodeFx.doneData, sendLegalConfirmationCodeFx.doneData, loginUserByCredentialsFx.doneData,
        loginByPhoneFx.doneData, registerUserFx.doneData, sendConfirmationCodeByPhoneFx.doneData
    ],
    target: getUserCredentialsFx
})