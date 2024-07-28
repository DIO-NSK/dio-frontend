import {api} from "@/api";
import {createEffect} from "effector";
import {CreateWorkerData} from "@/schemas/admin/CreateWorkerSchema";

const addWorker = async (worker : CreateWorkerData) : Promise<void> => {
    return api.post('/admin/staff', worker)
}

export const addWorkerFx = createEffect<CreateWorkerData, void, Error>(addWorker)