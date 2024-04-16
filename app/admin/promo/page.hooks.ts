import {useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";

export type BannerType = "promo" | "banner" | "day_products" | "our_waters"

const items : SelectItem<BannerType>[] = [
    {name : "Баннеры", value : "banner"},
    {name : "Товары дня", value : "day_products"},
    {name : "Наши воды", value : "our_waters"},
    {name : "Акции и предложения", value : "promo"},
]

export const useAdminPanelPromoPage = () => {

    const [activeItem, setActiveItem] = useState<SelectItem<BannerType>>(items[0])
    const [photos, setPhotos] = useState<File[]>([])

    const handleAddPhoto = (photo: File) => setPhotos(state => [...state, photo])
    const handleDeletePhoto = (indexToDelete: number) => {
        const filteredPhotos = photos.filter((_, index) => index !== indexToDelete)
        setPhotos(filteredPhotos)
    }

    return {
        photoBlock: {photos, handleAddPhoto, handleDeletePhoto},
        multiselectButton : {items, activeItem, setActiveItem}
    }

}