"use client"

import React, {useState} from 'react';
import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {FiX} from "react-icons/fi";
import {useRouter} from "next/navigation";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import LabelInputWrapper from "@/components/wrappers/label-input-wrapper/LabelInputWrapper";
import CheckboxList from "@/components/moleculas/lists/checkbox-list/CheckboxList";
import {CheckboxListItem} from "@/types/props/CheckboxItem";
import Button from "@/components/atoms/buttons/button/Button";

const MobileCatalogFiltersPage = () => {

    const router = useRouter()

    // range input states
    const [fromInitialValue, toInitialValue] = ["200", "5000"]
    const [fromValue, setFromValue] = useState<string>(fromInitialValue)
    const [toValue, setToValue] = useState<string>(toInitialValue)

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

    const [
        selectedCountries,
        setSelectedCountries
    ] = useState<CheckboxListItem[]>(initSelectedCountries)

    const [
        selectedTypes,
        setSelectedTypes
    ] = useState<CheckboxListItem[]>(initSelectedTypes)

    const handleBackClick = () => router.back()
    const handleClearFilters = () => console.log("Clear!")

    return (
        <MobilePageWrapper>
            <HeaderRow
                header={"Фильтры"}
                leftContent={
                    <TextButton
                        text={"Очистить все"}
                        onClick={handleClearFilters}
                    />
                }
                rightContent={
                    <FiX
                        onClick={handleBackClick}
                        size={"20px"}
                    />
                }
            />
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
                onClick={() => router.back()}
            />
        </MobilePageWrapper>
    );
};

export default MobileCatalogFiltersPage;
