import React, {useState} from 'react';
import ServiceBlockWrapper from "@/components/wrappers/service-block-wrapper/ServiceBlockWrapper";
import DropdownInput from "@/components/atoms/inputs/dropdown-input/DropdownInput";
import {SelectedItem} from "@/types/select";

const SCSettingsBlock = () => {

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
    const [itemList, setItemList] = useState<SelectedItem[]>(initItemList)
    const [selectedItem, selectItem] = useState<SelectedItem>(itemList[0])

    return (
        <ServiceBlockWrapper header={"Заполните данные"}>
            <DropdownInput
                width={"col-span-full"} items={itemList}
                onSelect={(item) => selectItem(item)}
                selectedItem={selectedItem}
                label={"Товар"}
            />

            <DropdownInput
                width={"col-span-3"} items={itemList}
                onSelect={(item) => selectItem(item)}
                selectedItem={selectedItem}
                label={"Длительность аренды"}
            />

            <DropdownInput
                width={"col-span-3"} items={itemList}
                onSelect={(item) => selectItem(item)}
                selectedItem={selectedItem}
                label={"Срок действия аренды"}
            />
        </ServiceBlockWrapper>
    )
}

export default SCSettingsBlock
