"use client"

import style from "./CatalogLeftSidebar.module.css"
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {useState} from "react";
import LabelInputWrapper from "@/components/wrappers/label-input-wrapper/LabelInputWrapper";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import CheckboxList from "@/components/moleculas/checkbox-list/CheckboxList";
import {SelectedItem} from "@/types/select";

type HeaderDescrType = {
    header: string,
    descr: string
}

const HeaderRow = ({header, descr}: HeaderDescrType) => {
    return (
        <div className={style.headerRow}>
            <TextLg text={header}/>
            <div onClick={() => console.log(descr)}>
                <TextBase text={descr}/>
            </div>
        </div>
    )
}

const CatalogLeftSidebar = () => {

    // range input states
    const [fromInitialValue, toInitialValue] = ["200", "5000"]
    const [fromValue, setFromValue] = useState(fromInitialValue)
    const [toValue, setToValue] = useState(toInitialValue)

    const mockItemList: string[] = ["Россия", "Китай"]
    const mockSelectedItems: SelectedItem[] = mockItemList.map(
        (item: string) => {
            return {isSelected: false, text: item}
        })

    // checkbox list states
    const [selectedItems, setSelectedItems] = useState(mockSelectedItems)

    const updateSelectedItems = (index: number, value: boolean) => {
        const updatedSelectedItems = selectedItems.map(
            (item, curIndex: number) => {
                return curIndex === index ? {...item, isSelected: value} : item
            })
        setSelectedItems(updatedSelectedItems)
    }

    return (
        <div className={style.wrapper}>
            <LabelInputWrapper header={"Цена"}>
                <RangeInput
                    fromPlaceholder={fromInitialValue}
                    toPlaceholder={toInitialValue}
                    fromValue={fromValue}
                    toValue={toValue}
                    onChangeFromValue={(newPrice: string) => setFromValue(newPrice)}
                    onChangeToValue={(newPrice: string) => setToValue(newPrice)}
                />
            </LabelInputWrapper>
            <LabelInputWrapper header={"Производитель"}>
                <CheckboxList
                    selectedItems={selectedItems}
                    onSelect={(isSelected: boolean, index: number) =>
                        updateSelectedItems(index, isSelected)
                    }
                />
            </LabelInputWrapper>
        </div>
    )
}

CatalogLeftSidebar.HeaderRow = HeaderRow

export default CatalogLeftSidebar
