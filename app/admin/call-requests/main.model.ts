import {api, unauthorizedApi} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {ResponseCallRequest} from "@/types/dto/admin/call-request/ResponseCallRequest";
import {CallRequestTableRow} from "@/types/dto/Table";
import {convertTableRowsToSelectedItems} from "@/utlis/convertTableRowsToSelectedItems";
import {$selectedVariant} from "@/app/admin/call-requests/variants.model";
import {undefined} from "zod";

export type CallRequestStatus = "CURRENT" | "ARCHIVE"

export type FilterCallRequest = {
    nameStatus: CallRequestStatus,
    phoneNumber?: string,
    name?: string
}

//region getCallRequests

const getCallRequestByStatus = async (status: CallRequestStatus) => {
    return unauthorizedApi.get("/admin/call/request/by-status", {params: {nameStatus: status}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const filterCallRequest = async (filterCallRequest: FilterCallRequest): Promise<ResponseCallRequest[]> => {
    return api.get("/admin/call/request/filter", {params: { callRequestFilter : filterCallRequest}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const filterCallRequestFx = createEffect<FilterCallRequest, ResponseCallRequest[], Error>(filterCallRequest)

const getCallRequestByStatusFx =
    createEffect<CallRequestStatus, ResponseCallRequest[], Error>(getCallRequestByStatus)

export const $callRequestTableRows = createStore<CallRequestTableRow[]>([])

export const $callRequestStatus = createStore<CallRequestStatus>("CURRENT")
export const setCallRequestStatusEvent = createEvent<CallRequestStatus>()
$callRequestStatus.on(setCallRequestStatusEvent, (_, status) => status)

sample({
    clock: setCallRequestStatusEvent,
    fn : (status) => ({nameStatus : status}),
    target: filterCallRequestFx
})

/*
sample({
    clock : setCallRequestStatusEvent,
    target : getCallRequestByStatusFx
})
*/

sample({
    clock: filterCallRequestFx.doneData,
    fn: (callRequests: ResponseCallRequest[]) => convertCallRequestsToTableRows(callRequests),
    target: $callRequestTableRows
})

export const setSearchCallRequestEvent = createEvent<string>()
export const $searchCallRequest = createStore<string>("")

sample({
    clock: setCallRequestStatusEvent,
    source: {variant: $selectedVariant, filter: $searchCallRequest},
    fn: ({variant}, status) => ({
        nameStatus: status,
        name: variant?.value === "name" ? $searchCallRequest : undefined,
        phoneNumber: variant?.value === "phone_number" ? $searchCallRequest : undefined,
    })
})

$searchCallRequest.on(setSearchCallRequestEvent, (_, searchCallRequest) => searchCallRequest)

function convertCallRequestsToTableRows(callRequests: ResponseCallRequest[]): CallRequestTableRow[] {
    return callRequests.map(callRequest => ({item: callRequest, id: callRequest.id}))
}

//endregion

//region updateCallRequest

const updateCallRequest = async ({ids, status}: { ids: number[], status: CallRequestStatus }) => {
    return Promise.all(
        ids.map(id => unauthorizedApi.put("/call/request/update", null, {params: {id: id, nameStatus: status}})
            .then(response => response.data)
            .catch(error => {
                throw Error(error.response.data.message)
            }))
    )
}

const updateCallRequestFx = createEffect(updateCallRequest)
export const updateCallRequestEvent = createEvent<CallRequestStatus>()
export const $updateCallRequestError = createStore<string>("")
$updateCallRequestError.on(updateCallRequestFx.failData, (_, error) => error.message)

//endregion

export const selectCallRequestEvent = createEvent<number>()
export const selectAllCallRequestEvent = createEvent()
export const removeAllCallRequests = createEvent()
export const $selectedCallRequests = createStore<number[]>([])

$selectedCallRequests
    .reset(updateCallRequestFx.doneData)
    .reset(removeAllCallRequests)
    .on(selectCallRequestEvent, (selected, itemToSelect) => {
        if (selected.includes(itemToSelect)) return selected.filter(selectedId => selectedId !== itemToSelect)
        else return [...selected, itemToSelect]
    })

sample({
    clock: selectAllCallRequestEvent,
    source: $callRequestTableRows,
    fn: convertTableRowsToSelectedItems,
    target: $selectedCallRequests
})

sample({
    clock: updateCallRequestEvent,
    source: $selectedCallRequests,
    fn: (ids, status) => ({ids: ids, status: status}),
    target: updateCallRequestFx
})

sample({
    clock: updateCallRequestFx.doneData,
    source: $callRequestStatus,
    target: getCallRequestByStatusFx
})