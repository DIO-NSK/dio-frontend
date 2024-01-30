"use client"

import style from "./CatalogLeftSidebar.module.css"
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import Text from "@/components/atoms/text/text-base/Text";
import {useState} from "react";
import LabelInputWrapper from "@/components/wrappers/label-input-wrapper/LabelInputWrapper";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import CheckboxList from "@/components/moleculas/lists/checkbox-list/CheckboxList";
import Button from "@/components/atoms/buttons/button/Button";
import {CheckboxListItem} from "@/types/props/CheckboxItem";

type HeaderDescrType = {
    header: string,
    descr: string
}

const HeaderRow = ({header, descr}: HeaderDescrType) => {
    return (
        <div className={style.headerRow}>
            <TextLg text={header}/>
            <div onClick={() => console.log(descr)}>
                <Text text={descr}/>
            </div>
        </div>
    )
}

const CatalogLeftSidebar = () => {

    // range input states
    const [fromInitialValue, toInitialValue] = ["200", "5000"]
    const [fromValue, setFromValue] = useState(fromInitialValue)
    const [toValue, setToValue] = useState(toInitialValue)

    const createItemList = (data: string[]) => {
        return data.map((item) => {
            return {name: item, isSelected: false}
        })
    }

    const updateSelectedItems = (list: CheckboxListItem[], index: number, value: boolean) => {
        return list.map(
            (item, curIndex: number) => {
                return curIndex === index ? {...item, isSelected: value} : item
            })
    }

    const mockCountryItemList: string[] = ["Россия", "Китай"]
    const mockTypeItemList: string[] = ["Без охлаждения", "Электронный"]

    const initSelectedCountries = createItemList(mockCountryItemList)
    const initSelectedTypes = createItemList(mockTypeItemList)

    // checkbox list states
    const [
        selectedCountries,
        setSelectedCountries
    ] = useState<CheckboxListItem[]>(initSelectedCountries)

    const [
        selectedTypes,
        setSelectedTypes
    ] = useState<CheckboxListItem[]>(initSelectedTypes)

    return (
        <div className={style.wrapper}>

            <div className={style.headerRow}>
                <TextLg text={"Фильтры"} weight={"semibold"}/>
                <div onClick={() => console.log("Очистить все")}>
                    <Text text={"Очистить все"} className={"text-link-blue pointer"}/>
                </div>
            </div>

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
                    items={selectedCountries}
                    onSelect={(isSelected: boolean, index: number) => {
                        const newCountries = updateSelectedItems(selectedCountries, index, isSelected)
                        setSelectedCountries(newCountries)
                    }}
                />
            </LabelInputWrapper>
            <LabelInputWrapper header={"Тип охлаждения"}>
                <CheckboxList
                    items={selectedTypes}
                    onSelect={(isSelected: boolean, index: number) => {
                        const newTypes = updateSelectedItems(selectedTypes, index, isSelected)
                        setSelectedTypes(newTypes)
                    }}
                />
            </LabelInputWrapper>

            <Button
                text={"Применить фильтры"}
                onClick={() => console.log("Применить фильтры")}
            />

        </div>
    )
}

CatalogLeftSidebar.HeaderRow = HeaderRow

export default CatalogLeftSidebar
