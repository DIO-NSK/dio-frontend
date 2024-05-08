import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {TextTableRow} from "@/types/dto/Table";

export type AdminWorker = {
    name: string,
    phoneNumber: string,
    role: string
}

const getWorkers = async () : Promise<AdminWorker[]> => {
    return api.get('/admin/staff')
        .then(response => response.data)
}

const getWorkersFx = createEffect<void, AdminWorker[], Error>(getWorkers)
export const getWorkersEvent = createEvent<void>()
export const $workers = createStore<TextTableRow[]>([])

$workers.on(getWorkersFx.doneData, (_, workers) => workers.map((worker, index) => {
    return ({id : index,  item : [worker.name, worker.phoneNumber, worker.role], itemsWidth : ['col-span-2', 'col-span-2', 'col-span-2']})
}))

sample({
    clock : getWorkersEvent,
    target : getWorkersFx
})