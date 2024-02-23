import React, {useState} from 'react';
import ServiceBlockWrapper from "@/components/wrappers/service-block-wrapper/ServiceBlockWrapper";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {SelectItem} from "@/types/props/SelectItem";

const SCSettingsBlock = () => {

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
    const [itemList, setItemList] = useState<SelectItem[]>(initItemList)
    const [selectedItem, selectItem] = useState<SelectItem>(itemList[0])

    return (
        <ServiceBlockWrapper header={"Заполните данные"}>
            <SelectInput
                width={"col-span-full"} items={itemList}
                onSelect={(item) => selectItem(item)}
                selectedItem={selectedItem}
                labelText={"Товар"}
            />

            <SelectInput
                width={"col-span-3"} items={itemList}
                onSelect={(item) => selectItem(item)}
                selectedItem={selectedItem}
                labelText={"Длительность аренды"}
            />

            <SelectInput
                width={"col-span-3"} items={itemList}
                onSelect={(item) => selectItem(item)}
                selectedItem={selectedItem}
                labelText={"Срок действия аренды"}
            />
        </ServiceBlockWrapper>
    )
}

export default SCSettingsBlock
