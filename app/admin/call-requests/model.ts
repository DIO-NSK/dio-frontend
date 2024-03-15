import {getRequest} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseCallRequest} from "@/types/dto/admin/call-request/ResponseCallRequest";
import {CallRequestTableRow} from "@/types/dto/Table";

export type CallRequestStatus = "CURRENT" | "ARCHIVE"

const getCallRequestByStatus = async (status: CallRequestStatus) => {
    return getRequest("/admin/call/request/by-status", {params: {nameStatus: status}})
}

const getCallRequestByStatusFx =
    createEffect<CallRequestStatus, ResponseCallRequest[], Error>(getCallRequestByStatus)

export const getCallRequestByStatusEvent = createEvent<CallRequestStatus>()
export const $callRequestTableRows = createStore<CallRequestTableRow[]>([])

sample({
    clock: getCallRequestByStatusEvent,
    target: getCallRequestByStatusFx
})

sample({
    clock : getCallRequestByStatusFx.doneData,
    fn : (callRequests : ResponseCallRequest[]) => convertCallRequestsToTableRows(callRequests),
    target : $callRequestTableRows
})

export const setSearchCallRequestEvent = createEvent<string>()
export const $searchCallRequest = createStore<string>("")

$searchCallRequest.on(setSearchCallRequestEvent, (_, searchCallRequest) => searchCallRequest)

function convertCallRequestsToTableRows(callRequests : ResponseCallRequest[]) : CallRequestTableRow[] {
    return callRequests.map(callRequest => ({item : callRequest, id : callRequest.id}))
}