import {SelectItem} from "@/types/props/SelectItem";
import {useState} from "react";

export const useCatalogPage = () => {

    const mockDropdownText = [
        "По возрастанию цены",
        "По убыванию цены",
        "По названию (А-Я)"
    ]

    const createItemList = (): SelectItem[] => {
        return mockDropdownText.map((text) => {
            return {text: text, isSelected: false}
        })
    }

    const initItemList = createItemList()
    const [itemList] = useState<SelectItem[]>(initItemList)
    const [selectedItem, selectItem] = useState<SelectItem>(itemList[0])

    return {
        selectInput : {selectItem, itemList, selectedItem}
    }

}