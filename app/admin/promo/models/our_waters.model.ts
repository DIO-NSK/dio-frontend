import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {SelectItem} from "@/types/props/SelectItem";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";
import {parseFilterMap} from "@/utlis/parseFilterMap";

export type RequestOurWater = {
    imageUrl: File | string,
    ourWater: SelectItem<{ name : string, filterId : number, categoryId : number }>
    id?: number
}

export type RequestCreateOurWater = {
    ourWater: RequestOurWater,
    categoryId: number,
    filterId: number,
    id?: number
}

export type ResponseOurWater = {
    image: string,
    name: string,
    filterCharacteristic: string,
    id: number
}

export type RangeOurWater = {
    categoryId: number,
    manufacturerFilterId: number,
    manufacturerRange: string[]
}

const createOurWater = async (req: RequestCreateOurWater) => {
    const filterCharacteristic = `/catalog/${req.categoryId}?filterMap=${req.filterId}:${req.ourWater.ourWater.name}`

    return api.post("/admin/banner/water", {
        name: req.ourWater.ourWater.name,
        filterCharacteristic: filterCharacteristic,
        imageUrl: req.ourWater.imageUrl
    }).then(response => response.data)
}

const editOurWater = async (req: RequestCreateOurWater) => {
    const filterCharacteristic = `/catalog/${req.categoryId}?filterMap=${req.filterId}:${req.ourWater.ourWater.name}`

    return api.patch("/admin/banner/water", {
        name: req.ourWater.ourWater.name,
        filterCharacteristic: filterCharacteristic,
        id: req.id,
        imageUrl: req.ourWater.imageUrl
    }).then(response => response.data)
}

const getRangeOurWaters = async (): Promise<RangeOurWater[]> => {
    return api.get("/banner/water/range")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getRangeOurWatersFx = createEffect(getRangeOurWaters)
export const getRangeOurWatersEvent = createEvent()
export const $selectOurWaters = createStore<SelectItem<{ name : string, filterId : number, categoryId : number }>[]>([])
$selectOurWaters.on(getRangeOurWatersFx.doneData, (_, response) => {
    const items = response.map((category) => category.manufacturerRange.map((item) => ({
        name: item,
        value: {
            name: item,
            filterId: category.manufacturerFilterId,
            categoryId: category.categoryId
        }
    }))).flat()

    return items as SelectItem<{ name : string, filterId : number, categoryId : number }>[];
})

sample({
    clock: getRangeOurWatersEvent,
    target: getRangeOurWatersFx
})

export const $rangeOurWaters = createStore<RangeOurWater[]>([])

$rangeOurWaters.on(getRangeOurWatersFx.doneData, (_, rangeOurWater) => rangeOurWater)

export const editOurWaterFx = createEffect(editOurWater)

export const createOurWaterFx = createEffect<RequestCreateOurWater, void, Error>(createOurWater)
export const submitOurWaterFx = createEffect<RequestOurWater, void, Error>()
export const submitOurWaterEvent = createEvent<RequestOurWater>()

const getAllOurWaters = async (): Promise<ResponseOurWater[]> => {
    return api.get("/admin/banner/water/all")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getAllOurWatersFx = createEffect<void, ResponseOurWater[], Error>(getAllOurWaters)
export const getAllOurWatersEvent = createEvent<void>()
export const $ourWaters = createStore<ResponseOurWater[]>([])
export const setOurWaterToEditEvent = createEvent<ResponseOurWater | null>()
export const changeOurWatersOrderEvent = createEvent<DragEndEvent>()
export const $ourWaterToEdit = createStore<ResponseOurWater | null>(null)
export const $editOurWaterStatus = createStore<boolean | null>(null)
$editOurWaterStatus
    .reset(setOurWaterToEditEvent)
    .on(editOurWaterFx.doneData, () => true)
    .on(editOurWaterFx.failData, () => false)

$ourWaterToEdit
    .on(setOurWaterToEditEvent, (_, promo) => promo)
    .reset(editOurWaterFx.doneData)

$ourWaters
    .on(getAllOurWatersFx.doneData, (_, promos) => promos)
    .on(changeOurWatersOrderEvent, (waters, event) => handleDragEnd(event, waters))

sample({
    clock: submitOurWaterFx,
    fn: (clock) => ({
        categoryId: clock.ourWater.value.categoryId,
        filterId: clock.ourWater.value.filterId,
        ourWater: clock
    } as RequestCreateOurWater),
    target: createOurWaterFx
})

sample({
    clock: submitOurWaterEvent,
    source: {waterToEdit: $ourWaterToEdit},
    fn: (source, clock) => {
        const [categoryId, filterId] = parseFilterMap(source.waterToEdit!!.filterCharacteristic);

        return ({
            categoryId: categoryId,
            filterId: filterId,
            id: source?.waterToEdit?.id,
            ourWater: clock
        } as RequestCreateOurWater)
    },
    target: editOurWaterFx
})

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
        .catch(error => {
            throw Error(error.response.data.payload)
        })
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

const changeOurWatersOrder = async (ids: { id: number }[]) => {
    return api.put("/admin/banner/water", ids)
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const changeOurWaterOrderFx = createEffect<{ id: number }[], void, Error>(changeOurWatersOrder)

sample({
    clock: changeOurWatersOrderEvent,
    source: $ourWaters,
    fn: (waters) => waters.map(item => ({id: item.id})),
    target: changeOurWaterOrderFx
})