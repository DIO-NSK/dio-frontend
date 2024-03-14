import {createEffect, createEvent, createStore, sample} from "effector";
import {api} from "@/api";

export type UserCallRequest = {
    phoneNumber: string,
    fullName: string,
    comment: string
}

const sendCallRequest = async (callRequest: UserCallRequest): Promise<number> => {
    return api.put("/call/request", callRequest)
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const sendCallRequestFx = createEffect<UserCallRequest, number, Error>(sendCallRequest)
export const sendCallRequestEvent = createEvent<UserCallRequest>()

export const $isCallRequestOpen = createStore<boolean>(false)
export const toggleCallRequestOpenEvent = createEvent()

$isCallRequestOpen.on(toggleCallRequestOpenEvent, (state, _) => !state)

sample({
    clock : sendCallRequestEvent,
    target : sendCallRequestFx
})