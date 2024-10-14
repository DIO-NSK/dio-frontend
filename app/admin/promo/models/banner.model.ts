import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";
import { ResponseCustomerBanner } from "@/app/(customer)/(site)/page.hooks";

export type RequestBanner = {
    link: string,
    imageUrl: string,
    id?: number,
}

export type ResponseBanner = {
    id: number,
    image: string,
    link : string,
}

const createBanner = async (banner: RequestBanner) => {
    return api.post("/admin/banner", banner).then(response => response.data)
}

const editBanner = async (banner: RequestBanner) => {
    return api.patch("/admin/banner", banner).then(response => response.data)

}

const changeBannerOrder = async (ids: { id: number }[]) => {
    return api.put("/admin/banner", ids)
        .then(response => response.data)
}

const changeBannerOrderFx = createEffect<{ id: number }[], void, Error>(changeBannerOrder)

export const editBannerFx = createEffect(editBanner)

export const createBannerFx = createEffect<RequestBanner, void, Error>(createBanner)

const getAllBanners = async (): Promise<ResponseCustomerBanner[]> => {
    return api.get("/admin/banner/all")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getAllBannersFx = createEffect<void, ResponseCustomerBanner[], Error>(getAllBanners)
export const getAllBannersEvent = createEvent<void>()
export const $banners = createStore<ResponseCustomerBanner[]>([])
export const setBannerIdToEditEvent = createEvent<ResponseCustomerBanner | null>()
export const $bannerIdToEdit = createStore<ResponseCustomerBanner | null>(null)

$bannerIdToEdit
    .on(setBannerIdToEditEvent, (_, banner) => banner)
    .reset(editBannerFx.doneData)

$banners.on(getAllBannersFx.doneData, (_, banners) => banners)

const deleteBanner = async (bannerId: number) => {
    return api.delete("/admin/banner", {params: {id: bannerId}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.payload)
        })
}

const deleteBannerFx = createEffect<number, void, Error>(deleteBanner)
export const deleteBannerEvent = createEvent<number>()
export const changeBannersOrderEvent = createEvent<DragEndEvent>()
$banners.on(changeBannersOrderEvent, (banners, event) => handleDragEnd(event, banners))

sample({
    clock: changeBannersOrderEvent,
    source: $banners,
    fn: (banners, _) => banners.map(item => ({id: item.id})),
    target: changeBannerOrderFx
})

sample({
    clock: deleteBannerEvent,
    target: deleteBannerFx
})

sample({
    clock: [
        getAllBannersEvent, changeBannerOrderFx.doneData, createBannerFx.doneData,
        editBannerFx.doneData, deleteBannerFx.doneData
    ],
    target: getAllBannersFx
})