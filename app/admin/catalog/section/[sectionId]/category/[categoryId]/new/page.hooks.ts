import {useState} from "react";
import {SelectItem} from "@/types/props/Select";

export const useAdminPanelNewProductPage = () => {

    const dropdownItems: SelectItem<number>[] = [
        {name: "Салфетки", value: 102},
        {name: "Одноразовая посуда", value: 103},
        {name: "Пластиковые стаканы", value: 104},
    ]

    const [
        activeProductGroup,
        setActiveProductGroup
    ] = useState<SelectItem<number>>(dropdownItems[0])

    const [productName, setProductName] = useState<string>("")
    const [productCode, setProductCode] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [discount, setDiscount] = useState<string>("")
    const [VAT, setVAT] = useState<string>("")

    const inputGridData = [
        {
            labelText: "Название товара",
            placeholder: "Введите название товара",
            value: productName,
            onChange: setProductName
        }, {
            labelText: "Код товара",
            placeholder: "223 899",
            inputMask: "999 999",
            value: productCode,
            onChange: setProductCode
        }, {
            labelText: "Цена товара",
            placeholder: "Введите цену товара",
            value: price,
            onChange: setPrice
        }, {
            labelText: "Скидка",
            placeholder: "Введите скидку на товар",
            value: discount,
            onChange: setDiscount
        }, {
            labelText: "Размер НДС",
            placeholder: "20",
            value: VAT,
            onChange: setVAT
        }
    ]

    const [description, setDescription] = useState<string>("")
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
        dropdown: {dropdownItems, activeProductGroup, setActiveProductGroup},
        photoBlock : {photos, handleAddPhoto, handleDeletePhoto},
        switch : {isProductOfTheDay, handleSetProductOfTheDay},
        textArea : {description, setDescription}, inputGridData,
        handleCreateProduct
    }

}