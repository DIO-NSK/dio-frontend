import {useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";

export const useAdminPanelNewServicePage = () => {

    const [name, setName] = useState<string>("")
    const [code, setCode] = useState<string>("")

    const selectItems: SelectItem<string>[] = [
        {name: "Аренда", value: "rent"},
        {name: "Установка", value: "deployment"},
        {name: "Починка", value: "fix"},
    ]

    const [
        activeSelectItem,
        setActiveSelectItem
    ] = useState<SelectItem<string>>(selectItems[0])

    const inputGridData = [
        {
            labelText: "Название услуги",
            placeholder: "Аренда кулеров и пурифайеров",
            value: name, onChange: setName
        }, {
            labelText: "Код товара",
            placeholder: "000 000",
            inputMask: "999 999",
            value: code, onChange: setCode
        }
    ]

    const handleSaveChanges = () => console.log("Saved!")


    return {
        inputGridData, handleSaveChanges,
        selectInput: {selectItems, activeSelectItem, setActiveSelectItem}
    }

}