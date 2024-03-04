import {useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";

export const useAdminPanelNewProductPage = () => {

    const dropdownItems: SelectItem<string>[] = [
        {name: "Салфетки", value: "napkins"},
        {name: "Одноразовая посуда", value: "dish"},
        {name: "Пластиковые стаканы", value: "plastic cups"},
    ]

    const inputGridData = [
        {
            labelText: "Название товара",
            placeholder: "Введите название товара",
            name : "name"
        }, {
            labelText: "Код товара",
            placeholder: "Введите код товара",
            numbersOnly : true,
            name: "crmCode"
        }, {
            labelText: "Цена товара",
            placeholder: "Введите цену товара",
            numbersOnly: true,
            name : "price"
        }, {
            labelText: "Скидка",
            placeholder: "Введите скидку на товар",
            numbersOnly: true,
            name : "discountPercent"
        }, {
            labelText: "Размер НДС",
            placeholder: "20",
            numbersOnly: true,
            name : "taxPercent"
        }
    ]

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
        inputGridData, handleCreateProduct, dropdownItems
    }

}