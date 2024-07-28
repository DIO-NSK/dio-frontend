import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {TextTableRow} from "@/types/dto/Table";
import {addWorkerFx} from "@/app/admin/workers/new/model";
import {convertPhoneNumber} from "@/utlis/convertPhoneNumber";

export type AdminWorker = {
    name: string,
    phoneNumber: string,
    role: string
}

const getWorkers = async () : Promise<AdminWorker[]> => {
    return api.get('/admin/staff')
        .then(response => response.data)
}

const deleteWorker = async (staffId : number) => {
    return api.delete('/admin/staff', {params : {staffId}})
}

const deleteWorkerFx = createEffect(deleteWorker)
export const deleteWorkerEvent = createEvent<number>()

sample({
    clock : deleteWorkerEvent,
    target : deleteWorkerFx
})

const getWorkersFx = createEffect<void, AdminWorker[], Error>(getWorkers)
export const getWorkersEvent = createEvent<void>()
export const $workers = createStore<TextTableRow[]>([])

$workers.on(getWorkersFx.doneData, (_, workers) => workers.map((worker, index) => {
    return ({id : index,  item : [worker.name, convertPhoneNumber(worker.phoneNumber), worker.role], itemsWidth : ['col-span-2', 'col-span-2', 'col-span-2']})
}))

sample({
    clock : [getWorkersEvent, addWorkerFx.doneData, deleteWorkerFx.doneData],
    target : getWorkersFx
})