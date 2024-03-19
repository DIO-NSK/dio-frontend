import {useState} from "react";

export const useAdminPanelNewProductPage = () => {

    const [photos, setPhotos] = useState<File[]>([])

    const handleAddPhoto = (photo : File) => setPhotos([...photos, photo])
    const handleDeletePhoto = (indexToDelete : number) => {
        const filteredPhotos = photos.filter((_, index) => index !== indexToDelete)
        setPhotos(filteredPhotos)
    }

    const [isProductOfTheDay, setProductOfTheDay] = useState<boolean>(false)
    const handleSetProductOfTheDay = () => setProductOfTheDay(!isProductOfTheDay)

    const handleCreateProduct = () => console.log("Saved!")

    return {
        photoBlock : {photos, handleAddPhoto, handleDeletePhoto},
        switch : {isProductOfTheDay, handleSetProductOfTheDay},
        handleCreateProduct
    }

}