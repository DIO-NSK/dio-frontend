import {SelectedItem} from "@/types/select";
import {useState} from "react";

export const useCatalogPage = () => {

    const mockDropdownText = [
        "По возрастанию цены",
        "По убыванию цены",
        "По названию (А-Я)"
    ]

    const createItemList = (): SelectedItem[] => {
        return mockDropdownText.map((text) => {
            return {text: text, isSelected: false}
        })
    }

    const initItemList = createItemList()
    const [itemList] = useState<SelectedItem[]>(initItemList)
    const [selectedItem, selectItem] = useState<SelectedItem>(itemList[0])

    return {
        selectInput : {selectItem, itemList, selectedItem}
    }

}