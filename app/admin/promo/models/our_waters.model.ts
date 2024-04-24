import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

export type RequestOurWater = {
    image: File | string,
    name: string,
    filterCharacteristic: string,
    id?: number
}

export type ResponseOurWater = {
    image: string,
    name: string,
    filterCharacteristic: string,
    id: number
}

const createOurWater = async (ourWater: RequestOurWater) => {

    const formData = new FormData()
    const {image, ...rest} = ourWater

    formData.append("image", image)
    formData.append("waterManufacturerDto", JSON.stringify({
        name: rest.name,
        filterCharacteristic: rest.filterCharacteristic
    }))

    return api.post("/admin/banner/water", formData, {
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })

}

const editOurWater = async (ourWater: RequestOurWater) => {

    const formData = new FormData()
    const {image, ...rest} = ourWater

    if (typeof image !== "string") formData.append("image", image)
    formData.append("waterManufacturerDto", JSON.stringify({
        name: rest.name,
        filterCharacteristic: rest.filterCharacteristic
    }))

    return api.patch("/admin/banner/water", formData, {
        params: ourWater.id,
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })

}

const getRangeOurWaters = async () => {
    return api.get("/banner/water/range")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getRangeOurWatersFx = createEffect(getRangeOurWaters)
export const getRangeOurWatersEvent = createEvent()

sample({
    clock : getRangeOurWatersEvent,
    target : getRangeOurWatersFx
})

export const $rangeOurWaters = createStore<ResponseOurWater[]>([])

$rangeOurWaters.on(getRangeOurWatersFx.doneData, (_, waters) => waters)

export const editOurWaterFx = createEffect(editOurWater)

export const createOurWaterFx = createEffect<RequestOurWater, void, Error>(createOurWater)

const getAllOurWaters = async (): Promise<ResponseOurWater[]> => {
    return api.get("/banner/water/all")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getAllOurWatersFx = createEffect<void, ResponseOurWater[], Error>(getAllOurWaters)
export const getAllOurWatersEvent = createEvent<void>()
export const $ourWaters = createStore<ResponseOurWater[]>([])
export const setOurWaterToEditEvent = createEvent<ResponseOurWater>()
export const $ourWaterToEdit = createStore<ResponseOurWater | null>(null)

$ourWaterToEdit.on(setOurWaterToEditEvent, (_, promo) => promo)

$ourWaters.on(getAllOurWatersFx.doneData, (_, promos) => promos)

sample({
    clock: getAllOurWatersEvent,
    target: getAllOurWatersFx
})

sample({
    clock: [createOurWaterFx.doneData, editOurWaterFx.doneData],
    target: getAllOurWatersFx
})

const deleteOurWater = async (ourWaterId: number) => {
    return api.delete("/admin/banner/water", {params: {id: ourWaterId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.payload)})
}

const deleteOurWaterFx = createEffect<number, void, Error>(deleteOurWater)
export const deleteOurWaterEvent = createEvent<number>()

sample({
    clock: deleteOurWaterEvent,
    target: deleteOurWaterFx
})

sample({
    clock: deleteOurWaterFx.doneData,
    target: getAllOurWatersFx
})