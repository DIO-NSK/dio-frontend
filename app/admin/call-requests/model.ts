import {getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseCallRequest} from "@/types/dto/admin/call-request/ResponseCallRequest";

export type CallRequestStatus = "CURRENT" | "ARCHIVE"

const getCallRequestByStatus = async (status: CallRequestStatus) => {
    return getRequest("/admin/call/request/by-status", {params: {nameStatus: status}})
}

const getCallRequestByStatusFx =
    createEffect<CallRequestStatus, ResponseCallRequest[], Error>(getCallRequestByStatus)

export const getCallRequestByStatusEvent = createEvent<CallRequestStatus>()
export const $callRequests = createStore<ResponseCallRequest[]>([])

$callRequests.on(getCallRequestByStatusFx.doneData, (_, callRequests) => callRequests)

sample({
    clock: getCallRequestByStatusEvent,
    target: getCallRequestByStatusFx
})

export const setSearchCallRequestEvent = createEvent<string>()
export const $searchCallRequest = createStore<string>("")

$searchCallRequest.on(setSearchCallRequestEvent, (_, searchCallRequest) => searchCallRequest)