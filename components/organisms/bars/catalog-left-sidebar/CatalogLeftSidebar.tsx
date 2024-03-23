"use client"

import Text from "@/components/atoms/text/text-base/Text";
import {useEffect} from "react";
import LabelInputWrapper from "@/components/wrappers/label-input-wrapper/LabelInputWrapper";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";
import CheckboxList from "@/components/moleculas/lists/checkbox-list/CheckboxList";
import Button from "@/components/atoms/buttons/button/Button";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {HeaderDescription} from "@/types/dto/text";
import {useUnit} from "effector-react";
import {
    $filters,
    getCategoryFiltersEvent,
    sendFiltersEvent
} from "@/components/organisms/bars/catalog-left-sidebar/model";

const HeaderRow = ({header, description}: HeaderDescription) => {
    return (
        <div className={"w-full flex flex-row justify-between items-baseline"}>
            <Text text={header} className={"text-[20px]"}/>
            <Text text={description}/>
        </div>
    )
}

const CatalogLeftSidebar = ({categoryId}: { categoryId: number }) => {

    const [filters, getFilters, sendFilters] = useUnit([$filters, getCategoryFiltersEvent, sendFiltersEvent])

    const onSubmit = () => console.log("All right")

    useEffect(() => {
        getFilters(categoryId)
    }, [])

    const headerCV: ClassValue[] = [
        "w-full flex flex-row justify-between items-baseline",
        "pb-[30px] border-b-2 border-light-gray"
    ]

    if (filters) return (
        <div className={"hidden col-span-3 sm:flex flex-col gap-[30px]"}>
            <div className={`flex flex-col gap-7 sticky top-[0px]`}>

                <div className={cn(headerCV)}>
                    <Text text={"Фильтры"} className={"text-[20px] font-semibold"}/>
                    <div onClick={() => console.log("Очистить все")}>
                        <Text text={"Очистить все"} className={"text-link-blue pointer"}/>
                    </div>
                </div>

                {
                    filters.map((filter, filterKey) => {
                        if (!filter.variants) {
                            return (
                                <LabelInputWrapper header={filter.name}>
                                    <RangeInput
                                        fromValue={Object.keys(filter.range)[0]}
                                        toValue={Object.values(filter.range)[0]}
                                        onChangeFromValue={console.log}
                                        onChangeToValue={console.log}
                                    />
                                </LabelInputWrapper>
                            )
                        } else {
                            return (
                                <LabelInputWrapper header={filter.name}>
                                    <CheckboxList
                                        items={[]}
                                        onSelect={console.log}
                                    />
                                </LabelInputWrapper>
                            )
                        }
                    })
                }

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
