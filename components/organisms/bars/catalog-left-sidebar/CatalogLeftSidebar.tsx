"use client"

import Text from "@/components/atoms/text/text-base/Text";
import {useEffect, useState} from "react";
import LabelInputWrapper from "@/components/wrappers/label-input-wrapper/LabelInputWrapper";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import CheckboxList from "@/components/moleculas/lists/checkbox-list/CheckboxList";
import Button from "@/components/atoms/buttons/button/Button";
import {CheckboxListItem} from "@/types/props/CheckboxItem";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {HeaderDescription} from "@/types/dto/text";
import {useUnit} from "effector-react";
import {getCategoryFiltersEvent, sendFiltersEvent} from "@/components/organisms/bars/catalog-left-sidebar/model";

const HeaderRow = ({header, description}: HeaderDescription) => {
    return (
        <div className={"w-full flex flex-row justify-between items-baseline"}>
            <Text text={header} className={"text-[20px]"}/>
            <Text text={description}/>
        </div>
    )
}

const CatalogLeftSidebar = ({categoryId} : {categoryId : number}) => {

    const [getFilters, sendFilters] = useUnit([getCategoryFiltersEvent, sendFiltersEvent])

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

    const onSubmit = () => console.log("All right")

    useEffect(() => {
        getFilters(categoryId)
    }, [])

    const headerCV: ClassValue[] = [
        "w-full flex flex-row justify-between items-baseline",
        "pb-[30px] border-b-2 border-light-gray"
    ]

    return (
        <div className={"hidden col-span-3 sm:flex flex-col gap-[30px]"}>
            <div className={`flex flex-col gap-7 sticky top-[0px]`}>

                <div className={cn(headerCV)}>
                    <Text text={"Фильтры"} className={"text-[20px] font-semibold"}/>
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
                    onClick={onSubmit}
                />

            </div>

        </div>
    )
}

CatalogLeftSidebar.HeaderRow = HeaderRow

export default CatalogLeftSidebar
