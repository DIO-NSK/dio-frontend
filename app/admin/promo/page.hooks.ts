import {useState} from "react";

export const useAdminPanelPromoPage = () => {

    const items = ["Промо-акции", "Товары дня", "Наши воды", "Акции и предложения"]
    const [activeItem, setActiveItem] = useState<string>(items[0])

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