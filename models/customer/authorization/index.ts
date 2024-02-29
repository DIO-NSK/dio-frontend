import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

const registerUser = async (data : any) : Promise<string> => {
    return api.post('/user/register', data)
        .then(response => response.data)
}

const loginUserByCredentials = async (data : any) => {
    return api.post("/user/login/credentials", data)
        .then(response => response.data)
}

export const registerUserEvent = createEvent()
const registerUserFx = createEffect(registerUser)
export const loginUserByCredentialsEvent = createEvent()
const loginUserByCredentialsFx = createEffect(loginUserByCredentials)

const $userId = createStore<string | null>(null)

$userId.on(registerUserFx.doneData, (_, userId) => userId)
$userId.on(loginUserByCredentialsFx.doneData, (_, userId) => userId)

sample({
    clock : registerUserEvent,
    target : registerUserFx
})

sample({
    clock : loginUserByCredentialsEvent,
    target : loginUserByCredentialsFx
})