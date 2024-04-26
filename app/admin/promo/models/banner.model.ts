import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {DragEndEvent} from "@dnd-kit/core";
import {handleDragEnd} from "@/utlis/handlers/handleDragEnd";

export type RequestBanner = {
    link: string,
    image: File | string,
    id?: number,
}

export type ResponseBanner = {
    id: number,
    image: string,
    link: string,
}

const createBanner = async (banner: RequestBanner) => {

    const formData = new FormData()
    formData.append("image", banner.image)

    return api.post("/admin/banner", formData, {
        params: {link: banner.link},
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })

}

const editBanner = async (banner: RequestBanner) => {

    const formData = new FormData()

    if (typeof banner.image !== "string") {
        formData.append("image", banner.image)
    }

    const bannerReq = {link: banner.link, id: banner.id}
    formData.append("bannerDto", new Blob([JSON.stringify(bannerReq)], {type: "application/json"}))

    return api.patch("/admin/banner", formData, {
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})

}

export const editBannerFx = createEffect(editBanner)

export const createBannerFx = createEffect<RequestBanner, void, Error>(createBanner)

const getAllBanners = async (): Promise<ResponseBanner[]> => {
    return api.get("/admin/banner/all")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getAllBannersFx = createEffect<void, ResponseBanner[], Error>(getAllBanners)
export const getAllBannersEvent = createEvent<void>()
export const $banners = createStore<ResponseBanner[]>([])
export const setBannerIdToEditEvent = createEvent<ResponseBanner>()
export const $bannerIdToEdit = createStore<ResponseBanner | null>(null)

$bannerIdToEdit.on(setBannerIdToEditEvent, (_, banner) => banner)

$banners.on(getAllBannersFx.doneData, (_, banners) => banners)

sample({
    clock: getAllBannersEvent,
    target: getAllBannersFx
})

sample({
    clock: [createBannerFx.doneData, editBannerFx.doneData],
    target: getAllBannersFx
})

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
    clock: deleteBannerEvent,
    target: deleteBannerFx
})

sample({
    clock: deleteBannerFx.doneData,
    target: getAllBannersFx
})