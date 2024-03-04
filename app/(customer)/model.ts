import {api} from "@/api";
import {createEffect, createStore, sample} from "effector";
import {persist} from "effector-storage/local";
import {$userId} from "@/components/organisms/popups/authorization/confirmation-code-popup/model";
import {loginUserByCredentialsFx} from "@/components/organisms/popups/authorization/login-popup/model";
import {loginByPhoneFx} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";
import {registerUserFx} from "@/components/organisms/popups/authorization/signup-popup/model";

type UserCredentials = {
    phoneNumber: string,
    fullName: string,
    email: string
}

const getUserCredentials = async (userId: number): Promise<UserCredentials> => {
    return api.get(`/user/${userId}`)
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

export const getUserCredentialsFx = createEffect(getUserCredentials)
export const $userCredentials = createStore<UserCredentials | null>(null)

$userCredentials.on(getUserCredentialsFx.doneData, (_, data) => data)

persist({
    store: $userCredentials,
    key: "userCredentials"
})

sample({
    clock : [loginUserByCredentialsFx.doneData, loginByPhoneFx.doneData, registerUserFx.doneData],
    source : $userId,
    fn : (userId : number, _) => userId,
    target : getUserCredentialsFx
})