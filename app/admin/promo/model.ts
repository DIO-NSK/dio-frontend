import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";

export type RequestBanner = {
    title: string,
    link: string,
    image: File
}

export type ResponseBanner = {
    id : number,
    image : string,
    link : string,
}

const createBanner = async (banner: RequestBanner) => {

    banner.title = "Заголовок баннера"
    const {image, ...jsonBanner} = banner
    const formData = new FormData()

    formData.append("image", banner.image)
    formData.append("bannerDto", new Blob([JSON.stringify(jsonBanner)], {type: "application/json"}))

    return api.post("/admin/banner", formData, {
        headers: {"Content-type": "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })

}

export const createBannerFx = createEffect<RequestBanner, void, Error>(createBanner)

const getAllBanners = async (): Promise<ResponseBanner[]> => {
    return api.get("/banner/all")
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getAllBannersFx = createEffect<void, ResponseBanner[], Error>(getAllBanners)
export const getAllBannersEvent = createEvent<void>()
export const $banners = createStore<ResponseBanner[]>([])

$banners.on(getAllBannersFx.doneData, (_, banners) => banners)

sample({
    clock: getAllBannersEvent,
    target: getAllBannersFx
})

sample({
    clock: createBannerFx.doneData,
    target: getAllBannersFx
})

const deleteBanner = async (bannerId : number) => {
    return api.delete("/admin/banner", {params : {id : bannerId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.payload)})
}

const deleteBannerFx = createEffect<number, void, Error>(deleteBanner)
export const deleteBannerEvent = createEvent<number>()

sample({
    clock : deleteBannerEvent,
    target : deleteBannerFx
})

sample({
    clock : deleteBannerFx.doneData,
    target : getAllBannersFx
})