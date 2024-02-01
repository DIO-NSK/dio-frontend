import {useState} from "react";
import {SelectItem} from "@/types/props/Select";

export const useAdminPanelNewSalePage = () => {

    const [name, setName] = useState<string>("")
    const [code, setCode] = useState<string>("")
    const [duration, setDuration] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    
    const selectItems : SelectItem<string>[] = [
        {name : "Кулеры", value : "coolers"},
        {name : "Фильтры", value : "filters"},
        {name : "Насосы", value : "pumps"},
    ]

    const [
        activeSelectItem,
        setActiveSelectItem
    ] = useState<SelectItem<string>>(selectItems[0])

    const [photos, setPhotos] = useState<File[]>([])
    const handleAddPhoto = (photo : File) => setPhotos(state => [...state, photo])
    const handleDeletePhoto = (indexToDelete : number) => {
        const filteredPhotos = photos.filter((_, index) => index !== indexToDelete)
        setPhotos(filteredPhotos)
    }

    const handleSaveChanges = () => console.log("SAVED!")

    return {
        nameInput : {name, setName},
        codeInput : {code, setCode},
        groupInput : {selectItems, activeSelectItem, setActiveSelectItem},
        durationInput : {duration, setDuration},
        textArea : {description, setDescription},
        photoBlock : {photos, handleAddPhoto, handleDeletePhoto},
        handleSaveChanges
    }

}